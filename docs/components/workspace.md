---
title: <Workspace />
---

# Workspace Components

[`<Workspace />`](/docs/api/workspace/classes/Workspace) is a top-level component which establishes [workspace context](/docs/api/workspace/interfaces/WorkspaceContext), which stores graph data and provides means to display and interact with the diagram.

## Hooks

[`useLoadedWorkspace()`](/docs/api/workspace/functions/useLoadedWorkspace) hook should be used to perform an initial initialization for the workspace which correctly reverts the changes and aborts async operations via provided [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) when the workspace component is unmounted.

[`useWorkspace()`](/docs/api/workspace/functions/useWorkspace) hook can be used from inside `<Workspace />` child components to access workspace context; see [workspace context](/docs/concepts/workspace-context.md) for details.

## Workspace Layout

The UI of the workspace is defined by the child components provided to the `<Workspace />`:

Default built-in layout is provided as [`<DefaultWorkspace />`](/docs/api/workspace/functions/DefaultWorkspace) component which includes the [unified search](/docs/components/unified-search.md), main menu and action [toolbars](/docs/components/toolbar.md) and all built-in [canvas widgets](/docs/components/canvas.md#widgets).

Alternative (classic) built-in layout is provided as [`<ClassicWorkspace />`](/docs/api/workspace/functions/ClassicWorkspace) component which uses [layout panels](/docs/components/workspace-layout-panels.md) with [class tree](/docs/components/class-tree.md), [instances search](/docs/components/instances-search.md), [link types toolbox](/docs/components/link-types-toolbox.md), [`<ClassicToolbar />`](/docs/api/workspace/functions/ClassicToolbar) and all built-in [canvas widgets](/docs/components/canvas.md#widgets).

When providing a custom workspace layout it is required to use [`<WorkspaceRoot />`](/docs/api/workspace/functions/WorkspaceRoot) as a top-level parent component to establish necessary style defaults, including styles for light or dark [color scheme](/docs/concepts/design-system.mdx).

### Example: canvas-only custom layout

```tsx live
function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
      const {model, view} = context;
      const dataProvider = new Reactodia.EmptyDataProvider();
      await model.createNewDiagram({dataProvider, signal});
      model.createElement('http://example.com/entity');
      const canvas = view.findAnyCanvas();
      canvas.zoomToFit();
  }, []);

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
        <Reactodia.WorkspaceRoot>
          <Reactodia.Canvas />
        </Reactodia.WorkspaceRoot>
      </Reactodia.Workspace>
    </div>
  );
}
```

## Customize type styles

Reactodia displays [entities](/docs/concepts/graph-model.md) in different places throughout the workspace components. It is possible to customize overall style based on entity types (accent color and icon) by providing a custom [`TypeStyleResolver`](/docs/api/workspace/type-aliases/TypeStyleResolver.md) to the `<Workspace typeStyleResolver={...} />`:

```tsx
<Reactodia.Workspace
  typeStyleResolver={types => {
      if (types.includes('http://www.w3.org/2000/01/rdf-schema#Class')) {
          return {icon: CERTIFICATE_ICON, iconMonochrome: true};
      } else if (types.includes('http://www.w3.org/2002/07/owl#Class')) {
          return {icon: CERTIFICATE_ICON, iconMonochrome: true};
      } else if (types.includes('http://www.w3.org/2002/07/owl#ObjectProperty')) {
          return {icon: COG_ICON, iconMonochrome: true};
      } else if (types.includes('http://www.w3.org/2002/07/owl#DatatypeProperty')) {
          return {color: '#00b9f2'};
      } else {
          return undefined;
      }
  }}
  ...>
```

By default, the colors are assigned deterministically based on total hash of the types in the [entity data](/docs/api/workspace/interfaces/ElementModel.md).
