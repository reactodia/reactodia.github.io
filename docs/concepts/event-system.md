---
sidebar_position: 3
title: Event System
---

# Publish-Subscribe Event System

Reactodia uses a lightweight [`EventEmitter`](https://nodejs.org/docs/latest/api/events.html)-like publish-subscribe mechanism to connect different components and observe changes to the state.

## Observing events

An observable instance in the library typically expose an `events` property implementing an [`Events`](/docs/api/workspace/interfaces/Events) interface. Listeners can be attached directly to the `Events` or subscribed via `EventObserver` to make it easy to unsubscribe:

```ts
const {model} = Reactodia.useWorkspace();

const onChangeSelection = () => {
  console.log('New selection:', model.selection);
};
// Subscribe to the selection change event
model.events.on('changeSelection', onChangeSelection);
// Unsubscribe, must pass the same callback
model.events.off('changeSelection', onChangeSelection);

const observer = new Reactodia.EventObserver();
// Subscribe to the language change event
observer.listen(model.events, 'changeLanguage', ({previous}) => {
  console.log(`Changed language from ${previous} to ${model.language}`);
});
// Unsubscribe from all events added via listen() by the observer
observer.stopListening();
```

It is possible to listen for all events on an instance by using [`Events.onAny()`](/docs/api/workspace/interfaces/Events.md#onany) or [`EventObserver.listenAny()`](/docs/api/workspace/classes/EventObserver.md#listenany):

```ts
function Component() {
  const {model} = React.useWorkspace();
  React.useEffect(() => {
    const element = model.getElement(elementId);
    const observer = new Reactodia.EventObserver();
    observer.listenAny(element, ({data}) => {
      if (data.requestedFocus || data.requestedRedraw) {
        console.log('Element requested something');
      }
    });
    return () => observer.stopListening();
  }, [elementId]);
  // ...
}
```

### Using React hooks to listen to events

In case of change-like events it is recommended to use [`useObservedProperty()`](/docs/api/workspace/functions/useObservedProperty.md) to observe current value:

```ts
const {editor} = Reactodia.useWorkspace();
// Subscribe to editor.authoringState changes
const authoringState = Reactodia.useObservedProperty(
  editor.events, 'changeAuthoringState', () => editor.authoringState
);
```

Alternatively it is possible to use a combination of [`useEventStore()`](/docs/api/workspace/functions/useEventStore.md) and either a React built-in [`useSyncExternalStore()`](https://react.dev/reference/react/useSyncExternalStore) or a compatibility shim [`Reactodia.useSyncStore()`](/docs/api/workspace/functions/useSyncStore.md) for more control over subscription:

```ts
import { useSyncExternalStore } from 'react';

function Component() {
  const {editor} = Reactodia.useWorkspace();
  const eventStore = Reactodia.useEventStore(
    editor.events, 'changeAuthoringState'
  );
  const debouncedStore = Reactodia.useFrameDebouncedStore(eventStore);
  const authoringState = useSyncExternalStore(
    debouncedStore, () => editor.authoringState
  );
  // ...
}
```

In the above example, [`Reactodia.useFrameDebouncedStore()`](/docs/api/workspace/functions/useFrameDebouncedStore.md) hook is used to debounce React component updates due to triggered events from the event store to only once each rendered frame based on [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame).

Alternatively, [`Reactodia.useLayerDebouncedStore()`](/docs/api/workspace/functions/useLayerDebouncedStore.md) can be used for debounce store updates until the next canvas layer update or explicit [`RenderingState.syncUpdate()`](/docs/api/workspace/interfaces/RenderingState.md#syncupdate) call to force all layers to be rendered in order (e.g. to read element sizes or other dependent rendering state).

## Making an observable

To create an observable instance it would be enough to implement the [`Events`](/docs/api/workspace/interfaces/Events) interface. An easiest way to do it would be to use [`EventSource`](/docs/api/workspace/classes/EventSource):

```ts
// Declare event types
interface MyObservableEvents {
  changeTitle: Reactodia.PropertyChange<MyObservableThing, string>;
  notification: {
    readonly status: 'normal' | 'error';
    readonly message: string;
  };
}

class MyObservableThing {
  // Create an event source
  private readonly source = new EventSource<MyObservableEvents>();
  readonly events: Events<MyObservableEvents> = this.source;

  // ...

  setTitle(title: string) {
    const previous = this._title;
    if (previous !== title) {
      this._title = title;
      // Trigger change event
      this.source.trigger('changeTitle', {source: this, previous});
    }
  }

  private handleNotification(status: 'normal' | 'error', message: string): void {
    // Trigger another event
    this.source.trigger('notification', {status, message});
  }
}
```

:::tip
[`EventSource`](/docs/api/workspace/classes/EventSource) implements [`EventTrigger`](/docs/api/workspace/interfaces/EventTrigger) interface which can be used as a separate type, e.g. a combination of `Events<T> & EventTrigger<T>` can be used as an "event bus" to trigger and listen for events at the same time.
:::

## Using command bus to communicate with components {#command-bus}

Reactodia workspace context provides means for components to communicate with each other through an event bus (**command bus**). It is possible to get a shared command bus instance by calling [`WorkspaceContext.getCommandBus()`](/docs/api/workspace/interfaces/WorkspaceContext.md) with a defined [`CommandBusTopic`](/docs/api/workspace/classes/CommandBusTopic.md) constant:

```ts
// Define possible commands for a bus
interface MyCommands {
  showAlert: { readonly message: string };
}
// Define a command bus topic
const MyTopic = CommandBusTopic.define<MyCommands>();

// Observe commands in a component
function MyComponent() {
  const {getCommandBus} = Reactodia.useWorkspace();

  const commands = getCommandBus(MyTopic);
  React.useEffect(() => {
    // Subscribe for a command in a particular topic
    const listener = new Reactodia.EventObserver();
    listener.listen(commands, 'showAlert', ({message}) => {
      showAlert(message);
    });
    return () => listener.stopListening();
  }, [commands]);
  // ...
}

// Trigger commands from any other place
function OtherComponent() {
  const {getCommandBus} = Reactodia.useWorkspace();

  const onClick = () => {
    getCommandBus(MyTopic)
      .trigger('showAlert', {message: 'Hello!'});
  };
  // ...
}
```

Each Reactodia [`<Workspace />`](/docs/components/workspace.md) instance maintains its own command buses for each topic not connected to other workspaces in any way.
