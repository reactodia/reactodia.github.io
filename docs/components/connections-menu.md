---
title: <ConnectionsMenu />
---

# Connections Menu

[`<ConnectionsMenu />`](/docs/api/workspace/functions/ConnectionsMenu) component is a [canvas widget](/docs/components/canvas.md) to explore and navigate the graph by adding connected entities to the diagram.

The component observes [`ConnectionsMenuTopic`](/docs/api/workspace/variables/ConnectionsMenuTopic.md) [command bus topic](/docs/concepts/event-system.md#command-bus).

### Example: opening a connections menu on load

```tsx live
function Example() {
  const GRAPH_DATA = 'https://reactodia.github.io/resources/orgOntology.ttl';

  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, view, getCommandBus, performLayout} = context;

    const response = await fetch(GRAPH_DATA, {signal});
    const graphData = new N3.Parser().parse(await response.text());
    const dataProvider = new Reactodia.RdfDataProvider({acceptBlankNodes: false});
    dataProvider.addGraph(graphData);
    await model.importLayout({dataProvider, signal});

    const target = model.createElement('http://www.w3.org/ns/org#Organization');
    await model.requestElementData([target.iri]);

    model.setSelection([target]);
    getCommandBus(Reactodia.ConnectionsMenuTopic)
      .trigger('show', {targets: [target]});
  }, []);

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
        <Reactodia.DefaultWorkspace search={null} />
      </Reactodia.Workspace>
    </div>
  );
}
```
