import {
  Rdf, DataProvider, ElementIri, ElementTypeIri, LinkTypeIri, PropertyTypeIri, ElementModel,
} from '@reactodia/workspace';

import { vocabulary, xsd } from './Vocabularies';

export const sh = vocabulary('http://www.w3.org/ns/shacl#', [
  'BlankNode',
  'BlankNodeOrIRI',
  'BlankNodeOrLiteral',
  'IRI',
  'IRIOrLiteral',
  'Literal',
  'NodeShape',
  'class',
  'datatype',
  'defaultValue',
  'maxCount',
  'minCount',
  'nodeKind',
  'order',
  'path',
  'property',
  'targetClass',
  'uniqueLang',
]);

export const dash = vocabulary('http://datashapes.org/dash#', [
  'reifiableBy',
]);

export const r_shapes = vocabulary('urn:reactodia:shapes:', [
  'canCreate',
  'canDelete',
  'subjectTemplate',
]);

export interface OwlShaclSchema {
  readonly shapes: ReadonlyMap<ElementTypeIri, readonly ShaclShape[]>;
}

export interface ShaclShape {
  readonly properties: readonly ShaclProperty[];
  readonly subjectTemplate?: string | undefined;
  readonly canCreate?: boolean;
  readonly canDelete?: boolean;
}

export interface ShaclProperty {
  readonly path: LinkTypeIri & PropertyTypeIri;
  readonly nodeKind?: Rdf.NamedNode | undefined;
  readonly class_?: Rdf.NamedNode | undefined;
  readonly datatype?: Rdf.NamedNode | undefined;
  readonly defaultValue?: Rdf.NamedNode | Rdf.Literal | undefined;
  readonly uniqueLang?: boolean | undefined;
  readonly minCount?: number | undefined;
  readonly maxCount?: number | undefined;
  readonly order?: number | undefined;
  readonly reifiableBy?: readonly ShaclShape[];
}

export async function loadOwlShaclSchema(params: {
  schemaProvider: DataProvider;
  signal: AbortSignal;
}): Promise<OwlShaclSchema> {
  const {schemaProvider, signal} = params;
  const {elementTypes} = await schemaProvider.knownElementTypes({signal});

  const targetToShapeIri = new Map<ElementTypeIri, Set<ElementIri>>();
  for (const type of elementTypes) {
    targetToShapeIri.set(type.id, new Set());
  }

  const allShapeIris = new Set<ElementIri>();
  const addShape = (targetIri: ElementTypeIri, shapeIri: ElementIri) => {
    targetToShapeIri.get(targetIri)?.add(shapeIri);
    allShapeIris.add(shapeIri);
  };

  await Promise.all([
    loadImplicitClassShapes(elementTypes.map(type => type.id), schemaProvider, addShape, signal),
    ...elementTypes.map(type => loadTargetShapes(type.id, schemaProvider, addShape, signal)),
  ]);

  const shapeElements = await schemaProvider.elements({elementIds: Array.from(allShapeIris)});

  const shapes = new Map<ElementTypeIri, ShaclShape[]>();
  await Promise.all(Array.from(targetToShapeIri, async ([targetIri, shapeIris]) => {
    if (shapeIris.size > 0) {
      const targetShapes = await Promise.all(Array.from(
        shapeIris,
        shapeIri => loadShapeData(
          shapeElements.get(shapeIri) ?? {
            id: shapeIri,
            types: [],
            properties: {},
          },
          schemaProvider,
          signal
        )
      ));
      shapes.set(targetIri, targetShapes);
    }
  }));

  return {shapes};
}

async function loadImplicitClassShapes(
  classIris: readonly ElementTypeIri[],
  schemaProvider: DataProvider,
  addShape: (classIri: ElementTypeIri, shapeIri: ElementIri) => void,
  signal: AbortSignal | undefined
): Promise<void> {
  const classElements = await schemaProvider.elements({
    elementIds: classIris as ElementIri[],
    signal,
  });
  for (const classIri of classIris) {
    const classElement = classElements.get(classIri as ElementIri);
    if (classElement && classElement.types.includes(sh.NodeShape)) {
      addShape(classIri, classElement.id);
    }
  }
}

async function loadTargetShapes(
  targetIri: ElementTypeIri,
  schemaProvider: DataProvider,
  addShape: (targetIri: ElementTypeIri, shapeIri: ElementIri) => void,
  signal: AbortSignal | undefined
): Promise<void> {
  const connected = await schemaProvider.lookup({
    refElementId: targetIri as ElementIri,
    refElementLinkId: sh.targetClass,
    linkDirection: 'in',
    signal,
  });
  for (const {element} of connected) {
    addShape(targetIri, element.id);
  }
}

