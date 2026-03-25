---
sidebar_position: 2
---

# Data Provider

Reactodia defines a contract ([`DataProvider`](/docs/api/workspace/interfaces/DataProvider) interface) to query a subset of data from external source ([data graph](/docs/concepts/graph-model#data-graph)) to provide means for incremental data loading when exploring the graph.

## IRI and RDF

Reactodia uses RDF ([Resource Description Framework](https://en.wikipedia.org/wiki/Resource_Description_Framework)) as a representation format for the graph data. The core concepts of RDF are:
 - **IRI** ([Internationalized Resource Identifier](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier)) &mdash; basically a URI but not limited to ASCII and may contain most unicode characters.
 - **resource** &mdash; a graph node (element) represented by an **IRI** (in which case it is a **named node**) or a anonymous dataset-local identifier (it which case it is a **blank node**).
 - **literal** &mdash; a simple value represented by a string with a *datatype* or a *language* tag.
 - **triple** &mdash; an expressions of the form *subject*–*predicate*–*object* to represent a graph edge of type *predicate* (link type) between *source* **resource** and *target* **resource** or **literal**.
 - **quad** &mdash; a **triple** with an additional associated *graph* **IRI**.

For interoperability with other RDF-based libraries for JavaScript, the property values for entities and relations are stored as either **named node** or **literal** values using commonly used [RDF/JS](https://rdf.js.org/) representation.

To provide improved type-safety with TypeScript when dealing with various kinds of IRIs from the [data graph](/docs/concepts/graph-model#data-graph), the library uses the following [branded string types](https://www.learningtypescript.com/articles/branded-types):

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
    const hasType = factory.namedNode(Reactodia.rdf.type);
    const hasLabel = factory.namedNode(Reactodia.rdfs.label);

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
    for (const {element} of await dataProvider.lookup({elementTypeId: 'graph:type:Person'})) {
      model.createElement(element.id);
    }
    await model.requestData();
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

## Loading data from a data provider

When exploring the graph data, Reactodia components track which data needs to be loaded and requests to fetch it based on currently displayed [diagram content](/docs/concepts/graph-model#diagram-content). For example, when an [`EntityElement`](/docs/api/workspace/classes/EntityElement.md) is added to the canvas and rendered with the[default template](/docs/components/canvas.md#customization), the library will load corresponding entity types to display correct labels.

The library includes a number of hooks and methods to simplify data loading from a custom component which are listed below.

### Request data for entities and/or relations on the canvas

After adding one or more [`EntityElement`](/docs/api/workspace/classes/EntityElement.md) elements to the canvas e.g. with [`model.createElement()`](/docs/api/workspace/classes/DataDiagramModel.md#createelement) (see [Manipulating the diagram](/docs/concepts/graph-model.md#manipulating-the-diagram)), it is necessary to call one or several of the following methods to initiate loading entity data and relations between them:

| Method          | Description |
|-----------------|-------------|
| [`model.requestData()`](/docs/api/workspace/classes/DataDiagramModel.md#requestdata) | Requests to load all non-loaded ([placeholder](/docs/api/workspace/classes/EntityElement.md#isplaceholderdata)) entity elements and links connected to them. |
| [`model.requestElementData()`](/docs/api/workspace/classes/DataDiagramModel.md#requestelementdata) | Requests to load (or reload) data for the specified set of entities. |
| [`model.requestLinks()`](/docs/api/workspace/classes/DataDiagramModel.md#requestlinks) | Requests to load (or reload) all relations connected to the specified sets of entities. |

It is also possible to use [`requestElementData()`](/docs/api/workspace/functions/requestElementData.md) and [`restoreLinksBetweenElements()`](/docs/api/workspace/functions/restoreLinksBetweenElements.md) command effects to re-request the data on [undo/redo](/docs/concepts/command-history.md) if needed.

### Manually request data for entity, relation or property types

In some cases it is easier to manually trigger a request to load data for an entity, relation or property type:

| Method          | Description |
|-----------------|-------------|
| [`model.createElementType()`](/docs/api/workspace/classes/DataDiagramModel.md#createelementtype) | Requests to load an entity type if it has not been loaded yet. <br/> [`model.getElementType()`](/docs/api/workspace/classes/DataDiagramModel.md#getelementtype) can be used to get the placeholder or loaded data. |
| [`model.createLinkType()`](/docs/api/workspace/classes/DataDiagramModel.md#createlinktype) | Requests to load a relation type if it has not been loaded yet. <br/> [`model.getLinkType()`](/docs/api/workspace/classes/DataDiagramModel.md#getlinktype) can be used to get the placeholder or loaded data. |
| [`model.createPropertyType()`](/docs/api/workspace/classes/DataDiagramModel.md#createpropertytype) | Requests to load a property type if it has not been loaded yet. <br/> [`model.getPropertyType()`](/docs/api/workspace/classes/DataDiagramModel.md#getpropertytype) can be used to get the placeholder or loaded data. |

#### Example: manual request and subscription for an entity type

```ts
function MyElementTypeBadge(props: { elementTypeIri }) {
  const {elementTypeIri} = props;
  const {model} = Reactodia.useWorkspace();
  const t = Reactodia.useTranslation();
  const language = Reactodia.useObservedProperty(
    model.events, 'changeLanguage', () => model.language
  );

  const [elementType, setElementType] = React.useState<Reactodia.ElementType>();
  React.useEffect(() => {
    setElementType(model.createElementType(elementTypeIri));
  }, [elementTypeIri]);

  const data = Reactodia.useSyncStore(
    Reactodia.useEventStore(elementType?.events, 'changeData'),
    () => elementType?.data
  );
  return (
    <div className="my-badge">
      {t.formatLabel(data?.label, elementTypeIri, language)}
    </div>
  );
}
```

:::note
When requesting the data manually, make sure to subscribe to created instances to re-render when the data loads via [`useObservedProperty()`](/docs/api/workspace/functions/useObservedProperty.md), [`useEventStore()`](/docs/api/workspace/functions/useEventStore.md) or manual [event subscription](/docs/concepts/event-system.md).
:::

### `useKeyedSyncStore()`

[`useKeyedSyncStore`](/docs/api/workspace/functions/useKeyedSyncStore.md) hook allows to subscribe to a set of targets and fetch the data for each:

| Store           | Description |
|-----------------|-------------|
| [`subscribeElementTypes`](/docs/api/workspace/variables/subscribeElementTypes.md) | Subscribe and fetch entity types. |
| [`subscribeLinkTypes`](/docs/api/workspace/variables/subscribeLinkTypes.md) | Subscribe and fetch relation types. |
| [`subscribeElementTypes`](/docs/api/workspace/variables/subscribePropertyTypes.md) | Subscribe and fetch property types. |

#### Example: subscribe to property types from an [element template](/docs/components/canvas.md#customization)

```ts
function MyElement(props: Reactodia.TemplateProps) {
  const {model} = Reactodia.useWorkspace();
  const t = Reactodia.useTranslation();
  const language = Reactodia.useObservedProperty(
    model.events, 'changeLanguage', () => model.language
  );

  const data = props.element instanceof Reactodia.EntityElement
    ? props.element.data : undefined;
  // Select only properties with at least one value
  const properties = Object.entries(data?.properties ?? {})
    .filter(([iri, values]) => values.length > 0);
  // Subscribe and fetch property types
  Reactodia.useKeyedSyncStore(
    Reactodia.subscribePropertyTypes,
    properties.map(([iri]) => iri),
    model
  );

  return (
    <ul>
      {properties.map(([iri, values])) => {
        // Get property type to display
        const property = model.getPropertyType(iri);
        return (
          <li>
              {t.formatLabel(property?.data?.label, iri, language)}{': '}
              {values.map(v => v.value).join(', ')}
          </li>
        );
      }}
    </ul>
  );
}
```

### `useProvidedEntities()`

[`useProvidedEntities`](/docs/api/workspace/functions/useProvidedEntities.md) hook allows to loads entity data for a target set of IRIs even when the entities are not displayed on the canvas at all.

#### Example: load entity variants for a [select input](/docs/components/form-input.md)

```ts
function MyInputForShape(props: Forms.InputSingleProps) {
  const {factory} = props;
  const {model} = Reactodia.useWorkspace();

  const {data: entities} = Reactodia.useProvidedEntities(
    model.dataProvider,
    [shapes.Square, shapes.Circle, shapes.Triangle]
  );
  const language = Reactodia.useObservedProperty(
    model.events, 'changeLanguage', () => model.language
  );
  const variants = React.useMemo(
    () => Array.from(entities.values(), (item): Forms.InputSelectVariant => ({
      value: factory.namedNode(item.id),
      label: model.locale.formatEntityLabel(item, language),
    })),
    [entities, language, factory]
  );

  return (
    <Forms.InputSelect {...props} variants={variants} />
  );
}
```

## Data Locale

It is possible to customize how library components display graph data by supplying a custom [`DataLocaleProvider`](/docs/api/workspace/interfaces/DataLocaleProvider.md) when calling [model.importLayout()](/docs/api/workspace/classes/DataDiagramModel.md#importlayout).

Data locale provider can be used to alter the following behavior:
 - [locale.selectEntityLabel()](/docs/api/workspace/interfaces/DataLocaleProvider.md#selectentitylabel) and [locale.formatEntityLabel()](/docs/api/workspace/interfaces/DataLocaleProvider.md#formatentitylabel) to select or format default entity label from its properties (by default it looks for `rdfs:label` property values);
 - [locale.selectEntityImageUrl()](/docs/api/workspace/interfaces/DataLocaleProvider.md#selectentityimageurl) to select default entity thumbnail image IRI from its properties (by default it looks for `schema:thumbnailUrl` property value);
 - [locale.prepareAnchor()](/docs/api/workspace/interfaces/DataLocaleProvider.md#prepareanchor) to provide props for an anchor (`<a>` link) to a resource IRI;
 - [locale.resolveAssetUrl()](/docs/api/workspace/interfaces/DataLocaleProvider.md#resolveasseturl) to resolve an IRI/URL to referenced data asset for display or download, e.g. an image (thumbnail) or a downloadable file.

:::tip
It is possible to extend [`DefaultDataLocaleProvider`](/docs/api/workspace/classes/DefaultDataLocaleProvider.md) to slightly alter its behavior instead of implementing the full [`DataLocaleProvider`](/docs/api/workspace/interfaces/DataLocaleProvider.md) interface.
:::
