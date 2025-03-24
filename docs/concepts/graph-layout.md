---
sidebar_position: 7
title: Graph Layout
---

# Graph Layout

Reactodia supports the usage of [graph layout algorithms](https://en.wikipedia.org/wiki/Graph_drawing) on the diagram content to re-position the [elements and links](/docs/concepts/graph-model.md).

## Layout functions

[`LayoutFunction`](/docs/api/workspace/type-aliases/LayoutFunction.md) in the library is defined as a pure async function transforming a graph + current layout state (element positions and bounds) into a computed layout state:

```ts
type LayoutFunction = (graph: LayoutGraph, state: LayoutState) => Promise<LayoutState>;

interface LayoutGraph {
  nodes: { [id: string]: LayoutNode };
  links: LayoutLink[];
}

interface LayoutState {
  bounds: { [elementId: string]: Rect };
}
```

where [`LayoutNode`](/docs/api/workspace/interfaces/LayoutNode.md) and [`LayoutLink`](/docs/api/workspace/interfaces/LayoutLink.md) are plain objects representing graph [`Element`](/docs/api/workspace/classes/Element.md) and [`Link`](/docs/api/workspace/classes/Link.md) instances.

To apply a layout function, [`performLayout()`](/docs/api/workspace/interfaces/WorkspaceContext.md) function from [workspace context](/docs/concepts/workspace-context.md) can be used:

```ts
const { view, performLayout } = Reactodia.useWorkspace();

const onClick = async () => {
  await performLayout({
    // Pass custom layout function or use the default one
    layoutFunction: myGraphLayout ?? view.defaultLayout,
    // Compute layout only for specific subset of elements
    selectedElements: new Set([...]),
    // Animate graph content movement when applying the layout
    animate: true,
    // Whether to fit the graph into viewport after the layout
    zoomToFit: true,
  });
};
```

`performLayout()` also accepts [additional options](/docs/api/workspace/interfaces/WorkspacePerformLayoutParams.md) e.g. whether to animate the movement of graph after layout, or [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) to cancel the layout computation if needed.

## Default layout configuration

`defaultLayout` is the required prop for the top-level [`<Workspace>`](/docs/components/workspace.md) component and Reactodia provides two approaches to get a good default layout function:

### Layout via Web Workers

:::tip
Reactodia uses [`@reactodia/worker-proxy`](https://github.com/reactodia/worker-proxy#readme) package to transparently interact with Web Workers, see its documentation for to understand the protocol and how to implement custom transparent workers.
:::

In the recommended configuration, Reactodia uses [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Worker) to compute the graph layout in a non-blocking way.

The library provides multiple built-in layout functions from [`@reactodia/workspace/layout.worker`](/docs/api/layout.worker/index.md) entry point ([`DefaultLayouts`](/docs/api/layout.worker/classes/DefaultLayouts)). This entry point is a transparent worker proxy which can be used with [`defineLayoutWorker()`](/docs/api/workspace/functions/defineLayoutWorker) function to create a ref-counted worker and [`useWorker()`](/docs/api/workspace/functions/useWorker) hook to use it from a React component:

```tsx
import * as Reactodia from '@reactodia/workspace';

const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);
  ...
  return (
    <Reactodia.Workspace defaultLayout={defaultLayout}>
      ...
    </Reactodia.Workspace>
  );
}
```

Popular front-end bundlers like Webpack, Vite, etc have a native support specifically for importing Web Workers, i.e. `new Worker(new URL('...', import.meta.url))` will be built in a special way to create a worker instance with specified entry point. Depending on the bundler it might be necessary to specify `{ type: 'module' }` as second argument to `Worker` constructor:

```ts
const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url),
  {type: 'module'}
));
```

### Synchronous layout

:::warning
Although the synchronous layout computation is usually fast for small-to-medium graphs, we highly encourage to use non-blocking layout functions (e.g. from a Web Worker) if possible to avoid browser "freezes" when computing a layout for a large graph.
:::

The graph layout can be computed in a synchronous (blocking) way in case when the Web Workers is not available or very hard to setup. In that case it the default force-directed layout function [`blockingDefaultLayout`](/docs/api/layout-sync/functions/blockingDefaultLayout) can be imported from a separate [`@reactodia/workspace/layout-sync`](/docs/api/layout-sync/index.md) entry point:

```tsx
import * as Reactodia from '@reactodia/workspace';
import { blockingDefaultLayout } from '@reactodia/workspace/layout-sync';

function Example() {
  ...
  return (
    <Reactodia.Workspace defaultLayout={blockingDefaultLayout}>
      ...
    </Reactodia.Workspace>
  );
}
```
