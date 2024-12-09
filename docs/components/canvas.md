---
title: Canvas
---

# Canvas Components

[Canvas](/docs/api/workspace/functions/Canvas) is a main component to display a scrollable canvas for the diagram with [elements](/docs/concepts/diagram-model.md), [links](/docs/concepts/diagram-model.md) and additional widgets.

[useCanvas()](/docs/api/workspace/functions/useCanvas) hook called from a canvas widget, [SharedCanvasState.findAnyCanvas()](/docs/api/workspace/classes/SharedCanvasState.md#findanycanvas) or [SharedCanvasState.findAllCanvases()](/docs/api/workspace/classes/SharedCanvasState.md#findallcanvases) methods can be used to get the [CanvasApi](/docs/api/workspace/interfaces/CanvasApi) instance to read or subscribe to the canvas state or perform viewport-related effects.

## Canvas widgets

To define a custom canvas widget, the target React component should be marked by [defineCanvasWidget()](/docs/api/workspace/functions/defineCanvasWidget) function to define its attachment layer.

### Example: custom viewport widget

```tsx
function CustomViewportWidget() {
  return (
    <div style={{position: 'absolute', right: '10px', top: '10px'}}>
      <button type='button'
        className='reactodia-btn reactodia-btn-default'>
        Click me
      </button>
    </div>
  );
}

Reactodia.defineCanvasWidget(
  CustomViewportWidget,
  element => ({element, attachment: 'viewport'})
);
```
