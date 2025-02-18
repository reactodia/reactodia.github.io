---
sidebar_position: 6
---

# Canvas Coordinates

Reactodia uses different coordinate systems when dealing with infinitely-resizable and scalable canvas content.

## Coordinate types

| Type              | Description |
|-------------------|-------------|
| paper             | Main coordinates system for [diagram content](/docs/concepts/graph-model.md) (elements, links, etc) — unlimited in size, always in 1:1 scale with element and link templates. |
| scrollable pane   | Represents scaled but still unlimited in size layer, natively scrolled inside viewport container. <br/> It is possible to use [`totalPaneSize()`](/docs/api/workspace/functions/totalPaneSize.md) and [`paneTopLeft()`](/docs/api/workspace/functions/paneTopLeft.md) to get current pane bounds with the same coordinates type. |
| client (viewport) | Represents fixed-size "window" into visible graph area, equal to [DOM client coordinates](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth) for the [`Canvas`](/docs/components/canvas) component. |
| page              | Same as [DOM page coordinates](https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_view/Coordinate_systems#page) — generally used when handling pointer-related events. |

![Reactodia coordinate system](/img/reactodia-coords-structure.svg)

## Converting coordinates from/to different types

| From type         | To type           | Method |
| ------------------|-------------------|--------|
| paper             | scrollable pane   | [`paperToScrollablePaneCoords()`](/docs/api/workspace/interfaces/CanvasMetrics.md#papertoscrollablepanecoords) |
|                   | page              | [`paperToPageCoords()`](/docs/api/workspace/interfaces/CanvasMetrics.md#papertopagecoords) |
| scrollable pane   | paper             | [`scrollablePaneToPaperCoords()`](/docs/api/workspace/interfaces/CanvasMetrics.md#scrollablepanetopapercoords) |
|                   | client (viewport) | [`scrollablePaneToClientCoords()`](/docs/api/workspace/interfaces/CanvasMetrics.md#scrollablepanetoclientcoords) |
| client (viewport) | paper             | [`clientToPaperCoords()`](/docs/api/workspace/interfaces/CanvasMetrics.md#clienttopapercoords) |
|                   | scrollable pane   | [`clientToScrollablePaneCoords()`](/docs/api/workspace/interfaces/CanvasMetrics.md#clienttoscrollablepanecoords) |
| page              | paper             | [`pageToPaperCoords()`](/docs/api/workspace/interfaces/CanvasMetrics.md#pagetopapercoords) |
