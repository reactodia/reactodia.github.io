"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[4314],{85466:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>i,contentTitle:()=>t,default:()=>l,frontMatter:()=>c,metadata:()=>d,toc:()=>a});var o=s(74848),r=s(28453);const c={},t="Function: useLoadedWorkspace()",d={id:"api/workspace/functions/useLoadedWorkspace",title:"Function: useLoadedWorkspace()",description:"useLoadedWorkspace(onLoad, deps): LoadedWorkspace",source:"@site/docs/api/workspace/functions/useLoadedWorkspace.md",sourceDirName:"api/workspace/functions",slug:"/api/workspace/functions/useLoadedWorkspace",permalink:"/docs/api/workspace/functions/useLoadedWorkspace",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/functions/useLoadedWorkspace.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Function: useLinkActionContext()",permalink:"/docs/api/workspace/functions/useLinkActionContext"},next:{title:"Function: useObservedProperty()",permalink:"/docs/api/workspace/functions/useObservedProperty"}},i={},a=[{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Defined in",id:"defined-in",level:2}];function p(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"function-useloadedworkspace",children:"Function: useLoadedWorkspace()"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"useLoadedWorkspace"}),"(",(0,o.jsx)(n.code,{children:"onLoad"}),", ",(0,o.jsx)(n.code,{children:"deps"}),"): ",(0,o.jsx)(n.a,{href:"/docs/api/workspace/interfaces/LoadedWorkspace",children:(0,o.jsx)(n.code,{children:"LoadedWorkspace"})})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"React hook to perform asynchronous initialization of the workspace."}),"\n",(0,o.jsx)(n.p,{children:"This function could be used to setup data provider, fetch initial data\r\nor import existing diagram layout."}),"\n",(0,o.jsx)(n.p,{children:"The command history is automatically reset when the initialization is done."}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Example"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"const {getContext, onMount} = useLoadedWorkspace();\n\nreturn (\r\n    <Reactodia.Workspace ref={onMount}>\r\n        ...\r\n    </Reactodia.Workspace>\r\n);\n"})}),"\n",(0,o.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,o.jsxs)("table",{children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Parameter"}),(0,o.jsx)("th",{children:"Type"})]})}),(0,o.jsxs)("tbody",{children:[(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:"onLoad"})})}),(0,o.jsx)("td",{children:(0,o.jsxs)(n.p,{children:["(",(0,o.jsx)(n.code,{children:"params"}),") => ",(0,o.jsx)(n.code,{children:"Promise"}),"<",(0,o.jsx)(n.code,{children:"void"}),">"]})})]}),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:"deps"})})}),(0,o.jsx)("td",{children:(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"unknown"}),"[]"]})})]})]})]}),"\n",(0,o.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"/docs/api/workspace/interfaces/LoadedWorkspace",children:(0,o.jsx)(n.code,{children:"LoadedWorkspace"})})}),"\n",(0,o.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/2d7eca1cbe305ffd6b1e2a3f09317a3ddec83f49/src/workspace/workspace.tsx#L460",children:"src/workspace/workspace.tsx:460"})})]})}function l(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>d});var o=s(96540);const r={},c=o.createContext(r);function t(e){const n=o.useContext(c);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),o.createElement(c.Provider,{value:n},e.children)}}}]);