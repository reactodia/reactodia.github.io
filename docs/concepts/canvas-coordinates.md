---
sidebar_position: 6
---

# Canvas Coordinates

## Coordinate types

| Type  | Description |
|-------------------|-------------|
| paper             | Main coordinates system for diagram element positions and sizes — unlimited in size, always in 1:1 scale with element and link templates. |
| scrollable pane   | Represents scaled paper layer — unlimited in size, natively scrolled inside viewport container. |
| client (viewport) | Represents fixed-size "window" into visible graph area, equal to [DOM client coordinates](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth) for the [Canvas](/docs/components/canvas) component. |
| page              | Same as [DOM page coordinates](https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_view/Coordinate_systems#page). |

![Reactodia coordinate system](/img/reactodia-coords-structure.svg)
