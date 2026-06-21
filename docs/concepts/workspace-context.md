---
sidebar_position: 5
---

# Workspace Context

Reactodia uses a common context to connect its components with the [graph model](/docs/concepts/graph-model) and other services such as [graph layout](/docs/concepts/graph-layout), [i18n](/docs/concepts/i18n) and [visual graph authoring](/docs/concepts/graph-authoring).

## Services and stores in the context

The [`WorkspaceContext`](/docs/api/workspace/interfaces/WorkspaceContext) contains references to different services and state stores, here is the important ones:

| Property name | Type             | Description |
|---------------|------------------|-------------|
| `model`       | [`DataDiagramModel`](/docs/api/workspace/classes/DataDiagramModel.md) | Stores the diagram content and asynchronously fetches from a data provider.<br/>See [graph model](/docs/concepts/graph-model). |
| `view`        | [`SharedCanvasState`](/docs/api/workspace/classes/SharedCanvasState.md) | Stores common state and settings for all [canvases](/docs/components/canvas.md) in the workspace. |
| `editor`      | [`EditorController`](/docs/api/workspace/classes/EditorController.md) | Stores, modifies and validates changes from the visual graph authoring.<br/>See [graph authoring](/docs/concepts/graph-authoring). |
| `overlay`     | [`OverlayController`](/docs/api/workspace/classes/OverlayController.md) | Controls UI overlays for the canvases, including dialogs and tasks. |

## Getting the workspace context

The [`WorkspaceContext`](/docs/api/workspace/interfaces/WorkspaceContext) instance can be acquired in multiple ways.

At the top level it is directly available when creating the workspace with [`createWorkspace()`](/docs/api/workspace/functions/createWorkspace.md):

```tsx
function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);
  const [workspace] = React.useState(() => Reactodia.createWorkspace({
    defaultLayout,
  }));

  // `workspace` is a workspace context instance

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    // The context is also available via `context`
  }, []);

  const onSomething = () => {
    const {model, editor, /* etc */} = workspace;
    // Use workspace context
  };

  return (
    <Reactodia.WorkspaceProvider workspace={workspace}
      onMount={onMount}>
      {/* ... */}
    </Reactodia.WorkspaceProvider>
  );
}
```

There is also a [`useWorkspace()`](/docs/api/workspace/functions/useWorkspace) hook to get the context from children rendered inside the [`Workspace`](/docs/components/workspace.md) or [`WorkspaceProvider`](/docs/components/workspace.md) components, e.g. a canvas widget:

```tsx
function MyWidget() {
  const {model, editor, /* etc */} = Reactodia.useWorkspace();
  // Use workspace context
}

function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);
  return (
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
        <Reactodia.DefaultWorkspace
          search={null}>
          <MyWidget />
        </Reactodia.DefaultWorkspace>
      </Reactodia.Workspace>
  );
}
```

:::note
The library also uses separate context for [i18n](/docs/concepts/i18n) (accessible with [`useTranslation()`](/docs/api/workspace/functions/useTranslation.md) hook) and a nested context for the [`Canvas`](/docs/components/canvas.md) (accessible with [`useCanvas()`](/docs/api/workspace/functions/useCanvas.md) hook).
:::
