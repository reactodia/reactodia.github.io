---
title: <Toolbar />
---

# Toolbar and menu

[`<Toolbar />`](/docs/api/workspace/functions/Toolbar) component is a [canvas widget](/docs/components/canvas.md) to display a simple toolbar with a an optional dropdown menu.

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

## Styles

The component look can be customized using the following CSS properties (see [design system](/docs/concepts/design-system.mdx) for more information):

| Property | Description |
|----------|-------------|
| `--reactodia-toolbar-height` | Default height for the toolbar and the menu toggle. |
