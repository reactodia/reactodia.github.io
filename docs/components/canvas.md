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
| [`DefaultLinkTemplate`](/docs/api/workspace/variables/DefaultLinkTemplate.md) | link | Default (fallback) template for a link; supports single relation links and [relation groups](/docs/concepts/graph-model.md#data-graph).<br />Uses [`DefaultLink`](/docs/api/workspace/functions/DefaultLink.md) component to render links which uses [`LinkPath`](/docs/api/workspace/functions/LinkPath.md), [`LinkLabel`](/docs/api/workspace/functions/LinkLabel.md) and [`LinkVertices`](/docs/api/workspace/functions/LinkVertices.md) components inside to display the link connection itself, the labels and vertices (to change link geometry). |

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

## Exporting the canvas

It is possible to export a "snapshot" of currently rendered canvas content into an SVG (with HTML parts) or a raster image:

| Canvas API method | Description |
|-------------------|-------------|
| [`exportSvg()`](/docs/api/workspace/interfaces/CanvasApi.md#exportsvg) | Exports the diagram as a serialized into text SVG document with `<foreignObject>` HTML layers inside. (Can be opened by the browser but not with a pure SVG image editor.) |
| [`exportRaster()`](/docs/api/workspace/interfaces/CanvasApi.md#exportraster) | Exports the diagram as a rendered raster image (e.g. PNG, JPEG, etc) serialized into base64-encoded [data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Schemes/data). |

:::note
When exporting into an SVG, the resulting document would include all diagram content as well as every CSS rule which applies to any DOM element inside the diagram content.

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
