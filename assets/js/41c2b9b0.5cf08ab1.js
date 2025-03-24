"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[34864],{48973:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>l});var a=t(64922),n=t(16593);const r={sidebar_position:7,title:"Graph Layout"},s="Graph Layout",i={id:"concepts/graph-layout",title:"Graph Layout",description:"Reactodia supports the usage of graph layout algorithms on the diagram content to re-position the elements and links.",source:"@site/docs/concepts/graph-layout.md",sourceDirName:"concepts",slug:"/concepts/graph-layout",permalink:"/docs/concepts/graph-layout",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/concepts/graph-layout.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,title:"Graph Layout"},sidebar:"docs",previous:{title:"Canvas Coordinates",permalink:"/docs/concepts/canvas-coordinates"},next:{title:"Overlay dialogs and tasks",permalink:"/docs/concepts/canvas-overlays"}},c={},l=[{value:"Layout functions",id:"layout-functions",level:2},{value:"Default layout configuration",id:"default-layout-configuration",level:2},{value:"Layout via Web Workers",id:"layout-via-web-workers",level:3},{value:"Synchronous layout",id:"synchronous-layout",level:3}];function d(e){const o={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.h1,{id:"graph-layout",children:"Graph Layout"}),"\n",(0,a.jsxs)(o.p,{children:["Reactodia supports the usage of ",(0,a.jsx)(o.a,{href:"https://en.wikipedia.org/wiki/Graph_drawing",children:"graph layout algorithms"})," on the diagram content to re-position the ",(0,a.jsx)(o.a,{href:"/docs/concepts/graph-model",children:"elements and links"}),"."]}),"\n",(0,a.jsx)(o.h2,{id:"layout-functions",children:"Layout functions"}),"\n",(0,a.jsxs)(o.p,{children:[(0,a.jsx)(o.a,{href:"/docs/api/workspace/type-aliases/LayoutFunction",children:(0,a.jsx)(o.code,{children:"LayoutFunction"})})," in the library is defined as a pure async function transforming a graph + current layout state (element positions and bounds) into a computed layout state:"]}),"\n",(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:"language-ts",children:"type LayoutFunction = (graph: LayoutGraph, state: LayoutState) => Promise<LayoutState>;\r\n\r\ninterface LayoutGraph {\r\n  nodes: { [id: string]: LayoutNode };\r\n  links: LayoutLink[];\r\n}\r\n\r\ninterface LayoutState {\r\n  bounds: { [elementId: string]: Rect };\r\n}\n"})}),"\n",(0,a.jsxs)(o.p,{children:["where ",(0,a.jsx)(o.a,{href:"/docs/api/workspace/interfaces/LayoutNode",children:(0,a.jsx)(o.code,{children:"LayoutNode"})})," and ",(0,a.jsx)(o.a,{href:"/docs/api/workspace/interfaces/LayoutLink",children:(0,a.jsx)(o.code,{children:"LayoutLink"})})," are plain objects representing graph ",(0,a.jsx)(o.a,{href:"/docs/api/workspace/classes/Element",children:(0,a.jsx)(o.code,{children:"Element"})})," and ",(0,a.jsx)(o.a,{href:"/docs/api/workspace/classes/Link",children:(0,a.jsx)(o.code,{children:"Link"})})," instances."]}),"\n",(0,a.jsxs)(o.p,{children:["To apply a layout function, ",(0,a.jsx)(o.a,{href:"/docs/api/workspace/interfaces/WorkspaceContext",children:(0,a.jsx)(o.code,{children:"performLayout()"})})," function from ",(0,a.jsx)(o.a,{href:"/docs/concepts/workspace-context",children:"workspace context"})," can be used:"]}),"\n",(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:"language-ts",children:"const { view, performLayout } = Reactodia.useWorkspace();\r\n\r\nconst onClick = async () => {\r\n  await performLayout({\r\n    // Pass custom layout function or use the default one\r\n    layoutFunction: myGraphLayout ?? view.defaultLayout,\r\n    // Compute layout only for specific subset of elements\r\n    selectedElements: new Set([...]),\r\n    // Animate graph content movement when applying the layout\r\n    animate: true,\r\n    // Whether to fit the graph into viewport after the layout\r\n    zoomToFit: true,\r\n  });\r\n};\n"})}),"\n",(0,a.jsxs)(o.p,{children:[(0,a.jsx)(o.code,{children:"performLayout()"})," also accepts ",(0,a.jsx)(o.a,{href:"/docs/api/workspace/interfaces/WorkspacePerformLayoutParams",children:"additional options"})," e.g. whether to animate the movement of graph after layout, or ",(0,a.jsx)(o.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal",children:"abort signal"})," to cancel the layout computation if needed."]}),"\n",(0,a.jsx)(o.h2,{id:"default-layout-configuration",children:"Default layout configuration"}),"\n",(0,a.jsxs)(o.p,{children:[(0,a.jsx)(o.code,{children:"defaultLayout"})," is the required prop for the top-level ",(0,a.jsx)(o.a,{href:"/docs/components/workspace",children:(0,a.jsx)(o.code,{children:"<Workspace>"})})," component and Reactodia provides two approaches to get a good default layout function:"]}),"\n",(0,a.jsx)(o.h3,{id:"layout-via-web-workers",children:"Layout via Web Workers"}),"\n",(0,a.jsx)(o.admonition,{type:"tip",children:(0,a.jsxs)(o.p,{children:["Reactodia uses ",(0,a.jsx)(o.a,{href:"https://github.com/reactodia/worker-proxy#readme",children:(0,a.jsx)(o.code,{children:"@reactodia/worker-proxy"})})," package to transparently interact with Web Workers, see its documentation for to understand the protocol and how to implement custom transparent workers."]})}),"\n",(0,a.jsxs)(o.p,{children:["In the recommended configuration, Reactodia uses ",(0,a.jsx)(o.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Worker",children:"Web Workers"})," to compute the graph layout in a non-blocking way."]}),"\n",(0,a.jsxs)(o.p,{children:["The library provides multiple built-in layout functions from ",(0,a.jsx)(o.a,{href:"/docs/api/layout.worker/",children:(0,a.jsx)(o.code,{children:"@reactodia/workspace/layout.worker"})})," entry point (",(0,a.jsx)(o.a,{href:"/docs/api/layout.worker/classes/DefaultLayouts",children:(0,a.jsx)(o.code,{children:"DefaultLayouts"})}),"). This entry point is a transparent worker proxy which can be used with ",(0,a.jsx)(o.a,{href:"/docs/api/workspace/functions/defineLayoutWorker",children:(0,a.jsx)(o.code,{children:"defineLayoutWorker()"})})," function to create a ref-counted worker and ",(0,a.jsx)(o.a,{href:"/docs/api/workspace/functions/useWorker",children:(0,a.jsx)(o.code,{children:"useWorker()"})})," hook to use it from a React component:"]}),"\n",(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:"language-tsx",children:"import * as Reactodia from '@reactodia/workspace';\r\n\r\nconst Layouts = Reactodia.defineLayoutWorker(() => new Worker(\r\n  new URL('@reactodia/workspace/layout.worker', import.meta.url)\r\n));\r\n\r\nfunction Example() {\r\n  const {defaultLayout} = Reactodia.useWorker(Layouts);\r\n  ...\r\n  return (\r\n    <Reactodia.Workspace defaultLayout={defaultLayout}>\r\n      ...\r\n    </Reactodia.Workspace>\r\n  );\r\n}\n"})}),"\n",(0,a.jsxs)(o.p,{children:["Popular front-end bundlers like Webpack, Vite, etc have a native support specifically for importing Web Workers, i.e. ",(0,a.jsx)(o.code,{children:"new Worker(new URL('...', import.meta.url))"})," will be built in a special way to create a worker instance with specified entry point. Depending on the bundler it might be necessary to specify ",(0,a.jsx)(o.code,{children:"{ type: 'module' }"})," as second argument to ",(0,a.jsx)(o.code,{children:"Worker"})," constructor:"]}),"\n",(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:"language-ts",children:"const Layouts = Reactodia.defineLayoutWorker(() => new Worker(\r\n  new URL('@reactodia/workspace/layout.worker', import.meta.url),\r\n  {type: 'module'}\r\n));\n"})}),"\n",(0,a.jsx)(o.h3,{id:"synchronous-layout",children:"Synchronous layout"}),"\n",(0,a.jsx)(o.admonition,{type:"warning",children:(0,a.jsx)(o.p,{children:'Although the synchronous layout computation is usually fast for small-to-medium graphs, we highly encourage to use non-blocking layout functions (e.g. from a Web Worker) if possible to avoid browser "freezes" when computing a layout for a large graph.'})}),"\n",(0,a.jsxs)(o.p,{children:["The graph layout can be computed in a synchronous (blocking) way in case when the Web Workers is not available or very hard to setup. In that case it the default force-directed layout function ",(0,a.jsx)(o.a,{href:"/docs/api/layout-sync/functions/blockingDefaultLayout",children:(0,a.jsx)(o.code,{children:"blockingDefaultLayout"})})," can be imported from a separate ",(0,a.jsx)(o.a,{href:"/docs/api/layout-sync/",children:(0,a.jsx)(o.code,{children:"@reactodia/workspace/layout-sync"})})," entry point:"]}),"\n",(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:"language-tsx",children:"import * as Reactodia from '@reactodia/workspace';\r\nimport { blockingDefaultLayout } from '@reactodia/workspace/layout-sync';\r\n\r\nfunction Example() {\r\n  ...\r\n  return (\r\n    <Reactodia.Workspace defaultLayout={blockingDefaultLayout}>\r\n      ...\r\n    </Reactodia.Workspace>\r\n  );\r\n}\n"})})]})}function u(e={}){const{wrapper:o}={...(0,n.R)(),...e.components};return o?(0,a.jsx)(o,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},16593:(e,o,t)=>{t.d(o,{R:()=>s,x:()=>i});var a=t(77810);const n={},r=a.createContext(n);function s(e){const o=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function i(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),a.createElement(r.Provider,{value:o},e.children)}}}]);