"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[55202],{93600:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>a});var t=n(64922),s=n(16593);const i={},c="Interface: LinkTemplate",d={id:"api/workspace/interfaces/LinkTemplate",title:"Interface: LinkTemplate",description:"Custom template to render links with the same link type.",source:"@site/docs/api/workspace/interfaces/LinkTemplate.md",sourceDirName:"api/workspace/interfaces",slug:"/api/workspace/interfaces/LinkTemplate",permalink:"/docs/api/workspace/interfaces/LinkTemplate",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/interfaces/LinkTemplate.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Interface: LinkProps",permalink:"/docs/api/workspace/interfaces/LinkProps"},next:{title:"Interface: LinkTemplateProps",permalink:"/docs/api/workspace/interfaces/LinkTemplateProps"}},l={},a=[{value:"Properties",id:"properties",level:2}];function o(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"interface-linktemplate",children:"Interface: LinkTemplate"}),"\n",(0,t.jsx)(r.p,{children:"Custom template to render links with the same link type."}),"\n",(0,t.jsx)(r.h2,{id:"properties",children:"Properties"}),"\n",(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Property"}),(0,t.jsx)("th",{children:"Modifier"}),(0,t.jsx)("th",{children:"Type"}),(0,t.jsx)("th",{children:"Description"})]})}),(0,t.jsxs)("tbody",{children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"markerSource?"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"public"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LinkMarkerStyle",children:(0,t.jsx)(r.code,{children:"LinkMarkerStyle"})})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:"SVG path marker style at the source of the link."})})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"markerTarget?"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"public"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LinkMarkerStyle",children:(0,t.jsx)(r.code,{children:"LinkMarkerStyle"})})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:"SVG path marker style at the target of the link."})})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"renderLink"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"readonly"})})}),(0,t.jsx)("td",{children:(0,t.jsxs)(r.p,{children:["(",(0,t.jsx)(r.code,{children:"props"}),": ",(0,t.jsx)(r.a,{href:"/docs/api/workspace/interfaces/LinkTemplateProps",children:(0,t.jsx)(r.code,{children:"LinkTemplateProps"})}),") => ",(0,t.jsx)(r.code,{children:"ReactNode"})]})}),(0,t.jsxs)("td",{children:[(0,t.jsx)(r.p,{children:"Renders the link component on SVG canvas layer."}),(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"Note"}),": this should be a pure function, not a React component by itself."]})]})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"spline?"})})}),(0,t.jsx)("td",{children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.code,{children:"public"})})}),(0,t.jsx)("td",{children:(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:'"smooth"'})," | ",(0,t.jsx)(r.code,{children:'"straight"'})]})}),(0,t.jsxs)("td",{children:[(0,t.jsx)(r.p,{children:"SVG path spline type between source and target elements:"}),(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"straight"}),": a spline with straight line segments,"]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"smooth"}),": a spline with cubic-bezier curve segments."]}),"\n"]}),(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"Default"})}),(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:'"smooth"\n'})})]})]})]})]})]})}function h(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},16593:(e,r,n)=>{n.d(r,{R:()=>c,x:()=>d});var t=n(77810);const s={},i=t.createContext(s);function c(e){const r=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function d(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),t.createElement(i.Provider,{value:r},e.children)}}}]);