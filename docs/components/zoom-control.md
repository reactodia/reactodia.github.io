---
title: <ZoomControl />
---

# Zoom Control

[`<ZoomControl />`](/docs/api/workspace/functions/ZoomControl) component is a [canvas widget](selection.md) to display zoom controls (zoom-in, zoom-out, zoom-to-fit).

```tsx live
function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, view, performLayout} = context;

    const alice = model.createElement('urn:example:Alice');
    const bob = model.createElement('urn:example:Bob');
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
          navigator={null}
          zoomControl={{showPointerModeToggle: true}}
        />
      </Reactodia.Workspace>
    </div>
  );
}
```
