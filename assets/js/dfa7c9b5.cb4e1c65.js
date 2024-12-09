"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[61378],{65460:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>t,toc:()=>a});var o=n(74848),c=n(28453);const i={},s="Function: defineWorker()",t={id:"api/workspace/functions/defineWorker",title:"Function: defineWorker()",description:"defineWorker\\(workerFactory, constructorArgs): WorkerDefinition\\\\>",source:"@site/docs/api/workspace/functions/defineWorker.md",sourceDirName:"api/workspace/functions",slug:"/api/workspace/functions/defineWorker",permalink:"/docs/api/workspace/functions/defineWorker",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/functions/defineWorker.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Function: defineLayoutWorker()",permalink:"/docs/api/workspace/functions/defineLayoutWorker"},next:{title:"Function: delay()",permalink:"/docs/api/workspace/functions/delay"}},d={},a=[{value:"Type Parameters",id:"type-parameters",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"See",id:"see",level:2},{value:"Defined in",id:"defined-in",level:2}];function l(e){const r={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,c.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.h1,{id:"function-defineworker",children:"Function: defineWorker()"}),"\n",(0,o.jsxs)(r.blockquote,{children:["\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"defineWorker"}),"<",(0,o.jsx)(r.code,{children:"T"}),">(",(0,o.jsx)(r.code,{children:"workerFactory"}),", ",(0,o.jsx)(r.code,{children:"constructorArgs"}),"): ",(0,o.jsx)(r.a,{href:"/docs/api/workspace/interfaces/WorkerDefinition",children:(0,o.jsx)(r.code,{children:"WorkerDefinition"})}),"<",(0,o.jsx)(r.code,{children:"InstanceType"}),"<",(0,o.jsx)(r.code,{children:"T"}),">>"]}),"\n"]}),"\n",(0,o.jsx)(r.p,{children:"Creates a ref-counted Web Worker definition."}),"\n",(0,o.jsxs)(r.p,{children:["The worker module should follow a specific communication protocol,\r\ndefined by ",(0,o.jsx)(r.code,{children:"@reactodia/workspace/worker-protocol"})," module."]}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.strong,{children:"Example"}),":"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{children:"const worker = defineWorker(() => new Worker('./worker.js'), []);\n\nfunction Component() {\r\n  const instance = useWorker(worker);\r\n  ...\r\n}\n"})}),"\n",(0,o.jsx)(r.h2,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,o.jsxs)("table",{children:[(0,o.jsx)("thead",{children:(0,o.jsx)("tr",{children:(0,o.jsx)("th",{children:"Type Parameter"})})}),(0,o.jsx)("tbody",{children:(0,o.jsx)("tr",{children:(0,o.jsx)("td",{children:(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.code,{children:"T"})," ",(0,o.jsx)(r.em,{children:"extends"})," ",(0,o.jsx)(r.a,{href:"/docs/api/worker-protocol/type-aliases/WorkerConstructor",children:(0,o.jsx)(r.code,{children:"WorkerConstructor"})}),"<",(0,o.jsx)(r.code,{children:"unknown"}),"[], ",(0,o.jsx)(r.code,{children:"unknown"}),">"]})})})})]}),"\n",(0,o.jsx)(r.h2,{id:"parameters",children:"Parameters"}),"\n",(0,o.jsxs)("table",{children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Parameter"}),(0,o.jsx)("th",{children:"Type"})]})}),(0,o.jsxs)("tbody",{children:[(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:(0,o.jsx)(r.p,{children:(0,o.jsx)(r.code,{children:"workerFactory"})})}),(0,o.jsx)("td",{children:(0,o.jsxs)(r.p,{children:["() => ",(0,o.jsx)(r.code,{children:"Worker"})]})})]}),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:(0,o.jsx)(r.p,{children:(0,o.jsx)(r.code,{children:"constructorArgs"})})}),(0,o.jsx)("td",{children:(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.code,{children:"ConstructorParameters"}),"<",(0,o.jsx)(r.code,{children:"T"}),">"]})})]})]})]}),"\n",(0,o.jsx)(r.h2,{id:"returns",children:"Returns"}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.a,{href:"/docs/api/workspace/interfaces/WorkerDefinition",children:(0,o.jsx)(r.code,{children:"WorkerDefinition"})}),"<",(0,o.jsx)(r.code,{children:"InstanceType"}),"<",(0,o.jsx)(r.code,{children:"T"}),">>"]}),"\n",(0,o.jsx)(r.h2,{id:"see",children:"See"}),"\n",(0,o.jsx)(r.p,{children:"useWorker()"}),"\n",(0,o.jsx)(r.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,o.jsx)(r.p,{children:(0,o.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/1775238c576c6c73cc09ce5518cb2e1fb313ecdf/src/coreUtils/workers.ts#L24",children:"src/coreUtils/workers.ts:24"})})]})}function h(e={}){const{wrapper:r}={...(0,c.R)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},28453:(e,r,n)=>{n.d(r,{R:()=>s,x:()=>t});var o=n(96540);const c={},i=o.createContext(c);function s(e){const r=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function t(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:s(e.components),o.createElement(i.Provider,{value:r},e.children)}}}]);