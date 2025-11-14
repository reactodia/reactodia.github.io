---
title: <Toolbar />
---

# Toolbar and menu

[`<Toolbar />`](/docs/api/workspace/functions/Toolbar) component is a [canvas widget](/docs/components/canvas.md#widgets) to display a simple toolbar with a an optional dropdown menu.

## Toolbar actions

There are several built-in toolbar actions that can be displayed as menu items or quick action buttons:
| Action component | Description |
|------------------|-------------|
| [`<ToolbarAction />`](/docs/api/workspace/functions/ToolbarAction.md) | Base component to display a custom action in the menu or as button. |
| [`<ToolbarActionOpen />`](/docs/api/workspace/functions/ToolbarActionOpen.md) | Opens a generic file selection dialog. |
| [`<ToolbarActionSave />`](/docs/api/workspace/functions/ToolbarActionSave.md) | Saves [diagram layout](/docs/api/workspace/classes/DataDiagramModel.md#exportlayout) state or applies [authored changes](/docs/concepts/graph-authoring.md). |
| [`<ToolbarActionClearAll />`](/docs/api/workspace/functions/ToolbarActionClearAll.md) | Clears diagram content (all elements, links, etc). |
| [`<ToolbarActionExport />`](/docs/api/workspace/functions/ToolbarActionExport.md) | Exports the diagram into a file, or prints it. |
| [`<ToolbarActionUndo />`](/docs/api/workspace/functions/ToolbarActionUndo.md) | Performs an [undo](/docs/api/workspace/interfaces/CommandHistory.md#undo) for a command from the [command history](/docs/concepts/command-history.md). |
| [`<ToolbarActionRedo />`](/docs/api/workspace/functions/ToolbarActionRedo.md) | Performs a [redo](/docs/api/workspace/interfaces/CommandHistory.md#redo) for a command from the [command history](/docs/concepts/command-history.md). |
| [`<ToolbarActionLayout />`](/docs/api/workspace/functions/ToolbarActionLayout.md) | Performs the default [graph layout algorithm](/docs/concepts/graph-layout.md) on the diagram content. |
| [`<ToolbarLanguageSelector />`](/docs/api/workspace/functions/ToolbarLanguageSelector.md) | Displays a [data language](/docs/api/workspace/classes/DiagramModel.md#language) selector for the workspace. |

### Example: additional toolbars

```tsx live
function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount, getContext} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
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
          actions={null}
          navigator={null}>
          <Reactodia.Toolbar dock='sw'
            menu={
              <>
                <Reactodia.ToolbarActionClearAll />
                <Reactodia.ToolbarActionExport kind='print' />
              </>
            }>
            <Reactodia.ToolbarActionUndo />
            <Reactodia.ToolbarActionRedo />
            <Reactodia.ToolbarActionLayout />
          </Reactodia.Toolbar>
          <Reactodia.Toolbar dock='ne'>
            <Reactodia.ToolbarAction
              onSelect={() => {
                const {overlay} = getContext();
                overlay.showDialog({content: <div>🎉</div>});
              }}>
              Show a dialog
            </Reactodia.ToolbarAction>
          </Reactodia.Toolbar>
          <Reactodia.Toolbar dock='se'>
            <Reactodia.ToolbarLanguageSelector
              languages={[
                {code: 'de', label: 'Deutsch'},
                {code: 'en', label: 'english'},
                {code: 'es', label: 'español'},
                {code: 'ru', label: 'русский'},
                {code: 'zh', label: '汉语'},
              ]}
            />
          </Reactodia.Toolbar>
        </Reactodia.DefaultWorkspace>
      </Reactodia.Workspace>
    </div>
  );
}
```

## Styles

The component look can be customized using the following CSS properties (see [design system](/docs/concepts/design-system.mdx) for more information):

| Property | Description |
|----------|-------------|
| `--reactodia-toolbar-height` | Default height for the toolbar and the menu toggle. |
