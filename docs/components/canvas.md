---
title: Canvas
---

# Canvas Components

[Canvas](/docs/api/workspace/functions/Canvas) is a main component to display a scrollable canvas for the diagram with [elements](/docs/concepts/graph-model.md), [links](/docs/concepts/graph-model.md) and additional widgets.

## Hooks

[useCanvas()](/docs/api/workspace/functions/useCanvas) hook called from a canvas widget, [SharedCanvasState.findAnyCanvas()](/docs/api/workspace/classes/SharedCanvasState.md#findanycanvas) or [SharedCanvasState.findAllCanvases()](/docs/api/workspace/classes/SharedCanvasState.md#findallcanvases) methods can be used to get the [CanvasApi](/docs/api/workspace/interfaces/CanvasApi) instance to read or subscribe to the canvas state or perform viewport-related effects.

## Canvas widgets

To define a custom canvas widget, the target React component should be marked by [defineCanvasWidget()](/docs/api/workspace/functions/defineCanvasWidget) function to define its attachment layer.

### Example: custom viewport widget

```tsx live noInline
function CustomSelectAllWidget() {
  const {model} = Reactodia.useWorkspace();
  return (
    <div style={{position: 'absolute', right: '10px', top: '10px'}}>
      <button type='button'
        className='reactodia-btn reactodia-btn-default'
        onClick={() => model.setSelection([...model.elements])}>
        Select All
      </button>
    </div>
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
    const dataProvider = new Reactodia.EmptyDataProvider();
    await model.createNewDiagram({dataProvider, signal});
    model.createElement('http://example.com/entity1');
    model.createElement('http://example.com/entity2');
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
