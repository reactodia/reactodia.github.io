---
title: <Canvas />
---

# Canvas and widgets

[`<Canvas />`](/docs/api/workspace/functions/Canvas) is a main component to display a scrollable canvas for the diagram with [elements](/docs/concepts/graph-model.md), [links](/docs/concepts/graph-model.md) and additional widgets.

## Customizing element and link appearance {#customization}

It is possible to customize how elements (nodes) and links (edges) are rendered on the canvas by providing `elementTemplateResolver` ([`TypedElementResolver`](/docs/api/workspace/type-aliases/TypedElementResolver.md)) and/or `linkTemplateResolver` ([`LinkTemplateResolver`](/docs/api/workspace/type-aliases/LinkTemplateResolver.md)) props to the `<Canvas />`.

An element or link template is an object with rendering function (returning a React component to display it) and additional rendering settings such as element shape, link markers, etc.

An **element template** is an [`ElementTemplate`](/docs/api/workspace/interfaces/ElementTemplate.md) object with rendering function (returning a React component to display the element) and additional settings, such as element shape (rectangular or elliptical).

A **link template** is a [`LinkTemplate`](/docs/api/workspace/interfaces/LinkTemplate.md) object with rendering function (returning a React component to display the link) and additional settings, such as link markers (mini-shapes on its endpoints, e.g. arrowheads) and path spline type (straight or smooth).

The library provides the following built-in templates:

