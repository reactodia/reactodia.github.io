---
title: <Navigator />
---

# Navigator

[`<Navigator />`](/docs/api/workspace/functions/Navigator) component is a [canvas widget](/docs/components/canvas.md) to display a minimap of the diagram contents.

```tsx live
function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, view, performLayout} = context;

    const alice = model.createElement('urn:example:Alice');
    const bob = model.createElement('urn:example:Bob');
    bob.setData({...bob.data, types: ['urn:example:Balloon']});
    model.createLinks({
      sourceId: alice.iri,
      targetId: bob.iri,
      linkTypeId: 'urn:example:knows',
      properties: {},
    });

    await performLayout({signal});
  }, []);

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
        <Reactodia.DefaultWorkspace
          menu={null}
          search={null}
          actions={null}
          navigator={{
            expanded: true,
            viewportFill: 'lightgreen',
            viewportStroke: {color: 'green'},
          }}
          canvas={{
            elementTemplateResolver: types =>
              types.includes('urn:example:Balloon')
                ? Reactodia.RoundTemplate : undefined,
          }}
        />
      </Reactodia.Workspace>
    </div>
  );
}
```

## Styles

The component look can be customized using the following CSS properties (see [design system](/docs/concepts/design-system.mdx) for more information):

| Property | Description |
|----------|-------------|
| `--reactodia-navigator-background-fill` | Background color on the minimap outside the scrollable pane area. |
| `--reactodia-navigator-scrollable-pane-fill` | Background color on the minimap for the scrollable pane area. |
| `--reactodia-navigator-viewport-fill` | Background color on the minimap for the viewport area. |
| `--reactodia-navigator-viewport-stroke-color` | Stroke color for the viewport area border. |
| `--reactodia-navigator-viewport-stroke-width` | Stroke width for the viewport area border. |
| `--reactodia-navigator-viewport-stroke-dash` | Stroke dash for the viewport area border. |
| `--reactodia-navigator-overflow-stroke-color` | Stroke color for the viewport area overflow border (displayed when the viewport is cutoff at the minimap border). |
| `--reactodia-navigator-overflow-stroke-width` | Stroke width for the viewport area overflow border (displayed when the viewport is cutoff at the minimap border). |
| `--reactodia-navigator-overflow-stroke-dash` | Stroke dash for the viewport area overflow border (displayed when the viewport is cutoff at the minimap border). |
