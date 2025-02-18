---
sidebar_position: 4
---

# Command History

Reactodia uses a common pattern to organize changes to the diagram model into "commands" representing different atomic actions to facilitate undo/redo support.

## Commands and undo/redo history

The [`Command`](/docs/api/workspace/interfaces/Command) interface defines an action which performs a set of changes to the Reactodia state and can be executed and reverted as needed.

:::tip
The library contains many built-in commands to manipulate the diagram model, graph authoring state or perform other effects, you can find them all at [API > workspace > Commands](/docs/api/workspace/#commands).
:::

To execute or revert a command, the [`CommandHistory`](/docs/api/workspace/interfaces/CommandHistory) instance from `DiagramModel.history` should be used to be able to undo or redo it later:

```ts
function Component() {
  const {model} = Reactodia.useWorkspace();

  const onClick = () => {
    const command = changeLinkTypeVisibility(
      model, 'http://example.com/connectedTo', 'hidden'
    );
    model.history.execute(command);
  };

  const onUndo = () => {
    // Later: undo or redo a command
    model.history.undo();
    model.history.redo();
  };

  // ...
}
```

Another way to use command history is to perform state changes and register a "revert" command which is used for diagram geometry updates:

```ts
function Component() {
  const {model} = Reactodia.useWorkspace();

  const onMove = () => {
    const restoreGeometry = Reactodia.RestoreGeometry.capture(model);
    /* ... make changes to the element positions and link vertices ... */
    model.history.registerToUndo(command);
  };

  // ...
}
```

## Command batches

When executing multiple commands in a sequence in cases it would be desirable to undo or redo them all at once at though they were a single atomic command. In that case it is possible to start a [`CommandBatch`](/docs/api/workspace/interfaces/CommandBatch.md) via [`CommandHistory.startBatch()`](/docs/api/workspace/interfaces/CommandHistory.md#startbatch), execute the commands and store the batch, so a single command is added to the history:

```ts
function Component() {
  const {model} = Reactodia.useWorkspace();
  const {canvas} = Reactodia.useCanvas();

  const onAddElements = (
    target: Reactodia.Element,
    iris: readonly Reactodia.ElementIri[]
  ) => {
    const batch = model.history.startBatch('Adding multiple elements');

    for (const iri of iris) {
      // Some methods implicitly add commands to the history,
      // i.e. to the active batch if any
      const element = model.createElement(iri);

      // In other cases the command needs to be executed explicitly
      batch.history.execute(setElementState(element, {'my:custom:state': 42}));
    }

    batch.store();
  };
}
```

It is also possible to discard a batch instead of storing it with [`CommandBatch.discard()`](/docs/api/workspace/interfaces/CommandBatch.md#discard) to avoid putting the commands in the history in the first place.

:::note
Starting a new batch when there is an active command batch already causes the new batch to become nested, which allows to use operations creating command batches as part of a larger operation having its own top-level batch.
:::

## How to define a new command

While it is possible to implement [`Command`](/docs/api/workspace/interfaces/Command.md) interface directly, the library provides a [utility namespace](/docs/api/workspace/namespaces/Command) with the same name to simplify the process.

[`Command.create()`](/docs/api/workspace/namespaces/Command/functions/create.md) defines a command from a callback which returns the reverse command:

```ts
function exchangeElementPositions(
  first: Reactodia.ElementElement,
  second: Reactodia.ElementElement
): Command {
  return Command.create('Exchange element positions', () => {
    const position = first.position;
    first.setPosition(second.position);
    second.setPosition(position);
    return exchangeElementPositions(first, second);
  });
}
```

[`Command.compound()`](/docs/api/workspace/namespaces/Command/functions/compound.md) defines a command from a sequence of other commands similar to using a command batch:

```ts
function resetElementStateForAll(
  elements: readonly Reactodia.ElementElement[]
): Command {
  const commands = elements.map(el => Reactodia.setElementState(el, undefined));
  return Command.compound('Reset state for elements', commands);
}
```

[`Command.effect()`](/docs/api/workspace/namespaces/Command/functions/effect.md) defines a command which runs only after it executed in "forward" direction but skipped on revert:

```ts
function logAsCommand(message: string): Command {
  return Command.effect('Log a message', () => console.log(message));
}
```
