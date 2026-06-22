import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

export interface SharedHistoryEvents {
  activateOrigin: {
    originId: string;
  };
}

export class SharedHistory extends Reactodia.InMemoryHistory {
  private readonly extendedSource = new Reactodia.EventSource<SharedHistoryEvents>();

  readonly extendedEvents: Reactodia.Events<SharedHistoryEvents> = this.extendedSource;

  override undo(): void {
    const command = this.undoStack[this.undoStack.length - 1];
    if (command instanceof SharedCommand) {
      this.extendedSource.trigger('activateOrigin', {originId: command.originId});
    }
    super.undo();
  }

  override redo(): void {
    const command = this.redoStack[this.redoStack.length - 1];
    super.redo();
    if (command instanceof SharedCommand) {
      this.extendedSource.trigger('activateOrigin', {originId: command.originId});
    }
  }
}

export class SharedHistoryRef implements Reactodia.CommandHistory {
  private readonly baseForBatch: Reactodia.CommandHistory;

  constructor(
    readonly baseHistory: SharedHistory,
    readonly originId: string,
  ) {
    this.baseForBatch = Object.create(baseHistory);
    this.baseForBatch.registerToUndo = command => {
      this.registerToUndo(command);
    };
  }

  get events(): Reactodia.Events<Reactodia.CommandHistoryEvents> {
    return this.baseHistory.events;
  }

  get undoStack(): readonly Reactodia.Command[] {
    return this.baseHistory.undoStack;
  }

  get redoStack(): readonly Reactodia.Command[] {
    return this.baseHistory.redoStack;
  }

  reset(): void {
    /* ignore */
  }

  undo(): void {
    this.baseHistory.undo();
  }

  redo(): void {
    this.baseHistory.redo();
  }

  execute(command: Reactodia.Command): void {
    this.baseHistory.execute(SharedCommand.wrap(command, this.originId));
  }

  registerToUndo(command: Reactodia.Command): void {
    this.baseHistory.registerToUndo(SharedCommand.wrap(command, this.originId))
  }

  startBatch(title?: Reactodia.TranslatedText | string): Reactodia.CommandBatch {
    const batch = this.baseHistory.startBatch.call(this.baseForBatch, title);
    return {...batch, history: this};
  }
}

class SharedCommand implements Reactodia.Command {
  private constructor(
    readonly inner: Reactodia.Command,
    readonly originId: string
  ) {}

  static wrap(command: Reactodia.Command, originId: string): SharedCommand {
    return command instanceof SharedCommand ? command : new SharedCommand(command, originId);
  }

  get title(): string | Reactodia.TranslatedText | undefined {
    return this.inner.title;
  }

  invoke(): Reactodia.Command {
    return SharedCommand.wrap(this.inner.invoke(), this.originId);
  }
}

export function useSharedHistory(params: {
  activateOrigin: (originId: string) => void;
}): SharedHistory {
  const {activateOrigin} = params;
  const [baseHistory] = React.useState(() => new SharedHistory());
  const latestActivateOrigin = React.useRef(activateOrigin);
  React.useEffect(() => {
    latestActivateOrigin.current = activateOrigin;
  });
  React.useEffect(() => {
    const listener = new Reactodia.EventObserver();
    listener.listen(baseHistory.extendedEvents, 'activateOrigin', ({originId}) => {
      latestActivateOrigin.current(originId);
    });
    return () => listener.stopListening();
  }, []);
  return baseHistory;
}
