"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[15513],{61981:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>t,metadata:()=>i,toc:()=>l});var c=n(74848),o=n(28453);const t={},s="Function: connectWorker()",i={id:"api/worker-protocol/functions/connectWorker",title:"Function: connectWorker()",description:"connectWorker\\(factory): void",source:"@site/docs/api/worker-protocol/functions/connectWorker.md",sourceDirName:"api/worker-protocol/functions",slug:"/api/worker-protocol/functions/connectWorker",permalink:"/docs/api/worker-protocol/functions/connectWorker",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/worker-protocol/functions/connectWorker.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Type Alias: WorkerObject\\<T\\>",permalink:"/docs/api/worker-protocol/type-aliases/WorkerObject"}},d={},l=[{value:"Type Parameters",id:"type-parameters",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Defined in",id:"defined-in",level:2}];function a(e){const r={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r.h1,{id:"function-connectworker",children:"Function: connectWorker()"}),"\n",(0,c.jsxs)(r.blockquote,{children:["\n",(0,c.jsxs)(r.p,{children:[(0,c.jsx)(r.strong,{children:"connectWorker"}),"<",(0,c.jsx)(r.code,{children:"A"}),", ",(0,c.jsx)(r.code,{children:"T"}),">(",(0,c.jsx)(r.code,{children:"factory"}),"): ",(0,c.jsx)(r.code,{children:"void"})]}),"\n"]}),"\n",(0,c.jsxs)(r.p,{children:["Establishes a specific connection protocol between the callee (worker) and external\r\ncaller (which created a worker via ",(0,c.jsx)(r.code,{children:"new Worker(...)"})," constructor)."]}),"\n",(0,c.jsxs)(r.p,{children:["The protocol assumes the worker exposes an RPC-like interface via a ",(0,c.jsx)(r.code,{children:"class"})," where\r\nevery public method returns a ",(0,c.jsx)(r.code,{children:"Promise"}),". This interface is transparently mapped\r\nfrom the caller to the worker via messages."]}),"\n",(0,c.jsxs)(r.p,{children:[(0,c.jsx)(r.strong,{children:"Example"}),":"]}),"\n",(0,c.jsx)(r.pre,{children:(0,c.jsx)(r.code,{className:"language-ts",children:"// calc-worker.ts\r\nclass Calculator {\r\n    constructor(precision: number) { ... }\r\n    add(a: number, b: number): Promise<number> { ... }\r\n}\n\nconnectWorker(Calculator);\n\n// component.ts\r\nconst calcWorker = defineWorker(() => new Worker('./calc-worker.js'), [0.1]);\r\n...\r\nfunction Component() {\r\n    const calc = useWorker(calcWorker);\r\n    ...\r\n    const result = await calc.add(2, 3);\r\n}\n"})}),"\n",(0,c.jsx)(r.h2,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,c.jsxs)("table",{children:[(0,c.jsx)("thead",{children:(0,c.jsx)("tr",{children:(0,c.jsx)("th",{children:"Type Parameter"})})}),(0,c.jsxs)("tbody",{children:[(0,c.jsx)("tr",{children:(0,c.jsx)("td",{children:(0,c.jsxs)(r.p,{children:[(0,c.jsx)(r.code,{children:"A"})," ",(0,c.jsx)(r.em,{children:"extends"})," ",(0,c.jsx)(r.code,{children:"any"}),"[]"]})})}),(0,c.jsx)("tr",{children:(0,c.jsx)("td",{children:(0,c.jsx)(r.p,{children:(0,c.jsx)(r.code,{children:"T"})})})})]})]}),"\n",(0,c.jsx)(r.h2,{id:"parameters",children:"Parameters"}),"\n",(0,c.jsxs)("table",{children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:"Parameter"}),(0,c.jsx)("th",{children:"Type"})]})}),(0,c.jsx)("tbody",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(r.p,{children:(0,c.jsx)(r.code,{children:"factory"})})}),(0,c.jsx)("td",{children:(0,c.jsxs)(r.p,{children:[(0,c.jsx)(r.a,{href:"/docs/api/worker-protocol/type-aliases/WorkerConstructor",children:(0,c.jsx)(r.code,{children:"WorkerConstructor"})}),"<",(0,c.jsx)(r.code,{children:"A"}),", ",(0,c.jsx)(r.code,{children:"T"}),">"]})})]})})]}),"\n",(0,c.jsx)(r.h2,{id:"returns",children:"Returns"}),"\n",(0,c.jsx)(r.p,{children:(0,c.jsx)(r.code,{children:"void"})}),"\n",(0,c.jsx)(r.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,c.jsx)(r.p,{children:(0,c.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/1775238c576c6c73cc09ce5518cb2e1fb313ecdf/src/worker-protocol.ts#L54",children:"src/worker-protocol.ts:54"})})]})}function h(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,c.jsx)(r,{...e,children:(0,c.jsx)(a,{...e})}):a(e)}},28453:(e,r,n)=>{n.d(r,{R:()=>s,x:()=>i});var c=n(96540);const o={},t=c.createContext(o);function s(e){const r=c.useContext(t);return c.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),c.createElement(t.Provider,{value:r},e.children)}}}]);