async function loadShapeData(
  shapeElement: ElementModel,
  schemaProvider: DataProvider,
  signal: AbortSignal | undefined
): Promise<ShaclShape> {
  const connectedProperties = await schemaProvider.lookup({
    refElementId: shapeElement.id,
    refElementLinkId: sh.property,
    linkDirection: 'out',
    signal,
  });
  const propertyIds = connectedProperties.map(item => item.element.id);
  const propertyElements = await schemaProvider.elements({
    elementIds: propertyIds,
    signal,
  });
  const properties: ShaclProperty[] = [];
  await Promise.all(Array.from(propertyElements.values(), async propertyElement => {
    const property = await loadPropertyData(propertyElement, schemaProvider, signal);
    if (property) {
      properties.push(property);
    }
  }));
  return {
    properties,
    subjectTemplate: termAsString(getSinglePropertyValue(shapeElement, r_shapes.subjectTemplate)),
    canCreate: termAsBoolean(getSinglePropertyValue(shapeElement, r_shapes.canCreate)),
    canDelete: termAsBoolean(getSinglePropertyValue(shapeElement, r_shapes.canDelete)),
  };
}

async function loadPropertyData(
  propertyElement: ElementModel,
  schemaProvider: DataProvider,
  signal: AbortSignal | undefined
): Promise<ShaclProperty | undefined> {
  let path: Rdf.NamedNode | undefined;
  let nodeKind: Rdf.NamedNode | undefined;
  let class_: Rdf.NamedNode | undefined;
  let datatype: Rdf.NamedNode | undefined;
  let defaultValue: Rdf.NamedNode | Rdf.Literal | undefined;
  const reifiableBy: ElementModel[] = [];

  const connected = await schemaProvider.lookup({
    refElementId: propertyElement.id,
    linkDirection: 'out',
    signal,
  });
  for (const {element, outLinks} of connected) {
    const node = schemaProvider.factory.namedNode(element.id);
    if (outLinks.has(sh.path)) {
      path = node;
    } else if (outLinks.has(sh.nodeKind)) {
      nodeKind = node;
    } else if (outLinks.has(sh.datatype)) {
      datatype = node;
    } else if (outLinks.has(sh.defaultValue)) {
      defaultValue = node;
    } else if (outLinks.has(sh.class)) {
      class_ = node;
    } else if (outLinks.has(dash.reifiableBy)) {
      reifiableBy.push(element);
    }
  }

  if (!path) {
    return undefined;
  }

  let reifiableByShapes: ShaclShape[] | undefined;
  if (reifiableBy.length > 0) {
    reifiableByShapes = await Promise.all(reifiableBy.map(shapeElement =>
      loadShapeData(shapeElement, schemaProvider, signal)
    ));
  }

  return {
    path: path.value,
    nodeKind,
    class_,
    datatype,
    defaultValue: defaultValue ?? getSinglePropertyValue(propertyElement, sh.defaultValue),
    uniqueLang: termAsBoolean(getSinglePropertyValue(propertyElement, sh.uniqueLang)),
    minCount: termAsNumber(getSinglePropertyValue(propertyElement, sh.minCount)),
    maxCount: termAsNumber(getSinglePropertyValue(propertyElement, sh.maxCount)),
    order: termAsNumber(getSinglePropertyValue(propertyElement, sh.order)),
    reifiableBy: reifiableByShapes,
  };
}

export function getSinglePropertyValue(
  element: ElementModel,
  propertyIri: PropertyTypeIri
): Rdf.NamedNode | Rdf.Literal | undefined {
  if (Object.hasOwn(element.properties, propertyIri)) {
    const values = element.properties[propertyIri];
    if (values.length === 1) {
      return values[0];
    }
  }
  return undefined;
}

export function termAsNumber(term: Rdf.NamedNode | Rdf.Literal | undefined): number | undefined {
  if (term && term.termType === 'Literal') {
    const value = Number(term.value);
    if (Number.isFinite(value)) {
      return value;
    }
  }
  return undefined;
}

export function termAsString(term: Rdf.NamedNode | Rdf.Literal | undefined): string | undefined {
  if (term && term.termType === 'Literal' && term.datatype.value === xsd.string) {
    return term.value;
  }
  return undefined;
}

export function termAsBoolean(term: Rdf.NamedNode | Rdf.Literal | undefined): boolean | undefined {
  if (term && term.termType === 'Literal' && term.datatype.value === xsd.boolean) {
    return (
      term.value === 'true' ? true :
      term.value === 'false' ? false :
      undefined
    );
  }
  return undefined;
}
