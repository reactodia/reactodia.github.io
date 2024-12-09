---
title: Dialog
---

# Dialog system

It is possible to show a dialog either attached to target [element](/docs/concepts/graph-model.md), [link](/docs/concepts/graph-model.md) or as a modal over the canvas viewport itself.

The following methods and properties from [OverlayController](/docs/api/workspace/classes/OverlayController) (accessible from [workspace context](/docs/concepts/workspace-context.md)) provide means to interact with the dialogs:

| Method or property | Description |
|--------------------|-------------|
| [showDialog()](/docs/api/workspace/classes/OverlayController#showdialog) method | Opens a dialog with the specified style and content. |
| [hideDialog()](/docs/api/workspace/classes/OverlayController#hidedialog) method | Hides a currently open dialog. |
| [openedDialog](/docs/api/workspace/classes/OverlayController#openeddialog) property | Can be used to read the state of the currently open dialog. <br/> Has corresponding [changeOpenedDialog](/docs/api/workspace/interfaces/OverlayControllerEvents.md) event. |

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
