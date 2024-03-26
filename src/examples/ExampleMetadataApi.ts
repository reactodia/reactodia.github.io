import * as Reactodia from '@reactodia/workspace';

const OWL_PREFIX = 'http://www.w3.org/2002/07/owl#';
const RDFS_PREFIX = 'http://www.w3.org/2000/01/rdf-schema#';

const owl = {
  class: OWL_PREFIX + 'Class' as Reactodia.ElementTypeIri,
  objectProperty: OWL_PREFIX + 'ObjectProperty' as Reactodia.ElementTypeIri,
  domain: OWL_PREFIX + 'domain' as Reactodia.LinkTypeIri,
  range: OWL_PREFIX + 'range' as Reactodia.LinkTypeIri,
};
const rdfs = {
  subClassOf: RDFS_PREFIX + 'subClassOf' as Reactodia.LinkTypeIri,
  subPropertyOf: RDFS_PREFIX + 'subPropertyOf' as Reactodia.LinkTypeIri,
};

function hasType(model: Reactodia.ElementModel, type: Reactodia.ElementTypeIri) {
  return Boolean(model.types.find(t => t === type));
}

const SIMULATED_DELAY: number = 500; /* ms */

export class ExampleMetadataApi implements Reactodia.MetadataApi {
  async canDropOnCanvas(
    source: Reactodia.ElementModel,
    ct: AbortSignal | undefined
  ): Promise<boolean> {
    await delay(SIMULATED_DELAY, ct);
    const elementTypes = await this.typesOfElementsDraggedFrom(source, ct);
    ct?.throwIfAborted();
    return elementTypes.length > 0;
  }

  async canDropOnElement(
    source: Reactodia.ElementModel,
    target: Reactodia.ElementModel,
    ct: AbortSignal | undefined
  ): Promise<boolean> {
    await delay(SIMULATED_DELAY, ct);
    const linkTypes = await this.possibleLinkTypes(source, target, ct);
    ct?.throwIfAborted();
    return linkTypes.length > 0;
  }

  async possibleLinkTypes(
    source: Reactodia.ElementModel,
    target: Reactodia.ElementModel,
    ct: AbortSignal | undefined
  ): Promise<Reactodia.DirectedLinkType[]> {
    function mapLinkTypes(
      types: Reactodia.LinkTypeIri[],
      direction: Reactodia.LinkDirection = 'out'
    ): Reactodia.DirectedLinkType[] {
      return types.map(linkTypeIri => ({ linkTypeIri, direction }));
    }

    await delay(SIMULATED_DELAY, ct);
    if (hasType(source, owl.class) && hasType(target, owl.class)) {
      return mapLinkTypes([rdfs.subClassOf]).concat(mapLinkTypes([rdfs.subClassOf], 'in'));
    } else if (hasType(source, owl.objectProperty) && hasType(target, owl.class)) {
      return mapLinkTypes([owl.domain, owl.range]);
    } else if (hasType(target, owl.objectProperty) && hasType(source, owl.class)) {
      return mapLinkTypes([owl.domain, owl.range], 'in');
    } else if (hasType(source, owl.objectProperty) && hasType(target, owl.objectProperty)) {
      return mapLinkTypes([rdfs.subPropertyOf]).concat(mapLinkTypes([rdfs.subPropertyOf], 'in'));
    } else {
      return [];
    }
  }

  async typesOfElementsDraggedFrom(
    source: Reactodia.ElementModel,
    ct: AbortSignal | undefined
  ): Promise<Reactodia.ElementTypeIri[]> {
    await delay(SIMULATED_DELAY, ct);
    return (
      hasType(source, owl.class) ? [owl.class] :
        hasType(source, owl.objectProperty) ? [owl.class, owl.objectProperty] :
          []
    );
  }

  async propertiesForType(
    type: Reactodia.ElementTypeIri,
    ct: AbortSignal | undefined
  ): Promise<Reactodia.PropertyTypeIri[]> {
    await delay(SIMULATED_DELAY, ct);
    return [];
  }

  async canDeleteElement(
    element: Reactodia.ElementModel,
    ct: AbortSignal | undefined
  ): Promise<boolean> {
    await delay(SIMULATED_DELAY, ct);
    return true;
  }

  async filterConstructibleTypes(
    types: ReadonlySet<Reactodia.ElementTypeIri>,
    ct: AbortSignal | undefined
  ): Promise<ReadonlySet<Reactodia.ElementTypeIri>> {
    await delay(SIMULATED_DELAY, ct);
    const result = new Set<Reactodia.ElementTypeIri>();
    types.forEach(type => {
      if (type.length % 2 === 0) {
        result.add(type);
      }
    });
    return result;
  }

  async canEditElement(
    element: Reactodia.ElementModel,
    ct: AbortSignal | undefined
  ): Promise<boolean> {
    await delay(SIMULATED_DELAY, ct);
    return true;
  }

  async canLinkElement(
    element: Reactodia.ElementModel,
    ct: AbortSignal | undefined
  ): Promise<boolean> {
    await delay(SIMULATED_DELAY, ct);
    return true;
  }

  async canDeleteLink(
    link: Reactodia.LinkModel,
    source: Reactodia.ElementModel,
    target: Reactodia.ElementModel,
    ct: AbortSignal | undefined
  ): Promise<boolean> {
    await delay(SIMULATED_DELAY, ct);
    return true;
  }

  async canEditLink(
    link: Reactodia.LinkModel,
    source: Reactodia.ElementModel,
    target: Reactodia.ElementModel,
    ct: AbortSignal | undefined
  ): Promise<boolean> {
    await delay(SIMULATED_DELAY, ct);
    return true;
  }

  async generateNewElement(
    types: ReadonlyArray<Reactodia.ElementTypeIri>,
    ct: AbortSignal | undefined
  ): Promise<Reactodia.ElementModel> {
    await delay(SIMULATED_DELAY, ct);
    const random32BitDigits = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
    return {
      id: `${types[0]}_${random32BitDigits}` as Reactodia.ElementIri,
      types: [...types],
      label: [Reactodia.Rdf.DefaultDataFactory.literal('New Entity')],
      properties: {},
    };
  }
}

export class ExampleValidationApi implements Reactodia.ValidationApi {
  async validate(event: Reactodia.ValidationEvent): Promise<Array<Reactodia.ElementError | Reactodia.LinkError>> {
    const errors: Array<Reactodia.ElementError | Reactodia.LinkError> = [];
    if (event.target.types.indexOf(owl.class) >= 0) {
      event.state.links.forEach(e => {
        if (!e.before && e.after.sourceId === event.target.id) {
          errors.push({
            type: 'link',
            target: e.after,
            message: 'Cannot add any new link from a Class',
          });
          errors.push({
            type: 'element',
            target: event.target.id,
            message: `Cannot create <${e.after.linkTypeId}> link from a Class`,
          });
        }
      });
    }

    await delay(SIMULATED_DELAY, event.signal);
    return errors;
  }
}

async function delay(amountMs: number, ct: AbortSignal | undefined) {
  return Reactodia.delay(amountMs, {signal: ct});
}
