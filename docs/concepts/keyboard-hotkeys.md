---
sidebar_position: 9
title: Keyboard Hotkeys
---

# Keyboard hotkeys (shortcuts)

Reactodia provides a basic support for keyboard hotkeys (shortcuts) to perform an action on a key press.

:::note
The library currently only supports a canvas-focused hotkeys which will be active only when the [canvas](/docs/components/canvas.md) or its content is focused, unlike global (page) hotkeys which are active when the focus is anywhere on the page.
:::

## Hotkey syntax

A **hotkey string** represents a single keyboard key press with (optionally) one or more modifier keys being held.

The valid hotkey expression is at least one or more modifiers and the key separated by `+`:
  - modifier is one of `Mod`, `Ctrl`, `Meta`, `Alt`, `Shift`
   (`Mod` is `Meta` on Mac and `Ctrl` everywhere else).
  - key is a [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
    with a special case for `A-Z` keys to handle them independently of an active keyboard layout
    (these keys will work even if a non-english keyboard layout is active).
  - single-letter keys are matched case-insensitively, so `Ctrl+Shift+a` is the same as `Ctrl+Shift+A`.
  - `Shift`-specific special keys needs to be specified as-is i.e. `Shift+5` will not be triggered and
    should be specified as `Shift+%` (and only for keyboard layouts with that mapping).

Example hotkey strings: `Ctrl+Alt+K`, `Alt+Meta+Q`, `Ctrl+/`, `None+G`.

## How to define a hotkey

At high level, various Reactodia components provide a prop for a hotkey string to perform a certain action, see [`<ToolbarAction />`](/docs/components/toolbar.md), [`<SelectionAction />`](/docs/components/selection.md):

```tsx
{/* Default hotkeys for the built-in components: */}
<ToolbarActionUndo hotkey='Mod+Z' />
<ToolbarActionRedo hotkey='Mod+Shift+Z' />
<Selection hotkeySelectAll='Mod+A' />
<SelectionActionGroup hokey='None+G' />
<SelectionActionRemove hotkey='Node+Delete' />

{/* Hotkey for a custom toolbar action: */}
<ToolbarAction
  hotkey="Ctrl+Alt+H"
  onSelect={() => {/*...*/}}>
  Custom action
</ToolbarAction>
```

At low level, it is possible to register a hotkey with [`useCanvasHotkey()`](/docs/api/workspace/functions/useCanvasHotkey.md) hook to listen for a specific hotkey as long as the caller component is mounted:

```tsx
function MyWidget() {
  const actionKey = Reactodia.useCanvasHotkey('Ctrl+Alt+H', () => {
    /* Perform hotkey action */
  });

  // Display the human-readable hotkey label (as text) in the UI
  return (
    <button>
      Do the action ({actionKey.text})
    </button>
  );
}
```

:::warning
If multiple handlers are registered for the same hotkey, only the first one will run if triggered by the keypress.
:::
