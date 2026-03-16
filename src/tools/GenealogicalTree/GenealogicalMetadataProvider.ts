import * as Reactodia from '@reactodia/workspace';

import { loadOwlShaclSchema, type OwlShaclSchema, type ShaclShape, sh } from './OwlShaclSchema';
import { fhkb, schema } from './Vocabularies';

export class GenealogicalMetadataProvider extends Reactodia.BaseMetadataProvider {
  private readonly literalLanguages: ReadonlyArray<string> =
    ['de', 'en', 'es', 'ru', 'zh'];

  private readonly schemaProvider;
  private loadedSchema: Promise<OwlShaclSchema> = Promise.reject(
    new Error('OWL-SHACL schema should be loaded first')
  );

  private readonly subjectBase = 'http://reactodia.github.io/genealogy/';
  private readonly defaultSubjectTemplate = `{{hex:8}}`;

  constructor(providerOptions: {
    schemaProvider: Reactodia.DataProvider;
  }) {
    const {schemaProvider} = providerOptions;
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

        return {
          data: {
            id: `${this.subjectBase}${generateSubject(subjectTemplate)}`,
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
          if (shacl.shapes.has(type)) {
            return {
              canChangeType: true,
              canEdit: true,
              canDelete: true,
            };
          }
        }
        return {};
      },
      canModifyRelation: async (link, source, target, options) => {
        const shacl = await this.getSchema();
        if (shacl.shapes.has(link.linkTypeId)) {
          return {
            canChangeType: true,
            canEdit: true,
            canDelete: true,
          };
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
      getRelationShape: async (linkType, {signal}) => {
        const shacl = await this.getSchema();
        const properties = new Map<Reactodia.PropertyTypeIri, Reactodia.MetadataPropertyShape>();
        const shapes = shacl.shapes.get(linkType) ?? [];
        this.collectPropertyShapes(properties, shapes);
        return {properties};
      },
      filterConstructibleTypes: async (types, {signal}) => {
        const shacl = await this.getSchema();
        return new Set(Array.from(types).filter(type => shacl.shapes.has(type)));
      },
    });
    this.schemaProvider = schemaProvider;
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

  private collectPropertyShapes(
    properties: Map<Reactodia.PropertyTypeIri, Reactodia.MetadataPropertyShape>,
    shapes: Iterable<ShaclShape>
  ): void {
    for (const shape of shapes) {
      for (const property of shape.properties) {
        if (property.datatype || !property.class_) {
          properties.set(property.path, {
            valueShape: property.nodeKind?.value === sh.IRI || property.nodeKind?.value === sh.BlankNodeOrIRI
              ? { termType: 'NamedNode' }
              : { termType: 'Literal', datatype: property.datatype },
            minCount: property.minCount,
            maxCount: property.maxCount,
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
