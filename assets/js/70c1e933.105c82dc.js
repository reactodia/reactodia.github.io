"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[9290],{26926:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>t,metadata:()=>o,toc:()=>l});var r=n(74848),c=n(28453);const t={},i="Interface: LinkTypesToolboxProps",o={id:"api/workspace/interfaces/LinkTypesToolboxProps",title:"Interface: LinkTypesToolboxProps",description:"Props for LinkTypesToolbox component.",source:"@site/docs/api/workspace/interfaces/LinkTypesToolboxProps.md",sourceDirName:"api/workspace/interfaces",slug:"/api/workspace/interfaces/LinkTypesToolboxProps",permalink:"/docs/api/workspace/interfaces/LinkTypesToolboxProps",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/interfaces/LinkTypesToolboxProps.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Interface: LinkTypeEvents",permalink:"/docs/api/workspace/interfaces/LinkTypeEvents"},next:{title:"Interface: LinkValidation",permalink:"/docs/api/workspace/interfaces/LinkValidation"}},d={},l=[{value:"See",id:"see",level:2},{value:"Properties",id:"properties",level:2}];function a(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,c.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"interface-linktypestoolboxprops",children:"Interface: LinkTypesToolboxProps"}),"\n",(0,r.jsxs)(s.p,{children:["Props for ",(0,r.jsx)(s.code,{children:"LinkTypesToolbox"})," component."]}),"\n",(0,r.jsx)(s.h2,{id:"see",children:"See"}),"\n",(0,r.jsx)(s.p,{children:"LinkTypesToolbox"}),"\n",(0,r.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Property"}),(0,r.jsx)("th",{children:"Type"}),(0,r.jsx)("th",{children:"Description"})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"className?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"string"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:"Additional CSS class for the component."})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"instancesSearchCommands?"})})}),(0,r.jsx)("td",{children:(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/docs/api/workspace/interfaces/EventTrigger",children:(0,r.jsx)(s.code,{children:"EventTrigger"})}),"<",(0,r.jsx)(s.a,{href:"/docs/api/workspace/interfaces/InstancesSearchCommands",children:(0,r.jsx)(s.code,{children:"InstancesSearchCommands"})}),">"]})}),(0,r.jsx)("td",{children:(0,r.jsxs)(s.p,{children:["Event bus to send commands to ",(0,r.jsx)(s.code,{children:"InstancesSearch"})," component."]})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"minSearchTermLength?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"number"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(s.p,{children:"Minimum number of characters in the search term to initiate the search."}),(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Default"})}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"1\n"})})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"searchStore?"})})}),(0,r.jsx)("td",{children:(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/docs/api/workspace/interfaces/SearchInputStore",children:(0,r.jsx)(s.code,{children:"SearchInputStore"})}),"<",(0,r.jsx)(s.code,{children:"string"}),">"]})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(s.p,{children:"Controlled search input state store."}),(0,r.jsx)(s.p,{children:'If specified, renders the component in "headless" mode\r\nwithout a text filter input.'})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"searchTimeout?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"number"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(s.p,{children:"Debounce timeout in milliseconds after input to perform the text search."}),(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Default"})}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"200\n"})})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"trackSelected?"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"boolean"})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(s.p,{children:"Whether the component should listen to the diagram selection to\r\ndisplay links connected to the selected items first."}),(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Default"})}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"true\n"})})]})]})]})]})]})}function h(e={}){const{wrapper:s}={...(0,c.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>i,x:()=>o});var r=n(96540);const c={},t=r.createContext(c);function i(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:i(e.components),r.createElement(t.Provider,{value:s},e.children)}}}]);