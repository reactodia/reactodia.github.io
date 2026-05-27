import { HashSet } from '@reactodia/hashmap';
import * as Reactodia from '@reactodia/workspace';

type EncodedTerm =
  | Reactodia.ElementIri
  | Reactodia.ElementTypeIri
  | Reactodia.PropertyTypeIri
  | Reactodia.LinkTypeIri;

type DecodedTerm = Reactodia.Rdf.NamedNode | Reactodia.Rdf.BlankNode;

// TODO: move into Reactodia
export function applyRdfChanges(params: {
  initialDataset: Iterable<Reactodia.Rdf.Quad>;
  authoringState: Reactodia.AuthoringState;
  dataFactory: Reactodia.Rdf.DataFactory;
  decodeTerm: (iri: EncodedTerm) => DecodedTerm;
}): Reactodia.MemoryDataset {
  const {initialDataset, authoringState, dataFactory, decodeTerm} = params;
  const dataset = Reactodia.indexedDataset(
    Reactodia.IndexQuadBy.S |
    Reactodia.IndexQuadBy.SP |
    Reactodia.IndexQuadBy.O
  );
  dataset.addAll(initialDataset);

  const toDelete = Reactodia.indexedDataset(Reactodia.IndexQuadBy.OnlyQuad);
  const toInsert = Reactodia.indexedDataset(Reactodia.IndexQuadBy.OnlyQuad);
  const updateDataset = () => {
    for (const quad of toDelete) {
      dataset.delete(quad);
    }
    dataset.addAll(toInsert);
    toDelete.clear();
    toInsert.clear();
  };

  const context: DatasetChangeContext = {
    dataset,
    toDelete,
    toInsert,
    updateDataset,
    dataFactory,
    decodeTerm,
  };

  processDeleteEvents(context, authoringState);
  processAddChangeEvents(context, authoringState);
  processEntityRenames(context, authoringState);

  return dataset;
}

interface DatasetChangeContext {
  readonly dataset: Reactodia.MemoryDataset;
  readonly toDelete: Reactodia.MemoryDataset;
  readonly toInsert: Reactodia.MemoryDataset;
  readonly updateDataset: () => void;

  readonly dataFactory: Reactodia.Rdf.DataFactory;
  readonly decodeTerm: (iri: EncodedTerm) => DecodedTerm;
}

function processDeleteEvents(context: DatasetChangeContext, authoringState: Reactodia.AuthoringState): void {
  const {dataset, toDelete, updateDataset, decodeTerm} = context;

  for (const change of authoringState.elements.values()) {
    if (change.type === 'entityDelete') {
      const iri = decodeTerm(change.data.id);
      toDelete.addAll(dataset.iterateMatches(iri, null, null));
      toDelete.addAll(dataset.iterateMatches(null, null, iri));
    }
  }
  updateDataset();

  for (const change of authoringState.links.values()) {
    if (change.type === 'relationDelete') {
      const subject = decodeTerm(change.data.sourceId);
      const predicate = decodeTerm(change.data.linkTypeId);
      const object = decodeTerm(change.data.targetId);
      for (const quad of dataset.iterateMatches(subject, predicate, object)) {
        toDelete.add(quad);
        toDelete.addAll(dataset.iterateMatches(quad, null, null));
        toDelete.addAll(dataset.iterateMatches(null, null, quad));
      }
    }
  }
  updateDataset();
}

function processAddChangeEvents(context: DatasetChangeContext, authoringState: Reactodia.AuthoringState): void {
  const {dataset, toDelete, toInsert, updateDataset, dataFactory, decodeTerm} = context;

  const rdfType = dataFactory.namedNode(Reactodia.rdf.type);
  const beforeSet = new HashSet<Reactodia.Rdf.NamedNode | Reactodia.Rdf.Literal>(
    Reactodia.Rdf.hashTerm,
    Reactodia.Rdf.equalTerms
  );
  const propertyContext: PropertyChangeContext = {
    ...context,
    beforeSet,
    addedSet: beforeSet.clone(),
  };

  for (const change of authoringState.elements.values()) {
    if (change.type === 'entityChange' || change.type === 'entityAdd') {
      const before = change.type === 'entityChange' ? change.before : undefined;
      const after = change.data;
      const iri = decodeTerm(after.id);

      if (before) {
        for (const type of before.types) {
          if (!after.types.includes(type)) {
            toDelete.addAll(dataset.iterateMatches(iri, rdfType, decodeTerm(type)));
          }
        }
      }

      for (const type of after.types) {
        if (!before || !before.types.includes(type)) {
          toInsert.add(dataFactory.quad(iri, rdfType, decodeTerm(type)));
        }
      }

      processChangeProperties(propertyContext, iri, before?.properties ?? {}, after.properties);
    }
  }
  updateDataset();

  for (const change of authoringState.links.values()) {
    if (change.type === 'relationChange' || change.type === 'relationAdd') {
      const before = change.type === 'relationChange' ? change.before : undefined;
      const subject = decodeTerm(change.data.sourceId);
      const predicate = decodeTerm(change.data.linkTypeId);
      const object = decodeTerm(change.data.targetId);
      if (predicate.termType !== 'NamedNode') {
        continue;
      }

      const quads = before
        ? Array.from(dataset.iterateMatches(subject, predicate, object))
        : [];
      if (quads.length === 0) {
        quads.push(dataFactory.quad(subject, predicate, object));
      }

      if (change.type === 'relationAdd') {
        toInsert.addAll(quads);
      }

      for (const quad of quads) {
        processChangeProperties(
          propertyContext,
          quad,
          before?.properties ?? {},
          change.data.properties
        );
      }
    }
  }
  updateDataset();
}

