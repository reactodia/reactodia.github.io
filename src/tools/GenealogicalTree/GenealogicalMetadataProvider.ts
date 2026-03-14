import * as Reactodia from '@reactodia/workspace';

import {
  loadOwlShaclSchema, type OwlShaclSchema, type ShaclShape, sh,
  getSinglePropertyValue, termAsString,
} from './OwlShaclSchema';
import { genealogy, fhkb, schema } from './Vocabularies';

export class GenealogicalMetadataProvider extends Reactodia.BaseMetadataProvider {
  private readonly literalLanguages: ReadonlyArray<string> =
    ['de', 'en', 'es', 'ru', 'zh'];

  private readonly schemaProvider;
  private loadedSchema: Promise<OwlShaclSchema> = Promise.reject(
    new Error('OWL-SHACL schema should be loaded first')
  );

  private readonly defaultNamespaceBase: string;
  private readonly defaultSubjectTemplate = `{{hex:8}}`;
  private loadedSettings =
    Reactodia.EntityElement.placeholderData(genealogy.ActiveSettings);
  private unsavedSettings: Reactodia.ElementModel | undefined;

  constructor(providerOptions: {
    schemaProvider: Reactodia.DataProvider;
    defaultNamespaceBase: string;
  }) {
    const {schemaProvider, defaultNamespaceBase} = providerOptions;
    const {factory} = schemaProvider;
    super({
      getLiteralLanguages: () => this.literalLanguages,
      createEntity: async (type, {translation: t, language, signal}) => {
        const shacl = await this.getSchema();
        const shapes = shacl.shapes.get(type);
        const subjectTemplate = shapes?.find(shape => shape.subjectTemplate)?.subjectTemplate
          ?? this.defaultSubjectTemplate;

        const typeInfo = await schemaProvider.elementTypes({classIds: [type], signal});
        const typeLabel = t.selectLabel(typeInfo.get(type)?.label ?? [], language);

        let elementState = Reactodia.TemplateState.empty;
        if (type === fhkb.Person) {
          elementState = elementState.set(Reactodia.TemplateProperties.PinnedProperties, {
            [schema.birthDate]: true,
            [schema.deathDate]: true,
          });
        }

        const settings = this.getSettings();
        const namespaceBase = termAsString(
          getSinglePropertyValue(settings, genealogy.defaultNamespaceBase)
        ) ?? this.defaultNamespaceBase;

        return {
          data: {
            id: `${namespaceBase}${generateSubject(subjectTemplate)}`,
            types: [type],
            properties: {
              [Reactodia.rdfs.label]: [
                typeLabel ?? factory.literal(Reactodia.Rdf.getLocalName(type) ?? 'Entity'),
              ],
            },
          },
          elementState,
        };
      },
      canConnect: async (source, target, linkType, options) => {
        const shacl = await this.getSchema();

        const linksToTarget = new Map<Reactodia.ElementTypeIri, {
          inLinks: Set<Reactodia.LinkTypeIri>;
          outLinks: Set<Reactodia.LinkTypeIri>;
        }>();
        const getLinks = (target: Reactodia.ElementTypeIri) => {
          let links = linksToTarget.get(target);
          if (!links) {
            links = {
              inLinks: new Set(),
              outLinks: new Set(),
            };
            linksToTarget.set(target, links);
          }
          return links;
        };

        for (const [domain, shapes] of shacl.shapes) {
          const fromDomain = source.types.includes(domain as Reactodia.ElementTypeIri);
          for (const shape of shapes) {
            for (const property of shape.properties) {
              if (property.class_ && (!linkType || property.path === linkType)) {
                const fromRange = (!target || target.types.includes(domain as Reactodia.ElementTypeIri));
                if (fromRange && source.types.includes(property.class_.value)) {
                  getLinks(domain as Reactodia.ElementTypeIri).inLinks.add(property.path);
                }
                if (fromDomain && (!target || target.types.includes(property.class_.value))) {
                  getLinks(property.class_.value).outLinks.add(property.path);
                }
              }
            }
          }
        }

        const connections: Reactodia.MetadataCanConnect[] = [];
        for (const [targetType, links] of linksToTarget) {
          connections.push({
            targetTypes: new Set([targetType]),
            inLinks: Array.from(links.inLinks),
            outLinks: Array.from(links.outLinks),
          });
        }

        return connections;
      },
      canModifyEntity: async (entity, options) => {
        const shacl = await this.getSchema();
        for (const type of entity.types) {
          const shapes = shacl.shapes.get(type);
          if (shapes) {
            const canCreate = shapes.every(shape => shape.canCreate ?? true);
            const canDelete = shapes.every(shape => shape.canDelete ?? true);
            return {
              canChangeIri: canCreate && canDelete,
              canEdit: true,
              canDelete: canDelete,
            };
          }
        }
        return {};
      },
      canModifyRelation: async (link, source, target, options) => {
        const shacl = await this.getSchema();
        for (const type of source.types) {
          const shapes = shacl.shapes.get(type);
          if (shapes) {
            for (const shape of shapes) {
              if (shape.properties.some(property => property.path === link.linkTypeId)) {
                return {
                  canChangeType: true,
                  canEdit: true,
                  canDelete: true,
                };
              }
            }
          }
        }
        return {};
      },
      getEntityShape: async (types, options) => {
        const shacl = await this.getSchema();
        const properties = new Map<Reactodia.PropertyTypeIri, Reactodia.MetadataPropertyShape>();
        for (const type of types) {
          const shapes = shacl.shapes.get(type) ?? [];
          this.collectPropertyShapes(properties, shapes);
        }
        return {properties};
      },
      getRelationShape: async (linkType, source, target, {signal}) => {
        const shacl = await this.getSchema();
        const properties = new Map<Reactodia.PropertyTypeIri, Reactodia.MetadataPropertyShape>();
        for (const type of source.types) {
          const typeShapes = shacl.shapes.get(type) ?? [];
          for (const typeShape of typeShapes) {
            for (const property of typeShape.properties) {
              if (property.path === linkType && property.reifiableBy) {
                this.collectPropertyShapes(properties, property.reifiableBy);
              }
            }
          }
        }
        return {properties};
      },
      filterConstructibleTypes: async (types, {signal}) => {
        const shacl = await this.getSchema();
        return new Set(Array.from(types).filter(type => {
          const shapes = shacl.shapes.get(type);
          return shapes && shapes.every(shape => shape.canCreate ?? true);
        }));
      },
    });
    this.schemaProvider = schemaProvider;
    this.defaultNamespaceBase = defaultNamespaceBase;
  }

