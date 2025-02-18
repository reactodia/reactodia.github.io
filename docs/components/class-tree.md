# Class Tree

[ClassTree](/docs/api/workspace/functions/ClassTree.md) is a component to display an [element type](/docs/api/workspace/type-aliases/ElementTypeIri.md) (class) tree for the workspace.

Element type graph is loaded from [data provider](/docs/concepts/data-provider.md) associated with the [diagram model](/docs/concepts/graph-model.md).

In [graph authoring](/docs/concepts/graph-authoring.md) mode, the class tree can be used to create entity elements that are instances of the displayed types.

:::tip
The same functionality is also available as `SearchSectionElementTypes` [unified search section](/docs/components/unified-search.md).
:::

```tsx live
function Example() {
  const GRAPH_DATA = 'https://reactodia.github.io/resources/orgOntology.ttl';

  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, performLayout} = context;
    const response = await fetch(GRAPH_DATA, {signal});
    const graphData = new N3.Parser().parse(await response.text());
    const dataProvider = new Reactodia.RdfDataProvider({acceptBlankNodes: false});
    dataProvider.addGraph(graphData);
    await model.createNewDiagram({dataProvider, signal});
  }, []);

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
          <Reactodia.WorkspaceRoot>
            <Reactodia.ClassTree />
          </Reactodia.WorkspaceRoot>
      </Reactodia.Workspace>
    </div>
  );
}
```

## Styles

The component look can be customized using the following CSS properties (see [design system](/docs/concepts/design-system.mdx) for more information):

| Property | Description |
|----------|-------------|
| `--reactodia-tree-background-color-active`  | Background color for a selected tree item. |
| `--reactodia-tree-background-color-focus`   | Background color for a hovered over tree item. |
| `--reactodia-tree-border-color-active`      | Border color for a selected tree item. |
| `--reactodia-tree-border-color-focus`       | Border color for a hovered over tree item. |
