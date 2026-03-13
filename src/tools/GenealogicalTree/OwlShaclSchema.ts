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
  'maxCount',
  'minCount',
  'nodeKind',
  'path',
  'property',
  'targetClass',
]);

export const r_shapes = vocabulary('urn:reactodia:shapes:', [
  'singleton',
  'subjectTemplate',
  'targetProperty',
  'userCreatable',
]);

export interface OwlShaclSchema {
  readonly shapes: ReadonlyMap<ElementTypeIri | LinkTypeIri, ShaclShape[]>;
}

export interface ShaclShape {
  readonly properties: readonly ShaclProperty[];
  readonly subjectTemplate?: string | undefined;
  readonly singleton?: boolean;
  readonly userCreatable?: boolean;
}

export interface ShaclProperty {
  readonly path: LinkTypeIri & PropertyTypeIri;
  readonly nodeKind?: Rdf.NamedNode | undefined;
  readonly class_?: Rdf.NamedNode | undefined;
  readonly datatype?: Rdf.NamedNode | undefined;
  readonly minCount?: number | undefined;
  readonly maxCount?: number | undefined;
}

export async function loadOwlShaclSchema(params: {
  schemaProvider: DataProvider;
  signal: AbortSignal;
}): Promise<OwlShaclSchema> {
  const {schemaProvider, signal} = params;
  const [{elementTypes}, linkTypes] = await Promise.all([
    schemaProvider.knownElementTypes({signal}),
    schemaProvider.knownLinkTypes({signal}),
  ]);

  const targetToShapeIri = new Map<ElementTypeIri | LinkTypeIri, Set<ElementIri>>();
  for (const type of elementTypes) {
    targetToShapeIri.set(type.id, new Set());
  }
  for (const type of linkTypes) {
    targetToShapeIri.set(type.id, new Set());
  }

  const allShapeIris = new Set<ElementIri>();
  const addShape = (targetIri: ElementTypeIri | LinkTypeIri, shapeIri: ElementIri) => {
    targetToShapeIri.get(targetIri)?.add(shapeIri);
    allShapeIris.add(shapeIri);
  };

  await Promise.all([
    loadImplicitClassShapes(elementTypes.map(type => type.id), schemaProvider, addShape, signal),
    ...elementTypes.map(type => loadTargetShapes(type.id, sh.targetClass, schemaProvider, addShape, signal)),
    ...linkTypes.map(type => loadTargetShapes(type.id, r_shapes.targetProperty, schemaProvider, addShape, signal)),
  ]);

  const shapeElements = await schemaProvider.elements({elementIds: Array.from(allShapeIris)});

  const shapes = new Map<ElementTypeIri | LinkTypeIri, ShaclShape[]>();
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
  targetIri: ElementTypeIri | LinkTypeIri,
  targetProperty: typeof sh.targetClass | typeof r_shapes.targetProperty,
  schemaProvider: DataProvider,
  addShape: (targetIri: ElementTypeIri | LinkTypeIri, shapeIri: ElementIri) => void,
  signal: AbortSignal | undefined
): Promise<void> {
  const connected = await schemaProvider.lookup({
    refElementId: targetIri as ElementIri,
    refElementLinkId: targetProperty,
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
    singleton: termAsBoolean(getSinglePropertyValue(shapeElement, r_shapes.singleton)),
    userCreatable: termAsBoolean(getSinglePropertyValue(shapeElement, r_shapes.userCreatable)),
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
    } else if (outLinks.has(sh.class)) {
      class_ = node;
    }
  }

  if (!path) {
    return undefined;
  }
  return {
    path: path.value,
    nodeKind,
    class_,
    datatype,
    minCount: termAsNumber(getSinglePropertyValue(propertyElement, sh.minCount)),
    maxCount: termAsNumber(getSinglePropertyValue(propertyElement, sh.maxCount)),
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
