"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[4166],{52337:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>a});var r=i(74848),t=i(28453);const s={},c="Function: isEncodedBlank()",d={id:"api/workspace/functions/isEncodedBlank",title:"Function: isEncodedBlank()",description:"isEncodedBlank(iri): boolean",source:"@site/docs/api/workspace/functions/isEncodedBlank.md",sourceDirName:"api/workspace/functions",slug:"/api/workspace/functions/isEncodedBlank",permalink:"/docs/api/workspace/functions/isEncodedBlank",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/functions/isEncodedBlank.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Function: hashSubtypeEdge()",permalink:"/docs/api/workspace/functions/hashSubtypeEdge"},next:{title:"Rect",permalink:"/docs/api/workspace/namespaces/Rect/"}},o={},a=[{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Defined in",id:"defined-in",level:2}];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"function-isencodedblank",children:"Function: isEncodedBlank()"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"isEncodedBlank"}),"(",(0,r.jsx)(n.code,{children:"iri"}),"): ",(0,r.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Returns ",(0,r.jsx)(n.code,{children:"true"})," if IRI represents an anonymous entity specific to the data provider;\r\notherwise ",(0,r.jsx)(n.code,{children:"false"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["The represented entity can only be decoded by a ",(0,r.jsx)(n.code,{children:"DataProvider"})," with a support\r\nfor the specific blank node subtype, determined by the IRI prefix, e.g.:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"urn:reactodia:blank:rdf:*"})," encodes RDF blank nodes from `RdfDataProvider;"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"urn:reactodia:blank:sparql:*"})," encodes outer graph content for blank nodes\r\nfrom ",(0,r.jsx)(n.code,{children:"SparqlDataProvider"}),";"]}),"\n",(0,r.jsx)(n.li,{children:"etc."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Parameter"}),(0,r.jsx)("th",{children:"Type"})]})}),(0,r.jsx)("tbody",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"iri"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"string"})})})]})})]}),"\n",(0,r.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"boolean"})}),"\n",(0,r.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/5827ff93709c235dad7845b429185de5d18baca6/src/data/model.ts#L128",children:"src/data/model.ts:128"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>c,x:()=>d});var r=i(96540);const t={},s=r.createContext(t);function c(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);