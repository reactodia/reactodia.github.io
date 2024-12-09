"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[17441],{91539:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>i,contentTitle:()=>d,default:()=>h,frontMatter:()=>a,metadata:()=>n,toc:()=>l});var t=s(74848),c=s(28453);const a={},d="Class: DefaultLayouts",n={id:"api/layout.worker/classes/DefaultLayouts",title:"Class: DefaultLayouts",description:"Provides a web worker with basic diagram layout algorithms.",source:"@site/docs/api/layout.worker/classes/DefaultLayouts.md",sourceDirName:"api/layout.worker/classes",slug:"/api/layout.worker/classes/DefaultLayouts",permalink:"/docs/api/layout.worker/classes/DefaultLayouts",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/layout.worker/classes/DefaultLayouts.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"layout.worker",permalink:"/docs/api/layout.worker/"},next:{title:"worker-protocol",permalink:"/docs/api/worker-protocol/"}},i={},l=[{value:"Constructors",id:"constructors",level:2},{value:"new DefaultLayouts()",id:"new-defaultlayouts",level:3},{value:"Returns",id:"returns",level:4},{value:"Methods",id:"methods",level:2},{value:"defaultLayout()",id:"defaultlayout",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns-1",level:4},{value:"See",id:"see",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"flowLayout()",id:"flowlayout",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"forceLayout()",id:"forcelayout",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"removeOverlaps()",id:"removeoverlaps",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-3",level:4}];function o(e){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",strong:"strong",...(0,c.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"class-defaultlayouts",children:"Class: DefaultLayouts"}),"\n",(0,t.jsx)(r.p,{children:"Provides a web worker with basic diagram layout algorithms."}),"\n",(0,t.jsx)(r.h2,{id:"constructors",children:"Constructors"}),"\n",(0,t.jsx)(r.h3,{id:"new-defaultlayouts",children:"new DefaultLayouts()"}),"\n",(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"new DefaultLayouts"}),"(): ",(0,t.jsx)(r.a,{href:"/docs/api/layout.worker/classes/DefaultLayouts",children:(0,t.jsx)(r.code,{children:"DefaultLayouts"})})]}),"\n"]}),"\n",(0,t.jsx)(r.h4,{id:"returns",children:"Returns"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/layout.worker/classes/DefaultLayouts",children:(0,t.jsx)(r.code,{children:"DefaultLayouts"})})}),"\n",(0,t.jsx)(r.h2,{id:"methods",children:"Methods"}),"\n",(0,t.jsx)(r.h3,{id:"defaultlayout",children:"defaultLayout()"}),"\n",(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"defaultLayout"}),"(",(0,t.jsx)(r.code,{children:"graph"}),", ",(0,t.jsx)(r.code,{children:"state"}),", ",(0,t.jsx)(r.code,{children:"options"}),"?): ",(0,t.jsx)(r.code,{children:"Promise"}),"<",(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})}),">"]}),"\n"]}),"\n",(0,t.jsxs)(r.p,{children:["Default layout algorithm, the same as ",(0,t.jsx)(r.code,{children:"blockingDefaultLayout()"}),"\r\nbut non-blocking due to being run in a worker."]}),"\n",(0,t.jsx)(r.h4,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Parameter"}),(0,t.jsx)("th",{children:"Type"})]})}),(0,t.jsxs)("tbody",{children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"graph"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutGraph",children:(0,t.jsx)(r.code,{children:"LayoutGraph"})})})})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"state"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})})})})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"options"}),"?"]})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/DefaultLayoutOptions",children:(0,t.jsx)(r.code,{children:"DefaultLayoutOptions"})})})})]})]})]}),"\n",(0,t.jsx)(r.h4,{id:"returns-1",children:"Returns"}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"Promise"}),"<",(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})}),">"]}),"\n",(0,t.jsx)(r.h4,{id:"see",children:"See"}),"\n",(0,t.jsx)(r.p,{children:"blockingDefaultLayout()"}),"\n",(0,t.jsx)(r.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/1775238c576c6c73cc09ce5518cb2e1fb313ecdf/src/layout.worker.ts#L22",children:"src/layout.worker.ts:22"})}),"\n",(0,t.jsx)(r.hr,{}),"\n",(0,t.jsx)(r.h3,{id:"flowlayout",children:"flowLayout()"}),"\n",(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"flowLayout"}),"(",(0,t.jsx)(r.code,{children:"graph"}),", ",(0,t.jsx)(r.code,{children:"state"}),", ",(0,t.jsx)(r.code,{children:"options"}),"?): ",(0,t.jsx)(r.code,{children:"Promise"}),"<",(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})}),">"]}),"\n"]}),"\n",(0,t.jsxs)(r.p,{children:["Flow layout algorithm from ",(0,t.jsx)(r.a,{href:"https://ialab.it.monash.edu/webcola/",children:"cola.js"}),"."]}),"\n",(0,t.jsx)(r.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Parameter"}),(0,t.jsx)("th",{children:"Type"})]})}),(0,t.jsxs)("tbody",{children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"graph"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutGraph",children:(0,t.jsx)(r.code,{children:"LayoutGraph"})})})})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"state"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})})})})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"options"}),"?"]})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/ColaFlowLayoutOptions",children:(0,t.jsx)(r.code,{children:"ColaFlowLayoutOptions"})})})})]})]})]}),"\n",(0,t.jsx)(r.h4,{id:"returns-2",children:"Returns"}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"Promise"}),"<",(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})}),">"]}),"\n",(0,t.jsx)(r.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/1775238c576c6c73cc09ce5518cb2e1fb313ecdf/src/layout.worker.ts#L44",children:"src/layout.worker.ts:44"})}),"\n",(0,t.jsx)(r.hr,{}),"\n",(0,t.jsx)(r.h3,{id:"forcelayout",children:"forceLayout()"}),"\n",(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"forceLayout"}),"(",(0,t.jsx)(r.code,{children:"graph"}),", ",(0,t.jsx)(r.code,{children:"state"}),", ",(0,t.jsx)(r.code,{children:"options"}),"?): ",(0,t.jsx)(r.code,{children:"Promise"}),"<",(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})}),">"]}),"\n"]}),"\n",(0,t.jsxs)(r.p,{children:["Force-directed layout algorithm from ",(0,t.jsx)(r.a,{href:"https://ialab.it.monash.edu/webcola/",children:"cola.js"}),"."]}),"\n",(0,t.jsx)(r.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Parameter"}),(0,t.jsx)("th",{children:"Type"})]})}),(0,t.jsxs)("tbody",{children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"graph"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutGraph",children:(0,t.jsx)(r.code,{children:"LayoutGraph"})})})})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"state"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})})})})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"options"}),"?"]})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/ColaForceLayoutOptions",children:(0,t.jsx)(r.code,{children:"ColaForceLayoutOptions"})})})})]})]})]}),"\n",(0,t.jsx)(r.h4,{id:"returns-3",children:"Returns"}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"Promise"}),"<",(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})}),">"]}),"\n",(0,t.jsx)(r.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/1775238c576c6c73cc09ce5518cb2e1fb313ecdf/src/layout.worker.ts#L33",children:"src/layout.worker.ts:33"})}),"\n",(0,t.jsx)(r.hr,{}),"\n",(0,t.jsx)(r.h3,{id:"removeoverlaps",children:"removeOverlaps()"}),"\n",(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"removeOverlaps"}),"(",(0,t.jsx)(r.code,{children:"graph"}),", ",(0,t.jsx)(r.code,{children:"state"}),"): ",(0,t.jsx)(r.code,{children:"Promise"}),"<",(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})}),">"]}),"\n"]}),"\n",(0,t.jsxs)(r.p,{children:["Remove overlaps algorithm from ",(0,t.jsx)(r.a,{href:"https://ialab.it.monash.edu/webcola/",children:"cola.js"}),"."]}),"\n",(0,t.jsx)(r.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Parameter"}),(0,t.jsx)("th",{children:"Type"})]})}),(0,t.jsxs)("tbody",{children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"graph"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutGraph",children:(0,t.jsx)(r.code,{children:"LayoutGraph"})})})})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"state"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})})})})]})]})]}),"\n",(0,t.jsx)(r.h4,{id:"returns-4",children:"Returns"}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"Promise"}),"<",(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LayoutState",children:(0,t.jsx)(r.code,{children:"LayoutState"})}),">"]}),"\n",(0,t.jsx)(r.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/1775238c576c6c73cc09ce5518cb2e1fb313ecdf/src/layout.worker.ts#L55",children:"src/layout.worker.ts:55"})})]})}function h(e={}){const{wrapper:r}={...(0,c.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},28453:(e,r,s)=>{s.d(r,{R:()=>d,x:()=>n});var t=s(96540);const c={},a=t.createContext(c);function d(e){const r=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function n(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:d(e.components),t.createElement(a.Provider,{value:r},e.children)}}}]);