interface PropertyChangeContext extends DatasetChangeContext {
  readonly beforeSet: HashSet<Reactodia.Rdf.NamedNode | Reactodia.Rdf.Literal>;
  readonly addedSet: HashSet<Reactodia.Rdf.NamedNode | Reactodia.Rdf.Literal>;
}

function processChangeProperties(
  context: PropertyChangeContext,
  subject: Reactodia.Rdf.NamedNode | Reactodia.Rdf.BlankNode | Reactodia.Rdf.Quad,
  from: { readonly [id: string]: readonly (Reactodia.Rdf.NamedNode | Reactodia.Rdf.Literal)[] },
  to: { readonly [id: string]: readonly (Reactodia.Rdf.NamedNode | Reactodia.Rdf.Literal)[] },
): void {
  const {dataset, toInsert, toDelete, dataFactory, decodeTerm, beforeSet, addedSet} = context;

  for (const property of Object.keys(from)) {
    if (!Object.prototype.hasOwnProperty.call(to, property)) {
      const predicate = decodeTerm(property);
      toDelete.addAll(dataset.iterateMatches(subject, predicate, null));
    }
  }

  for (const [property, toValues] of Object.entries(to)) {
    const predicate = decodeTerm(property);
    if (predicate.termType !== 'NamedNode') {
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(from, property)) {
      for (const value of from[property]) {
        beforeSet.add(value);
      }
    }

    for (const value of toValues) {
      addedSet.add(value);
      if (!beforeSet.has(value)) {
        toInsert.add(dataFactory.quad(subject, predicate, value));
      }
    }

    for (const value of beforeSet) {
      if (!addedSet.has(value)) {
        toDelete.addAll(dataset.iterateMatches(subject, predicate, value));
      }
    }

    beforeSet.clear();
    addedSet.clear();
  }
};

function processEntityRenames(context: DatasetChangeContext, authoringState: Reactodia.AuthoringState): void {
  const {dataset, toDelete, toInsert, updateDataset, dataFactory, decodeTerm} = context;

  for (const change of authoringState.elements.values()) {
    if (change.type === 'entityChange' && change.newIri) {
      const from = decodeTerm(change.data.id);
      const to = decodeTerm(change.newIri);

      for (const fromQuad of dataset.iterateMatches(from, null, null)) {
        toDelete.add(fromQuad);
        const toQuad = dataFactory.quad(to, fromQuad.predicate, fromQuad.object, fromQuad.graph);
        toInsert.add(toQuad);
        renameIndirectQuads(context, fromQuad, toQuad);
      }

      for (const fromQuad of dataset.iterateMatches(null, null, from)) {
        toDelete.add(fromQuad);
        const toQuad = dataFactory.quad(fromQuad.subject, fromQuad.predicate, to, fromQuad.graph);
        toInsert.add(toQuad);
        renameIndirectQuads(context, fromQuad, toQuad);
      }
    }
  }
  updateDataset();
}

function renameIndirectQuads(
  context: DatasetChangeContext,
  fromQuad: Reactodia.Rdf.Quad,
  toQuad: Reactodia.Rdf.Quad
): void {
  const {dataset, toDelete, toInsert, dataFactory} = context;

  for (const indirect of dataset.iterateMatches(fromQuad, null, null)) {
    toDelete.add(indirect);
    toInsert.add(dataFactory.quad(toQuad, indirect.predicate, indirect.object, indirect.graph));
  }

  for (const indirect of dataset.iterateMatches(null, null, fromQuad)) {
    toDelete.add(indirect);
    toInsert.add(dataFactory.quad(indirect.subject, indirect.predicate, fromQuad, indirect.graph));
  }
};
