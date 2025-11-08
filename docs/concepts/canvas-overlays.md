---
sidebar_position: 8
---

# Overlay dialogs and tasks

## Canvas dialogs

It is possible to show a dialog either attached to target [element](/docs/concepts/graph-model.md), [link](/docs/concepts/graph-model.md) or as a modal over the canvas viewport itself.

### Showing a dialog

The following methods and properties from [`OverlayController`](/docs/api/workspace/classes/OverlayController) (accessible from [workspace context](/docs/concepts/workspace-context.md)) provide means to interact with the dialogs:

| Method or property | Description |
|--------------------|-------------|
| [`showDialog()`](/docs/api/workspace/classes/OverlayController#showdialog) method | Opens a dialog with the specified style and content. |
| [`hideDialog()`](/docs/api/workspace/classes/OverlayController#hidedialog) method | Hides a currently open dialog. |
| [`openedDialog`](/docs/api/workspace/classes/OverlayController#openeddialog) property | Can be used to read the state of the currently open dialog. <br/> Has corresponding [`changeOpenedDialog`](/docs/api/workspace/interfaces/OverlayControllerEvents.md) event. |

### Example: a modal dialog over the viewport

```tsx live
function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
      const {overlay} = context;
      overlay.showDialog({
        style: {
          caption: 'Custom modal dialog',
        },
        content: (
          <div className='reactodia-form'>
            <div className='reactodia-form__body'>
              <div>Custom dialog content</div>
            </div>
            <div className='reactodia-form__controls'>
              <button className='reactodia-btn reactodia-btn-primary'
                type='button'
                onClick={() => overlay.hideDialog()}>
                Close
              </button>
            </div>
          </div>
        ),
      });
  }, []);

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
        <Reactodia.DefaultWorkspace />
      </Reactodia.Workspace>
    </div>
  );
}
```

### Dialog styles

The component look can be customized using the following CSS properties (see [design system](/docs/concepts/design-system.mdx) for more information):

| Property | Description |
|----------|-------------|
| `--reactodia-dialog-border-color`  | Border color for the dialog (uses the base border color if not set). |
| `--reactodia-dialog-border-radius` | Border radius for the dialog (uses the base border radius if not set). |
| `--reactodia-dialog-border-width`  | Border width for the dialog (uses the base border width if not set). |
| `--reactodia-dialog-viewport-breakpoint-s` | Makes the dialog fill the viewport if the available width is less or equal to that value. |

## Overlay tasks

:::info
This section is incomplete, please look at the reference API documentation instead:
  - [`OverlayController.startTask()`](/docs/api/workspace/classes/OverlayController.md#starttask)
  - [`OverlayController.showSpinnerWhile()`](/docs/api/workspace/classes/OverlayController.md#showspinnerwhile)
:::
