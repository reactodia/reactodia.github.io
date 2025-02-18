---
sidebar_position: 5
---

# Workspace Context

Reactodia uses a common context to connect its components with the [graph model](./graph-model.md) and other services such as [graph layout](./layout-workers.md), [i18n](./i18n.md) and [visual graph authoring](./graph-authoring.md).

## Services and stores in the context

The [`WorkspaceContext`](/docs/api/workspace/interfaces/WorkspaceContext) contains references to different services and state stores, here is the important ones:

| Property name | Type             | Description |
|---------------|------------------|-------------|
| `model`       | [`DataDiagramModel`](/docs/api/workspace/classes/DataDiagramModel.md) | Stores the diagram content and asynchronously fetches from a data provider.<br/>See [graph model](./graph-model.md). |
| `view`        | [`SharedCanvasState`](/docs/api/workspace/classes/SharedCanvasState.md) | Stores common state and settings for all [canvases](/docs/components/canvas.md) in the workspace. |
| `editor`      | [`EditorController`](/docs/api/workspace/classes/EditorController.md) | Stores, modifies and validates changes from the visual graph authoring.<br/>See [graph authoring](./graph-authoring.md). |
| `overlay`     | [`OverlayController`](/docs/api/workspace/classes/OverlayController.md) | Controls UI overlays for the canvases, including dialogs and tasks. |
| `translation` | [`Translation`](/docs/api/workspace/interfaces/Translation.md) | Provides a translation for UI text strings.<br/>See [i18n](./i18n.md). |

## Getting the workspace context

The [`WorkspaceContext`](/docs/api/workspace/interfaces/WorkspaceContext) instance can be acquired in two ways.
The first one is from the result of `useLoadedWorkspace()` hook which is used for initialization of the [`Workspace`](/docs/components/workspace.md) component:

```tsx
function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount, getContext} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
      /* ... */
  }, []);

  const onSomething = () => {
    const {model, editor, /* etc */} = getContext();
    // Use workspace context
  };

  return (
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}>
      {/* ... */}
    </Reactodia.Workspace>
  );
}
```

The second way is to use [`useWorkspace()`](/docs/api/workspace/functions/useWorkspace) hook inside the [`Workspace`](/docs/components/workspace.md) component itself, e.g. a canvas widget:

```tsx
function MyWidget() {
  const {model, editor, /* etc */} = Reactodia.useWorkspace();
  // Use workspace context
}

Reactodia.defineCanvasWidget(MyWidget, element => ({element, attachment: 'viewport'}));

function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);
  return (
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
        <Reactodia.DefaultWorkspace
          search={null}
          canvasWidgets={[<MyWidget key='my-widget' />]}
        />
      </Reactodia.Workspace>
  );
}
```

:::note
The library also uses separate context for [i18n](./i18n.md) (which is accessible by [`useTranslation()`](/docs/api/workspace/functions/useTranslation.md) hook and `translation` property of the workspace context) and a nested context for the [`Canvas`](/docs/components/canvas.md).
:::
