---
sidebar_position: 2
---

# Data Provider

Reactodia defines a contract ([`DataProvider`](/docs/api/workspace/interfaces/DataProvider) interface) to query a subset of data from external source ([data graph](./graph-model.md#data-graph)) to provide means for incremental data loading when exploring the graph.

## IRI and RDF

Reactodia uses RDF ([Resource Description Framework](https://en.wikipedia.org/wiki/Resource_Description_Framework)) as a representation format for the graph data. The core concepts of RDF are:
 - **IRI** ([Internationalized Resource Identifier](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier)) &mdash; basically a URI but not limited to ASCII and may contain most unicode characters.
 - **resource** &mdash; a graph node (element) represented by an **IRI** (in which case it is a **named node**) or a anonymous dataset-local identifier (it which case it is a **blank node**).
 - **literal** &mdash; a simple value represented by a string with a *datatype* or a *language* tag.
 - **triple** &mdash; an expressions of the form *subject*–*predicate*–*object* to represent a graph edge of type *predicate* (link type) between *source* **resource** and *target* **resource** or **literal**.
 - **quad** &mdash; a **triple** with an additional associated *graph* **IRI**.

For interoperability with other RDF-based libraries for JavaScript, the property values for entities and relations are stored as either **named node** or **literal** values using commonly used [RDF/JS](https://rdf.js.org/) representation.

To provide improved type-safety with TypeScript when dealing with various kinds of IRIs from the [data graph](./graph-model.md#data-graph), the library uses the following [branded string types](https://www.learningtypescript.com/articles/branded-types):

| Type            | Description |
|-----------------|-------------|
| [`ElementIri`](/docs/api/workspace/type-aliases/ElementIri.md) | IRI of a entity (**resource**). |
| [`ElementTypeIri`](/docs/api/workspace/type-aliases/ElementTypeIri.md) | IRI of a entity type (**resource**). |
| [`LinkTypeIri`](/docs/api/workspace/type-aliases/LinkTypeIri.md) | IRI of a link type, i.e. triple *predicate* when the **object** is a **resource** (the predicate is always a **named node**). |
| [`PropertyTypeIri`](/docs/api/workspace/type-aliases/PropertyTypeIri.md) | IRI of a property type, i.e. triple **predicate** when the **object** is a **literal** (the predicate is always a **named node**). |

## Data Providers

The library provides a number of built-in [`DataProvider`](/docs/api/workspace/interfaces/DataProvider) interface implementations for various scenarios:

| Provider | Description |
|----------|-------------|
| [`EmptyDataProvider`](/docs/api/workspace/classes/EmptyDataProvider) | An empty provider which returns nothing from all query methods. |
| [`RdfDataProvider`](/docs/api/workspace/classes/RdfDataProvider) | Provides graph data from an in-memory [RDF/JS-compatible](https://rdf.js.org/data-model-spec/) graph dataset. |
| [`SparqlDataProvider`](/docs/api/workspace/classes/SparqlDataProvider) | Provides graph data by requesting it from a [SPARQL](https://en.wikipedia.org/wiki/SPARQL) endpoint. |
| [`CompositeDataProvider`](/docs/api/workspace/classes/CompositeDataProvider) | Provides graph data by combining results from multiple other data providers. |
| [`DecoratedDataProvider`](/docs/api/workspace/classes/DecoratedDataProvider) | Generically wraps over another provider to modify how the requests are made or alter the results. |
| [`IndexedDbCachedProvider`](/docs/api/workspace/classes/IndexedDbCachedProvider) | Caches graph data returned from another data provider using browser's built-in [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) storage. |

:::tip
It is recommended to extend [`EmptyDataProvider`](/docs/api/workspace/classes/EmptyDataProvider) when implementing a data provider: this way methods can be implemented one-by-one as needed and no changes will be necessary if `DataProvider` will gain additional methods in the future.
:::

### Example: provisioning an `RdfDataProvider` from a graph data in JSON Graph Format

In this example Reactodia is initialized with `RdfDataProvider` which is provisioned with graph data in [JSON Graph Format](https://github.com/jsongraph/json-graph-specification).

As a first step, the data in converted into RDF graph (**triples**), next the graph is added to the provider, finally all the nodes are added tot the diagram:

```tsx live
function ExampleRdfProviderProvisionFromJGF() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, performLayout} = context;

    // Example graph data based on JSON graph documentation:
    const jsonGraph = {
      "graph": {
        "nodes": {
          "alice": {
            "label": "Alice",
            "metadata": {
              "type": "Person",
              "birthDate": "1990-01-01"
            }
          },
          "bob": {
            "label": "Bob",
            "metadata": {
              "type": "Person",
              "birthDate": "1990-02-02"
            }
          }
        },
        "edges": [
          {
            "source": "alice",
            "relation": "isFriendOf",
            "target": "bob",
            "metadata": {
              "since": "2000-03-03"
            }
          }
        ]
      }
    } as const;

    const factory = Reactodia.Rdf.DefaultDataFactory;
    const hasType = factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
    const hasLabel = factory.namedNode('http://www.w3.org/2000/01/rdf-schema#label');

    const triples: Reactodia.Rdf.Quad[] = [];
    for (const [id, node] of Object.entries(jsonGraph.graph.nodes)) {
      const iri = factory.namedNode(`graph:node:${id}`);
      const {type, ...otherProperties} = node.metadata;
      triples.push(
        factory.quad(iri, hasType, factory.namedNode(`graph:type:${type}`)),
        factory.quad(iri, hasLabel, factory.literal(node.label))
      );
      for (const [property, value] of Object.entries(otherProperties)) {
        const propertyIri = factory.namedNode(`graph:property:${property}`);
        triples.push(factory.quad(iri, propertyIri, factory.literal(value)));
      }
    }

    for (const edge of jsonGraph.graph.edges) {
      const source = factory.namedNode(`graph:node:${edge.source}`);
      const target = factory.namedNode(`graph:node:${edge.target}`);
      const predicate = factory.namedNode(`graph:node:${edge.relation}`);
      const edgeTriple = factory.quad(source, predicate, target);
      triples.push(edgeTriple);
      for (const [property, value] of Object.entries(edge.metadata)) {
        const propertyIri = factory.namedNode(`graph:property:${property}`);
        triples.push(factory.quad(edgeTriple, propertyIri, factory.literal(value)));
      }
    }

    const dataProvider = new Reactodia.RdfDataProvider();
    dataProvider.addGraph(triples);

    await model.createNewDiagram({dataProvider, signal});

    const elementIris: Reactodia.ElementIri[] = [];
    for (const {element} of await dataProvider.lookup({elementTypeId: 'graph:type:Person'})) {
      elementIris.push(model.createElement(element).iri);
    }

    await model.requestElementData(elementIris);
    await model.requestLinks();
    await performLayout({signal});
  }, []);

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
        <Reactodia.DefaultWorkspace />
      </Reactodia.Workspace>
    </div>
  );
}
```
