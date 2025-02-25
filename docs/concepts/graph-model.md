---
sidebar_position: 1
---

# Graph Model

The central part of the Reactodia state is the diagram content which is a mutable collection of so-called cells presented on the [`Canvas`](/docs/components/canvas.md).

## Diagram content

The diagram is composed of *abstract* [elements](/docs/api/workspace/classes/Element.md) and [links](/docs/api/workspace/classes/Link.md) and can be though of as collection of graph nodes and edges drawn on the canvas surface.

Each **element** is identified by a [generated ID](/docs/api/workspace/classes/Element.md#generateid), stores a [position](/docs/api/workspace/classes/Element.md#position) (in [paper coordinates](/docs/concepts/canvas-coordinates)) and an arbitrary persisted [element state](/docs/api/workspace/classes/Element.md#elementstate).

Each **link** is identified by a [generated ID](/docs/api/workspace/classes/Link.md#generateid), has source and target element IDs, and a [link type IRI](/docs/api/workspace/type-aliases/LinkTypeIri.md). In its state it stores path geometry as a [collection of points](/docs/api/workspace/classes/Link.md#vertices) (in [paper coordinates](/docs/concepts/canvas-coordinates)) and an arbitrary persisted [link state](/docs/api/workspace/classes/Link.md#linkstate).

:::note
Currently there is only one concrete element type besides the data graph ones: [`VoidElement`](/docs/api/workspace/classes/VoidElement.md) which is displayed as nothing (empty point) but can be connected to with the links.
:::

## Data graph

While elements and links are considered to be diagram graph nodes and edges, some of them can represent entities and relations from (external) data graph defined by the [`DataProvider`](/docs/concepts/data-provider):

| Cell type | Description |
|-----------|-------------|
| [`EntityElement`](/docs/api/workspace/classes/EntityElement.md) | Represents an entity (data graph node) with a globally unique ID, i.e. an [element IRI](/docs/api/workspace/type-aliases/ElementIri.md). |
| [`EntityGroup`](/docs/api/workspace/classes/EntityGroup.md) | Represents a group of entities as a single element. |
| [`RelationLink`](/docs/api/workspace/classes/RelationLink.md) | Represents a relation (data graph edge) uniquely identified by a tuple (source IRI, target IRI, [link type IRI](/docs/api/workspace/type-aliases/LinkTypeIri.md)). |
| [`RelationGroup`](/docs/api/workspace/classes/RelationGroup.md) | Represents a group of relations a single link, usually between an entity group and another element or a group. |

:::note
An IRI is [Internationalized Resource Identifier](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier) which is basically a URI but may additionally contain most unicode characters.

See how the library uses [IRIs and RDF](/docs/concepts/data-provider#iri-and-rdf) for more details.
:::

Basically, a sub-graph of a full external data graph composed of entities and relations forms a diagram on the canvas. By exploring that graph, other entities and relation are added to the diagram content, expanding the view of the data graph and presenting more interconnections throughout the data.

Using the [graph authoring](/docs/concepts/graph-authoring) feature it is possible to work on the changes to the data graph and apply it once ready.

## Manipulating the diagram

To access and manipulate the diagram one can use [diagram model](/docs/api/workspace/classes/DataDiagramModel.md) from [`WorkspaceContext`](/docs/concepts/workspace-context):
```ts
function WorkingWithDiagramModel() {
    const {model} = Reactodia.useWorkspace();

    // Different ways to place entities to the canvas
    const element1 = model.createElement('http://example.com/element1' as Reactodia.ElementIri);
    const element2 = model.createElement('urn:my:element2'  as Reactodia.ElementIri);
    const element3 = model.createElement({
        id: 'my-schema:element3' as Reactodia.ElementIri,
        types: ['urn:my:MyElement' as Reactodia.ElementTypeIri],
        label: ['Element3'],
        properties: {},
    });

    // Place relations between specified entities (must exist on the diagram)
    const [link1] = model.createLinks({
        sourceId: element1.iri,
        targetId: element2.iri,
        linkTypeId: 'urn:my:linkTypeA' as Reactodia.LinkTypeIri,
        properties: {},
    });

    // Remove and place element again to the canvas
    model.removeElement(element3.id);
    model.addElement(element3);

    // Remove and place link again to the canvas
    model.removeLink(link1.id);
    model.addLink(link1);

    // Get source and target of a link
    model.getSource(link1) === model.getElement(link1.sourceId);
    model.getTarget(link1) === mode.getElement(link1.targetId);

    for (const link of model.getElementLinks(element1)) {
        // Enumerate all links connected to an element
    }

    for (const element of model.elements) {
        // Enumerate all elements on the diagram
    }

    for (const link of model.links) {
        // Enumerate all links on the diagram
    }
}
```

## Link visibility

Some links can be hidden from the canvas by setting its link type visibility with [`setLinkVisibility()`](/docs/api/workspace/classes/DataDiagramModel.md#setlinkvisibility) to `hidden`. The hidden links are invisible and would not affect the [graph layout](/docs/concepts/layout-workers).

Alternatively, a link type visibility can be set to `withoutLabel` to display it as path (line) only without any additional labels.

```ts
function WorkingWithLinkVisibility() {
    const {model} = Reactodia.useWorkspace();

    model.setLinkVisibility('urn:my:linkTypeA' as Reactodia.LinkTypeIri, 'hidden');
    model.setLinkVisibility('urn:my:linkTypeB' as Reactodia.LinkTypeIri, 'withoutLabel');
}
```

Link visibility settings can be changed from the UI with [`SearchSectionLinkTypes`](/docs/components/unified-search.md#search-sections) and [`LinkTypesToolbox`](/docs/components/link-types-toolbox.md) components.

These settings are [imported and exported](#import-and-export) alongside the diagram content.

## Import and export

The diagram layout (which includes cell positions and states) can be exported (saved) and imported (restored) at any time using corresponding [`exportLayout()`](/docs/api/workspace/classes/DataDiagramModel.md#exportlayout) and [`importLayout()`](/docs/api/workspace/classes/DataDiagramModel.md#importlayout) methods:

```tsx
function WorkingWithImportExport() {
    const {model, onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
        const {model} = context;

        // Import a diagram layout on mount
        const dataProvider = /* ... */;
        const diagram  = await getPreviouslyExportedDiagram();
        await model.importLayout({dataProvider, diagram, signal});
    }, []);

    const onClick = () => {
        // Export a diagram layout by a user action
        const layout = model.exportLayout();
        // Store the layout somewhere
    };

    return (
        <Reactodia.Workspace ref={onMount}>
            <Reactodia.DefaultWorkspace
                ...
            />
        </Reactodia.Workspace>
    );
}
```

:::note
Currently only [data graph](#data-graph) elements and links (including groups) can be exported and imported.
:::