  private async getSchema(): Promise<OwlShaclSchema> {
    return this.loadedSchema;
  }

  loadSchema(params: { signal: AbortSignal }) {
    this.loadedSchema.catch(() => {/* Silence initial rejected or cancelled task */});
    this.loadedSchema = loadOwlShaclSchema({
      schemaProvider: this.schemaProvider,
      signal: params.signal,
    });
  }

  getSettings(): Reactodia.ElementModel {
    return this.unsavedSettings ?? this.loadedSettings;
  }

  async loadSettings(params: {
    mainProvider: Reactodia.DataProvider;
    signal: AbortSignal;
  }): Promise<void> {
    const {mainProvider, signal} = params;
    const elements = await mainProvider.elements({
      elementIds: [genealogy.ActiveSettings],
      signal,
    });
    const settings = elements.get(genealogy.ActiveSettings);
    if (settings) {
      this.loadedSettings = settings;
    }
  }

  updateSettings(fromState: Reactodia.AuthoringState): void {
    const event = fromState.elements.get(genealogy.ActiveSettings);
    this.unsavedSettings = event && event.type !== 'entityDelete' ? event.data : undefined;
  }

  private collectPropertyShapes(
    properties: Map<Reactodia.PropertyTypeIri, Reactodia.MetadataPropertyShape>,
    shapes: Iterable<ShaclShape>
  ): void {
    for (const shape of shapes) {
      for (const property of shape.properties) {
        if (property.datatype || !property.class_) {
          properties.set(property.path, {
            valueShape: property.nodeKind?.value === sh.IRI || property.nodeKind?.value === sh.BlankNodeOrIRI
              ? {
                termType: 'NamedNode',
                defaultValue: property.defaultValue?.termType === 'NamedNode'
                  ? property.defaultValue : undefined,
              }
              : {
                termType: 'Literal',
                datatype: property.datatype,
                uniqueLang: property.uniqueLang,
                defaultValue: property.defaultValue?.termType === 'Literal'
                  ? property.defaultValue : undefined,
              },
            minCount: property.minCount,
            maxCount: property.maxCount,
            order: property.order,
          });
        }
      }
    }
  }
}

function generateSubject(template: string): Reactodia.ElementIri {
  return template.replace(/{{([^}]*)}}/g, (_, placeholder: string) => {
    let hexMatch = /^hex(:[0-9]+)$/.exec(placeholder);
    if (hexMatch) {
      const digitCount = Number(hexMatch[1].substring(1));
      if (Number.isFinite(digitCount) && digitCount > 0 && digitCount <= 12) {
        return randomHex(digitCount);
      }
    }
    throw new Error(`Unknown subject template placeholder: ${placeholder}`);
  });
}

function randomHex(digitCount: number): string {
  return  Math.floor((1 + Math.random()) * Math.pow(16, digitCount))
    .toString(16).substring(1);
}
