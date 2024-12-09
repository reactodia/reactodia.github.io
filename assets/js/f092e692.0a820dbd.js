"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[55800],{93858:(e,n,c)=>{c.r(n),c.d(n,{assets:()=>i,contentTitle:()=>o,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>d});var r=c(74848),t=c(28453);const s={},o="Function: create()",a={id:"api/workspace/namespaces/Command/functions/create",title:"Function: create()",description:"create(title, action): Command",source:"@site/docs/api/workspace/namespaces/Command/functions/create.md",sourceDirName:"api/workspace/namespaces/Command/functions",slug:"/api/workspace/namespaces/Command/functions/create",permalink:"/docs/api/workspace/namespaces/Command/functions/create",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/namespaces/Command/functions/create.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Function: compound()",permalink:"/docs/api/workspace/namespaces/Command/functions/compound"},next:{title:"Function: effect()",permalink:"/docs/api/workspace/namespaces/Command/functions/effect"}},i={},d=[{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Defined in",id:"defined-in",level:2}];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"function-create",children:"Function: create()"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"create"}),"(",(0,r.jsx)(n.code,{children:"title"}),", ",(0,r.jsx)(n.code,{children:"action"}),"): ",(0,r.jsx)(n.a,{href:"/docs/api/workspace/interfaces/Command",children:(0,r.jsx)(n.code,{children:"Command"})})]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Creates a basic reversible command."}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Example"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"function changeFoo(store: FooStore, foo: Foo): Command {\r\n    return Command.create('Set foo', () => {\r\n        const previous = store.foo;\r\n        store.setFoo(foo);\r\n        return changeFoo(store, previous);\r\n    });\r\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Parameter"}),(0,r.jsx)("th",{children:"Type"})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"title"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"string"})})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"action"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/docs/api/workspace/type-aliases/CommandAction",children:(0,r.jsx)(n.code,{children:"CommandAction"})})})})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/docs/api/workspace/interfaces/Command",children:(0,r.jsx)(n.code,{children:"Command"})})}),"\n",(0,r.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/1775238c576c6c73cc09ce5518cb2e1fb313ecdf/src/diagram/history.ts#L50",children:"src/diagram/history.ts:50"})})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,n,c)=>{c.d(n,{R:()=>o,x:()=>a});var r=c(96540);const t={},s=r.createContext(t);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);