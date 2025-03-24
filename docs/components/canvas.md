---
title: <Canvas />
---

# Canvas and widgets

[`<Canvas />`](/docs/api/workspace/functions/Canvas) is a main component to display a scrollable canvas for the diagram with [elements](/docs/concepts/graph-model.md), [links](/docs/concepts/graph-model.md) and additional widgets.

## Getting the canvas instance

[`useCanvas()`](/docs/api/workspace/functions/useCanvas) hook called from a canvas widget can be used to get the [`CanvasApi`](/docs/api/workspace/interfaces/CanvasApi) instance from a context to read or subscribe to the canvas state or perform viewport-related effects:

```ts
function MyWidget() {
  const {canvas} = Reactodia.useCanvas();
  // Use canvas here
}
```

Alternatively, with [`SharedCanvasState.findAnyCanvas()`](/docs/api/workspace/classes/SharedCanvasState.md#findanycanvas) or [`SharedCanvasState.findAllCanvases()`](/docs/api/workspace/classes/SharedCanvasState.md#findallcanvases) methods it is possible to get canvas instance outside the canvas component:

```ts
function NonWidgetComponent {
  const {view} = React.useWorkspace();

  const canvas = view.findAnyCanvas();
  if (canvas) {
    // Use canvas here (could be any if there are several of them)
  }

  for (const canvas of view.findAllCanvases()) {
    // Use each canvas mounted in the workspace
  }
}
```

## Canvas widgets

Canvas widget is an instance of any React component type which is marked by [defineCanvasWidget()](/docs/api/workspace/functions/defineCanvasWidget) function with metadata such as its attachment layer i.e. where the component should be displayed in relation to other canvas content.

There are multiple canvas layers to place widgets on, from top one to the bottom:

| Layer name     | [Coordinate type](/docs/concepts/canvas-coordinates.md) | Description |
|----------------|-------------------|-------------|
| `viewport`     | client (viewport) | Topmost layer, does not scale or scroll with the diagram. |
| `overElements` | paper             | Displayed over both elements and links, scales and scrolls with the diagram. |
| `overLinks`    | paper             | Displayed under elements but over links, scales and scrolls with the diagram. |

### Example: custom viewport widget

```tsx live noInline
function CustomSelectAllWidget() {
  const {model} = Reactodia.useWorkspace();
  return (
    <Reactodia.ViewportDock dock='ne'>
      <button type='button'
        className='reactodia-btn reactodia-btn-default'
        onClick={() => model.setSelection([...model.elements])}>
        Select All
      </button>
    </Reactodia.ViewportDock>
  );
}

Reactodia.defineCanvasWidget(
  CustomSelectAllWidget,
  element => ({element, attachment: 'viewport'})
);

function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, view, performLayout} = context;
    model.createElement('http://example.com/entity1');
    model.createElement('http://example.com/entity2');
    model.createLinks({
      sourceId: 'http://example.com/entity1',
      targetId: 'http://example.com/entity2',
      linkTypeId: 'http://example.com/connectedTo',
      properties: {},
    });
    await performLayout({signal});
  }, []);

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
        <Reactodia.DefaultWorkspace
          search={null}
          canvasWidgets={[<CustomSelectAllWidget key='select-all' />]}
        />
      </Reactodia.Workspace>
    </div>
  );
}

render(<Example />);
```

## Styles

The component look can be customized using the following CSS properties (see [design system](/docs/concepts/design-system.mdx) for more information):

| Property | Description |
|----------|-------------|
| `--reactodia-canvas-background-color` | Background color for the canvas. |
| `--reactodia-canvas-box-shadow` | Box shadow for the UI components layered on top of the canvas. |
| `--reactodia-canvas-overlay-color` | Semi-transparent color to place over canvas content when displaying a modal on top. |
| `--reactodia-canvas-underlay-color` | Semi-transparent color to place under components for improved readability when they are placed on the canvas. |
| `--reactodia-element-background-color` | Default background color for the graph elements displayed on the canvas. |
| `--reactodia-link-stroke-color` | Default stroke color for the graph links displayed on the canvas. |
