---
title: <InstancesSearch />
---

# Instances Search

[`<InstancesSearch />`](/docs/api/workspace/functions/InstancesSearch.md) is a component to search for entities by various filter criteria using [data provider lookup](/docs/concepts/data-provider.md) and add them as elements to the diagram.

:::tip
The same functionality is also available as `<SearchSectionEntities />` [unified search section](/docs/components/unified-search.md).
:::

```tsx live
function Example() {
  const GRAPH_DATA = 'https://reactodia.github.io/resources/orgOntology.ttl';

  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, getCommandBus, performLayout} = context;

    const response = await fetch(GRAPH_DATA, {signal});
    const graphData = new N3.Parser().parse(await response.text());
    const dataProvider = new Reactodia.RdfDataProvider({acceptBlankNodes: false});
    dataProvider.addGraph(graphData);
    await model.createNewDiagram({dataProvider, signal});

    getCommandBus(Reactodia.InstancesSearchTopic)
      .trigger('setCriteria', {
        criteria: {
          refElement: 'http://www.w3.org/ns/org#Organization',
          refElementLink: 'http://www.w3.org/2000/01/rdf-schema#domain',
        }
      });
  }, []);

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
          <Reactodia.WorkspaceRoot>
            <Reactodia.InstancesSearch />
          </Reactodia.WorkspaceRoot>
      </Reactodia.Workspace>
    </div>
  );
}
```
