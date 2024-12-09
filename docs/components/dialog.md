---
title: Dialog
---

# Dialog system

It is possible to show a dialog either attached to target [element](/docs/concepts/diagram-model.md), [link](/docs/concepts/diagram-model.md) or as a modal over the canvas viewport itself.

[OverlayController.showDialog()](/docs/api/workspace/classes/OverlayController#showdialog) opens a dialog with the specified style and content.

[OverlayController.hideDialog()](/docs/api/workspace/classes/OverlayController#hideDialog) hides a currently open dialog.

[OverlayController.openedDialog](/docs/api/workspace/classes/OverlayController#openeddialog) property and corresponding [change event](/docs/api/workspace/interfaces/OverlayControllerEvents.md) can be used to read the state of the currently open dialog.

### Example: a modal dialog over the viewport

```tsx
const {overlay} = Reactodia.useWorkspace();
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
```