| Template             | Type | Description |
|----------------------|------|-------------|
| [`StandardTemplate`](/docs/api/workspace/variables/StandardTemplate.md) | element | Default (fallback) template for an element; supports single entity elements and [entity groups](/docs/concepts/graph-model.md#data-graph).<br />Uses [`StandardEntity`](/docs/api/workspace/functions/StandardEntity.md) and [`StandardEntityGroup`](/docs/api/workspace/functions/StandardEntityGroup.md) components to render elements. |
| [`ClassicTemplate`](/docs/api/workspace/variables/ClassicTemplate.md) | element | Element template component with classic "look and feel" which was used for elements before v0.8; does not support entity groups.<br />Uses [`ClassicEntity`](/docs/api/workspace/functions/ClassicEntity.md) component to render elements. |
| [`RoundTemplate`](/docs/api/workspace/variables/RoundTemplate.md) | element | Basic element template with an round (elliptical) shape; does not support entity groups.<br />Uses [`RoundEntity`](/docs/api/workspace/functions/RoundEntity.md) component to render elements. |
| [`StandardLinkTemplate`](/docs/api/workspace/variables/StandardLinkTemplate.md) | link | Default (fallback) template for a link; supports single relation links and [relation groups](/docs/concepts/graph-model.md#data-graph).<br />Uses [`StandardRelation`](/docs/api/workspace/functions/StandardRelation.md) component to render links which uses [`LinkPath`](/docs/api/workspace/functions/LinkPath.md), [`LinkLabel`](/docs/api/workspace/functions/LinkLabel.md) and [`LinkVertices`](/docs/api/workspace/functions/LinkVertices.md) components inside to display the link connection itself, the labels and vertices (to change link geometry). |
| [`NoteTemplate`](/docs/api/workspace/variables/NoteTemplate.md) | element | Default template for [annotation elements](/docs/concepts/graph-model.md#annotations).<br />Uses [`NoteAnnotation`](/docs/api/workspace/functions/NoteAnnotation.md) component to render a user-resizable note with editable text content and style. |
| [`NoteLinkTemplate`](/docs/api/workspace/variables/NoteLinkTemplate.md) | link | Default template for [annotation links](/docs/concepts/graph-model.md#annotations).<br />Uses [`NoteLink`](/docs/api/workspace/functions/NoteLink.md) component to render a [basic link](/docs/api/workspace/functions/BasicLink.md) with an optional label if the link was [renamed](/docs/api/workspace/interfaces/RenameLinkProvider.md). |

Additionally, it is possible to override how the link are routed (how default path geometry is computed) on the canvas by providing `linkRouter` ([`LinkRouter`](/docs/api/workspace/interfaces/LinkRouter.md)) prop to the `<Canvas />`. By default, the [`DefaultLinkRouter`](/docs/api/workspace/classes/DefaultLinkRouter.md) is used which moves apart multiple links between same elements and displays self-links (where target is equal to source) as loops.

### Element decorations

To further customize element rendering the library provides [`<ElementDecoration />`](/docs/api/workspace/functions/ElementDecoration.md) component to display a decoration over a canvas element. These decorations are rendered outside the element template content itself and does not contribute to the measured size of an element.

All decorations for a specific entity are rendered as children of a DOM element with `reactodia-element-decorators` CSS class which immediately follows each target canvas element in the DOM. Such parent DOM elements for the decorations have `transform: translate(...)`, `width` and `height` set to the same values as the target element to be able to layout decoration content via CSS:

```css
/* Position decoration to the left of the target canvas element  */
.my-custom-decoration {
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translate(-100%,-50%);
}

/* Show decoration on hover over it or target canvas element */
.reactodia-overlaid-element:hover + .reactodia-element-decorations .my-custom-decoration,
.my-custom-decoration:hover {
  opacity: 1;
}
```

:::tip
See complete [style customization example](/docs/examples/style-customization) with custom element and link templates, element decorations and more.
:::

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

## Widgets

Canvas widget is any React component placed as a child to [`<Canvas />`](/docs/api/workspace/functions/Canvas).

There are multiple canvas layers to place widgets on, from top one to the bottom:

| Layer name         | [Coordinate type](/docs/concepts/canvas-coordinates.md) | Is scaled | Is scrolled | Description |
|--------------------|-------------------|---|---|-------------|
| `viewport`         | client (viewport) | ❌ | ❌ | Top layer, placed over all diagram content and other layers. |
| `overElements`     | scrollable pane   | ❌ | ✔ | Placed over both elements and links. |
| `overLinks`        | scrollable pane   | ❌ | ✔ | Placed under elements but over links (including its geometry and labels). |
| `overLinkGeometry` | scrollable pane   | ❌ | ✔ | Placed under link labels but over link geometry (paths). |
| `underlay`         | scrollable pane   | ❌ | ✔ | Bottom layer, placed under all diagram content and other layers. |

By default, every child component (widget) is placed at `viewport` layer over canvas viewport. However, [`<CanvasPlaceAt />`](/docs/api/workspace/functions/CanvasPlaceAt.md) can be used to display its children at a different layer:

```tsx
function MyWidget() {
  return (
    <>
      <div>
        {/* This will be displayer over viewport */}
      </div>
      <Reactodia.CanvasPlaceAt layer='overLinkGeometry'>
        {/* ... render additonal link decorations ... */}
      </Reactodia.CanvasPlaceAt>
      <Reactodia.CanvasPlaceAt layer='underlay'>
        {/* ... render additional background content */}
      </Reactodia.CanvasPlaceAt>
    </>
  );
}

...
return (
  <Reactodia.Workspace ref={onMount}
    defaultLayout={defaultLayout}>
    <Reactodia.WorkspaceRoot>
      <Reactodia.Canvas>
        <MyWidget />
      </Reactodia.Canvas>
    </Reactodia.WorkspaceRoot>
  </Reactodia.Workspace>
);
```

:::warning
`<CanvasPlaceAt />` cannot be nested into itself, otherwise an error will be thrown.
:::

### Example: simple viewport widget

```tsx live noInline
function SelectAllButton() {
  const {model} = Reactodia.useWorkspace();
  return (
    <Reactodia.ViewportDock dock='n'>
      <button type='button'
        className='reactodia-btn reactodia-btn-default'
        onClick={() => model.setSelection([...model.elements])}>
        Select All
      </button>
    </Reactodia.ViewportDock>
  );
}

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
        <Reactodia.WorkspaceRoot>
          <Reactodia.Canvas>
            <Reactodia.Halo />
            <Reactodia.HaloLink />
            <Reactodia.Selection />
            <SelectAllButton />
          </Reactodia.Canvas>
        </Reactodia.WorkspaceRoot>
      </Reactodia.Workspace>
    </div>
  );
}

render(<Example />);
```

### Example: placing components at [canvas coordinates](/docs/concepts/canvas-coordinates.md)

When placing a component at non-`viewport` layer, it is usually neccessary to position it based on other [diagram cells](/docs/concepts/graph-model.md). In that cases the widget needs to subscribe to canvas content and transform changes (including canvas total size, scale and origin point).

```tsx live noInline
function OverlayAndUnderlay() {
  const {canvas, model} = Reactodia.useCanvas();

  // Update on canvas transform changes (change scale, size or origin)
  Reactodia.useSyncStore(
    Reactodia.useLayerDebouncedStore(
      Reactodia.useEventStore(canvas.events, 'changeTransform'),
      canvas.renderingState
    ),
    () => canvas.metrics.getTransform()
  );

  // Track average of element centers
  const p = Reactodia.useSyncStoreWithComparator(
    Reactodia.useLayerDebouncedStore(
      useAllElementBoundsStore(),
      canvas.renderingState
    ),
    () => Reactodia.calculateAveragePosition(
      model.elements,
      canvas.renderingState
    ),
    (a, b) => Reactodia.Vector.equals(a, b)
  );

  const {x, y} = canvas.metrics.paperToScrollablePaneCoords(p.x, p.y);

  const style: React.CSSProperties = {
    position: 'absolute',
    left: x - 50,
    top: y - 50,
    width: 100,
    height: 100,
    pointerEvents: 'none',
  };

  return (
    <>
      <Reactodia.CanvasPlaceAt layer='underlay'>
        <div style={{...style, background: 'cornflowerblue'}} />
      </Reactodia.CanvasPlaceAt>
      <Reactodia.CanvasPlaceAt layer='overElements'>
        <div style={{...style, border: '2px dashed violet'}} />
      </Reactodia.CanvasPlaceAt>
    </>
  );
}

function useAllElementBoundsStore(): Reactodia.SyncStore {
  const {canvas, model} = Reactodia.useCanvas();
  return React.useCallback<Reactodia.SyncStore>(onChange => {
    const listener = new Reactodia.EventObserver();
    listener.listen(model.events, 'changeCells', onChange);
    listener.listen(model.events, 'elementEvent', ({data}) => {
      if (data.changePosition) {
        onChange();
      }
    });
    listener.listen(canvas.renderingState.events, 'changeElementSize', onChange);
    return () => listener.stopListening();
  }, [model.events, canvas.renderingState.events]);
}

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
          search={null}>
          <OverlayAndUnderlay />
        </Reactodia.DefaultWorkspace>
      </Reactodia.Workspace>
    </div>
  );
}

render(<Example />);
```

## Exporting the canvas

It is possible to export a "snapshot" of currently rendered canvas content into an SVG (with HTML parts) or a raster image:

| Canvas API method | Description |
|-------------------|-------------|
| [`exportSvg()`](/docs/api/workspace/interfaces/CanvasApi.md#exportsvg) | Exports the diagram as a serialized into text SVG document with `<foreignObject>` HTML layers inside. (Can be opened by the browser but not with a pure SVG image editor.) |
| [`exportRaster()`](/docs/api/workspace/interfaces/CanvasApi.md#exportraster) | Exports the diagram as a rendered raster image (e.g. PNG, JPEG, etc) serialized into base64-encoded [data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Schemes/data). |

:::note
When exporting into an SVG, the resulting document would include all diagram content as well as every CSS rule which applies to any DOM element inside the diagram content.

If possible, every image referenced from `<img>` elements, `mask` (`mask-image`) and `background` (`background-image`) CSS properties are fetched and embedded as base64 data URL strings. To ensure that images can be embedded (to export the diagram as a complete raster image) it is required that a used image can be loaded into a [`<img crossorigin="anonymous">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/crossorigin) element.

Diagram is always exported in the [light theme](/docs/concepts/design-system.mdx).
:::

To prevent being exported a DOM element can be marked with `data-reactodia-no-export` attribute or additional CSS selectors can be provided via `removeByCssSelectors` options to the export methods.

Printing the diagram can be achieved by exporting an SVG, writing it into a newly opened window and printing it:
```ts
const printWindow = window.open('', undefined, 'width=1280,height=720')!;
const svg = await canvas.exportSvg();
printWindow.document.write(svg);
printWindow.document.close();
printWindow.print();
```

The library provides a built-in [`toolbar`](/docs/components/toolbar.md) action component [`<ToolbarActionExport />`](/docs/api/workspace/functions/ToolbarActionExport.md) as a convenient way to export or print the diagram from the UI.

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
| `--reactodia-monochrome-icon-filter` | [CSS filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) for the monochrome [type style](/docs/components/workspace.md#customize-type-styles) icons. |
| `--reactodia-viewport-dock-margin` | Margin from the borders of the canvas for the viewport widgets. |
