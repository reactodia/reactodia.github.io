"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[56638],{72130:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>a,contentTitle:()=>i,default:()=>h,frontMatter:()=>d,metadata:()=>o,toc:()=>t});var c=r(74848),n=r(28453);const d={},i="Interface: WorkspaceContext",o={id:"api/workspace/interfaces/WorkspaceContext",title:"Interface: WorkspaceContext",description:"Represents a context for the whole workspace, its stores and services.",source:"@site/docs/api/workspace/interfaces/WorkspaceContext.md",sourceDirName:"api/workspace/interfaces",slug:"/api/workspace/interfaces/WorkspaceContext",permalink:"/docs/api/workspace/interfaces/WorkspaceContext",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/interfaces/WorkspaceContext.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Interface: WorkerDefinition\\<T\\>",permalink:"/docs/api/workspace/interfaces/WorkerDefinition"},next:{title:"Interface: WorkspaceGroupParams",permalink:"/docs/api/workspace/interfaces/WorkspaceGroupParams"}},a={},t=[{value:"Properties",id:"properties",level:2}];function l(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...(0,n.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.h1,{id:"interface-workspacecontext",children:"Interface: WorkspaceContext"}),"\n",(0,c.jsx)(s.p,{children:"Represents a context for the whole workspace, its stores and services."}),"\n",(0,c.jsx)(s.p,{children:"This context is created once and exists for the full lifetime of the workspace."}),"\n",(0,c.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,c.jsxs)("table",{children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:"Property"}),(0,c.jsx)("th",{children:"Modifier"}),(0,c.jsx)("th",{children:"Type"}),(0,c.jsx)("th",{children:"Description"})]})}),(0,c.jsxs)("tbody",{children:[(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"disposeSignal"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"AbortSignal"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:"Cancellation signal that becomes aborted when the workspace is disposed."})})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"editor"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/EditorController",children:(0,c.jsx)(s.code,{children:"EditorController"})})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:"Stores, modifies and validates changes from the visual graph authoring."})})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"getElementStyle"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsxs)(s.p,{children:["(",(0,c.jsx)(s.code,{children:"element"}),": ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/Element",children:(0,c.jsx)(s.code,{children:"Element"})}),") => ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/interfaces/ProcessedTypeStyle",children:(0,c.jsx)(s.code,{children:"ProcessedTypeStyle"})})]})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:"Computes a style to display target element in various parts of the UI."})})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"getElementTypeStyle"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsxs)(s.p,{children:["(",(0,c.jsx)(s.code,{children:"types"}),": readonly ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/type-aliases/ElementTypeIri",children:(0,c.jsx)(s.code,{children:"ElementTypeIri"})}),"[]) => ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/interfaces/ProcessedTypeStyle",children:(0,c.jsx)(s.code,{children:"ProcessedTypeStyle"})})]})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:"Computes a style to display an element with target set of types\r\nin various parts of the UI."})})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"group"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsxs)(s.p,{children:["(",(0,c.jsx)(s.code,{children:"params"}),": ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/interfaces/WorkspaceGroupParams",children:(0,c.jsx)(s.code,{children:"WorkspaceGroupParams"})}),") => ",(0,c.jsx)(s.code,{children:"Promise"}),"<",(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/EntityGroup",children:(0,c.jsx)(s.code,{children:"EntityGroup"})}),">"]})}),(0,c.jsxs)("td",{children:[(0,c.jsxs)(s.p,{children:["Groups ",(0,c.jsx)(s.strong,{children:"with animation"})," multiple elements into an entity group."]}),(0,c.jsxs)(s.p,{children:["The operation puts a command to the ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/DiagramModel#history",children:"command history"}),"."]}),(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"See"})}),(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/DataDiagramModel#group",children:"DataDiagramModel.group"})})]})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"model"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/DataDiagramModel",children:(0,c.jsx)(s.code,{children:"DataDiagramModel"})})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:"Stores the diagram content and asynchronously fetches from a data provider."})})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"overlay"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/OverlayController",children:(0,c.jsx)(s.code,{children:"OverlayController"})})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:"Controls UI overlays for the canvases, including dialogs and tasks."})})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"performLayout"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsxs)(s.p,{children:["(",(0,c.jsx)(s.code,{children:"params"}),": ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/interfaces/WorkspacePerformLayoutParams",children:(0,c.jsx)(s.code,{children:"WorkspacePerformLayoutParams"})}),") => ",(0,c.jsx)(s.code,{children:"Promise"}),"<",(0,c.jsx)(s.code,{children:"void"}),">"]})}),(0,c.jsxs)("td",{children:[(0,c.jsxs)(s.p,{children:["Computes and applies ",(0,c.jsx)(s.strong,{children:"with animation"})," graph layout algorithm on the diagram content."]}),(0,c.jsx)(s.p,{children:"A spinner overlay will be displayed if layout calculation will take too long (> 200ms)."}),(0,c.jsxs)(s.p,{children:["The operation puts a command to the ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/DiagramModel#history",children:"command history"}),"."]})]})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"triggerWorkspaceEvent"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsxs)(s.p,{children:["(",(0,c.jsx)(s.code,{children:"key"}),": ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/enumerations/WorkspaceEventKey",children:(0,c.jsx)(s.code,{children:"WorkspaceEventKey"})}),") => ",(0,c.jsx)(s.code,{children:"void"})]})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:"Triggers a well-known workspace event."})})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"ungroupAll"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsxs)(s.p,{children:["(",(0,c.jsx)(s.code,{children:"params"}),": ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/interfaces/WorkspaceUngroupAllParams",children:(0,c.jsx)(s.code,{children:"WorkspaceUngroupAllParams"})}),") => ",(0,c.jsx)(s.code,{children:"Promise"}),"<",(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/EntityElement",children:(0,c.jsx)(s.code,{children:"EntityElement"})}),"[]>"]})}),(0,c.jsxs)("td",{children:[(0,c.jsxs)(s.p,{children:["Ungroups ",(0,c.jsx)(s.strong,{children:"with animation"})," one or many entity groups into all contained elements."]}),(0,c.jsxs)(s.p,{children:["The operation puts a command to the ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/DiagramModel#history",children:"command history"}),"."]}),(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"See"})}),(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/DataDiagramModel#ungroupall",children:"DataDiagramModel.ungroupAll"})})]})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"ungroupSome"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsxs)(s.p,{children:["(",(0,c.jsx)(s.code,{children:"params"}),": ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/interfaces/WorkspaceUngroupSomeParams",children:(0,c.jsx)(s.code,{children:"WorkspaceUngroupSomeParams"})}),") => ",(0,c.jsx)(s.code,{children:"Promise"}),"<",(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/EntityElement",children:(0,c.jsx)(s.code,{children:"EntityElement"})}),"[]>"]})}),(0,c.jsxs)("td",{children:[(0,c.jsxs)(s.p,{children:["Ungroups ",(0,c.jsx)(s.strong,{children:"with animation"})," some entities from an entity group."]}),(0,c.jsxs)(s.p,{children:["The operation puts a command to the ",(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/DiagramModel#history",children:"command history"}),"."]}),(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"See"})}),(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/DataDiagramModel#ungroupsome",children:"DataDiagramModel.ungroupSome"})})]})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"view"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.code,{children:"readonly"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:(0,c.jsx)(s.a,{href:"/docs/api/workspace/classes/SharedCanvasState",children:(0,c.jsx)(s.code,{children:"SharedCanvasState"})})})}),(0,c.jsx)("td",{children:(0,c.jsx)(s.p,{children:"Stores common state and settings for all canvases in the workspace."})})]})]})]})]})}function h(e={}){const{wrapper:s}={...(0,n.R)(),...e.components};return s?(0,c.jsx)(s,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}},28453:(e,s,r)=>{r.d(s,{R:()=>i,x:()=>o});var c=r(96540);const n={},d=c.createContext(n);function i(e){const s=c.useContext(d);return c.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),c.createElement(d.Provider,{value:s},e.children)}}}]);