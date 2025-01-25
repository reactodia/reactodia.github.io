"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[3923],{2025:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>a,contentTitle:()=>d,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var s=n(74848),t=n(28453);const i={},d="Interface: OverlayTask",l={id:"api/workspace/interfaces/OverlayTask",title:"Interface: OverlayTask",description:"Represents a foreground canvas task.",source:"@site/docs/api/workspace/interfaces/OverlayTask.md",sourceDirName:"api/workspace/interfaces",slug:"/api/workspace/interfaces/OverlayTask",permalink:"/docs/api/workspace/interfaces/OverlayTask",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/interfaces/OverlayTask.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Interface: OverlayControllerEvents",permalink:"/docs/api/workspace/interfaces/OverlayControllerEvents"},next:{title:"Interface: PinnedProperties",permalink:"/docs/api/workspace/interfaces/PinnedProperties"}},a={},c=[{value:"Properties",id:"properties",level:2},{value:"Methods",id:"methods",level:2},{value:"end()",id:"end",level:3},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"setError()",id:"seterror",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-1",level:4}];function o(e){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",strong:"strong",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"interface-overlaytask",children:"Interface: OverlayTask"}),"\n",(0,s.jsx)(r.p,{children:"Represents a foreground canvas task."}),"\n",(0,s.jsx)(r.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Property"}),(0,s.jsx)("th",{children:"Modifier"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Description"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"title"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"readonly"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"undefined"})," | ",(0,s.jsx)(r.code,{children:"string"})]})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"Task title to display."})})]})})]}),"\n",(0,s.jsx)(r.h2,{id:"methods",children:"Methods"}),"\n",(0,s.jsx)(r.h3,{id:"end",children:"end()"}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"end"}),"(): ",(0,s.jsx)(r.code,{children:"void"})]}),"\n"]}),"\n",(0,s.jsx)(r.p,{children:"Completes the task and removes its representation from the overlay."}),"\n",(0,s.jsxs)(r.p,{children:["If the task is marked with error via ",(0,s.jsx)(r.a,{href:"/docs/api/workspace/interfaces/OverlayTask#seterror",children:"setError()"}),", that error\r\nwill be kept displaying until another task is started later."]}),"\n",(0,s.jsx)(r.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"void"})}),"\n",(0,s.jsx)(r.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/2d7eca1cbe305ffd6b1e2a3f09317a3ddec83f49/src/editor/overlayController.tsx#L372",children:"src/editor/overlayController.tsx:372"})}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"seterror",children:"setError()"}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"setError"}),"(",(0,s.jsx)(r.code,{children:"error"}),"): ",(0,s.jsx)(r.code,{children:"void"})]}),"\n"]}),"\n",(0,s.jsx)(r.p,{children:"Marks the task as failed with the specified error."}),"\n",(0,s.jsx)(r.p,{children:"If set, the error will be displayed until another task\r\nwill be started later."}),"\n",(0,s.jsxs)(r.p,{children:["This method can be called multiple times and will not\r\ncomplete the task (i.e. ",(0,s.jsx)(r.a,{href:"/docs/api/workspace/interfaces/OverlayTask#end",children:"end()"})," method call is required)."]}),"\n",(0,s.jsx)(r.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"error"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"unknown"})})})]})})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"void"})}),"\n",(0,s.jsx)(r.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/2d7eca1cbe305ffd6b1e2a3f09317a3ddec83f49/src/editor/overlayController.tsx#L365",children:"src/editor/overlayController.tsx:365"})})]})}function h(e={}){const{wrapper:r}={...(0,t.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},28453:(e,r,n)=>{n.d(r,{R:()=>d,x:()=>l});var s=n(96540);const t={},i=s.createContext(t);function d(e){const r=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),s.createElement(i.Provider,{value:r},e.children)}}}]);