"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[40001],{93904:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>a,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>t,toc:()=>c});var d=n(74848),l=n(28453);const s={},i="Interface: LocaleFormatter",t={id:"api/workspace/interfaces/LocaleFormatter",title:"Interface: LocaleFormatter",description:"Provides utility methods to format the diagram content according",source:"@site/docs/api/workspace/interfaces/LocaleFormatter.md",sourceDirName:"api/workspace/interfaces",slug:"/api/workspace/interfaces/LocaleFormatter",permalink:"/docs/api/workspace/interfaces/LocaleFormatter",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/interfaces/LocaleFormatter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Interface: LinkRouter",permalink:"/docs/api/workspace/interfaces/LinkRouter"},next:{title:"Interface: MetadataApi",permalink:"/docs/api/workspace/interfaces/MetadataApi"}},a={},c=[{value:"Extended by",id:"extended-by",level:2},{value:"Methods",id:"methods",level:2},{value:"formatIri()",id:"formatiri",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"formatLabel()",id:"formatlabel",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"selectLabel()",id:"selectlabel",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-2",level:4}];function o(e){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(r.h1,{id:"interface-localeformatter",children:"Interface: LocaleFormatter"}),"\n",(0,d.jsx)(r.p,{children:"Provides utility methods to format the diagram content according\r\nto the current language."}),"\n",(0,d.jsx)(r.h2,{id:"extended-by",children:"Extended by"}),"\n",(0,d.jsxs)(r.ul,{children:["\n",(0,d.jsx)(r.li,{children:(0,d.jsx)(r.a,{href:"/docs/api/workspace/interfaces/DataGraphLocaleFormatter",children:(0,d.jsx)(r.code,{children:"DataGraphLocaleFormatter"})})}),"\n"]}),"\n",(0,d.jsx)(r.h2,{id:"methods",children:"Methods"}),"\n",(0,d.jsx)(r.h3,{id:"formatiri",children:"formatIri()"}),"\n",(0,d.jsxs)(r.blockquote,{children:["\n",(0,d.jsxs)(r.p,{children:[(0,d.jsx)(r.strong,{children:"formatIri"}),"(",(0,d.jsx)(r.code,{children:"iri"}),"): ",(0,d.jsx)(r.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsx)(r.p,{children:"Formats IRI to display in the UI:"}),"\n",(0,d.jsxs)(r.ul,{children:["\n",(0,d.jsxs)(r.li,{children:["usual IRIs are enclosed in ",(0,d.jsx)(r.code,{children:"<IRI>"}),";"]}),"\n",(0,d.jsxs)(r.li,{children:["anonymous element IRIs displayed as ",(0,d.jsx)(r.code,{children:"(blank node)"}),"."]}),"\n"]}),"\n",(0,d.jsx)(r.h4,{id:"parameters",children:"Parameters"}),"\n",(0,d.jsxs)("table",{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"Parameter"}),(0,d.jsx)("th",{children:"Type"})]})}),(0,d.jsx)("tbody",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:(0,d.jsx)(r.p,{children:(0,d.jsx)(r.code,{children:"iri"})})}),(0,d.jsx)("td",{children:(0,d.jsx)(r.p,{children:(0,d.jsx)(r.code,{children:"string"})})})]})})]}),"\n",(0,d.jsx)(r.h4,{id:"returns",children:"Returns"}),"\n",(0,d.jsx)(r.p,{children:(0,d.jsx)(r.code,{children:"string"})}),"\n",(0,d.jsx)(r.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,d.jsx)(r.p,{children:(0,d.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/5827ff93709c235dad7845b429185de5d18baca6/src/diagram/model.ts#L535",children:"src/diagram/model.ts:535"})}),"\n",(0,d.jsx)(r.hr,{}),"\n",(0,d.jsx)(r.h3,{id:"formatlabel",children:"formatLabel()"}),"\n",(0,d.jsxs)(r.blockquote,{children:["\n",(0,d.jsxs)(r.p,{children:[(0,d.jsx)(r.strong,{children:"formatLabel"}),"(",(0,d.jsx)(r.code,{children:"labels"}),", ",(0,d.jsx)(r.code,{children:"fallbackIri"}),", ",(0,d.jsx)(r.code,{children:"language"}),"?): ",(0,d.jsx)(r.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsxs)(r.p,{children:["Same as ",(0,d.jsx)(r.code,{children:"selectLabel()"})," but uses local part of the ",(0,d.jsx)(r.code,{children:"fallbackIRI"})," as a fallback\r\nto display an entity referred by IRI even if there is no suitable label to use."]}),"\n",(0,d.jsxs)(r.p,{children:[(0,d.jsx)(r.strong,{children:"Example"}),":"]}),"\n",(0,d.jsx)(r.pre,{children:(0,d.jsx)(r.code,{className:"language-ts",children:"// Returns: 'Apple'\r\nconst name = model.locale.formatLabel(\r\n    [\r\n        model.factory.literal('Apfel', 'de'),\r\n        model.factory.literal('\u042f\u0431\u043b\u043e\u043a\u043e', 'ru'),\r\n    ],\r\n    'http://example.com/entity/Apple',\r\n    'en'\r\n);\n"})}),"\n",(0,d.jsx)(r.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,d.jsxs)("table",{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"Parameter"}),(0,d.jsx)("th",{children:"Type"})]})}),(0,d.jsxs)("tbody",{children:[(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:(0,d.jsx)(r.p,{children:(0,d.jsx)(r.code,{children:"labels"})})}),(0,d.jsx)("td",{children:(0,d.jsxs)(r.p,{children:[(0,d.jsx)(r.code,{children:"undefined"})," | readonly ",(0,d.jsx)(r.code,{children:"Literal"}),"[]"]})})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:(0,d.jsx)(r.p,{children:(0,d.jsx)(r.code,{children:"fallbackIri"})})}),(0,d.jsx)("td",{children:(0,d.jsx)(r.p,{children:(0,d.jsx)(r.code,{children:"string"})})})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:(0,d.jsxs)(r.p,{children:[(0,d.jsx)(r.code,{children:"language"}),"?"]})}),(0,d.jsx)("td",{children:(0,d.jsx)(r.p,{children:(0,d.jsx)(r.code,{children:"string"})})})]})]})]}),"\n",(0,d.jsx)(r.h4,{id:"returns-1",children:"Returns"}),"\n",(0,d.jsx)(r.p,{children:(0,d.jsx)(r.code,{children:"string"})}),"\n",(0,d.jsx)(r.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,d.jsx)(r.p,{children:(0,d.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/5827ff93709c235dad7845b429185de5d18baca6/src/diagram/model.ts#L524",children:"src/diagram/model.ts:524"})}),"\n",(0,d.jsx)(r.hr,{}),"\n",(0,d.jsx)(r.h3,{id:"selectlabel",children:"selectLabel()"}),"\n",(0,d.jsxs)(r.blockquote,{children:["\n",(0,d.jsxs)(r.p,{children:[(0,d.jsx)(r.strong,{children:"selectLabel"}),"(",(0,d.jsx)(r.code,{children:"labels"}),", ",(0,d.jsx)(r.code,{children:"language"}),"?): ",(0,d.jsx)(r.code,{children:"undefined"})," | ",(0,d.jsx)(r.code,{children:"Literal"})]}),"\n"]}),"\n",(0,d.jsx)(r.p,{children:"Selects a single preferred literal for the target language out of several candidates."}),"\n",(0,d.jsxs)(r.p,{children:["Language code is specified as lowercase ",(0,d.jsx)(r.a,{href:"https://www.rfc-editor.org/rfc/rfc5646",children:"BCP47"}),"\r\nstring (examples: ",(0,d.jsx)(r.code,{children:"en"}),", ",(0,d.jsx)(r.code,{children:"en-gb"}),", etc)."]}),"\n",(0,d.jsxs)(r.p,{children:[(0,d.jsx)(r.strong,{children:"Example"}),":"]}),"\n",(0,d.jsx)(r.pre,{children:(0,d.jsx)(r.code,{className:"language-ts",children:"model.setLanguage('de');\r\n// Returns: Rdf.Literal { value = 'Apfel', language = 'de' }\r\nconst name = model.locale.formatLabel([\r\n    model.factory.literal('Apple', 'en'),\r\n    model.factory.literal('Apfel', 'de'),\r\n    model.factory.literal('\u042f\u0431\u043b\u043e\u043a\u043e', 'ru'),\r\n]);\n"})}),"\n",(0,d.jsx)(r.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,d.jsxs)("table",{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"Parameter"}),(0,d.jsx)("th",{children:"Type"}),(0,d.jsx)("th",{children:"Description"})]})}),(0,d.jsxs)("tbody",{children:[(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:(0,d.jsx)(r.p,{children:(0,d.jsx)(r.code,{children:"labels"})})}),(0,d.jsx)("td",{children:(0,d.jsxs)(r.p,{children:["readonly ",(0,d.jsx)(r.code,{children:"Literal"}),"[]"]})}),(0,d.jsx)("td",{children:(0,d.jsx)(r.p,{children:"candidate literal with same or different language codes"})})]}),(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:(0,d.jsxs)(r.p,{children:[(0,d.jsx)(r.code,{children:"language"}),"?"]})}),(0,d.jsx)("td",{children:(0,d.jsx)(r.p,{children:(0,d.jsx)(r.code,{children:"string"})})}),(0,d.jsx)("td",{children:(0,d.jsxs)(r.p,{children:["target language code (defaults to the ",(0,d.jsx)(r.code,{children:"DiagramModel.language"}),")"]})})]})]})]}),"\n",(0,d.jsx)(r.h4,{id:"returns-2",children:"Returns"}),"\n",(0,d.jsxs)(r.p,{children:[(0,d.jsx)(r.code,{children:"undefined"})," | ",(0,d.jsx)(r.code,{children:"Literal"})]}),"\n",(0,d.jsxs)(r.p,{children:["selected literal or ",(0,d.jsx)(r.code,{children:"undefined"})," if no suitable literal was found"]}),"\n",(0,d.jsx)(r.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,d.jsx)(r.p,{children:(0,d.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/5827ff93709c235dad7845b429185de5d18baca6/src/diagram/model.ts#L502",children:"src/diagram/model.ts:502"})})]})}function h(e={}){const{wrapper:r}={...(0,l.R)(),...e.components};return r?(0,d.jsx)(r,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},28453:(e,r,n)=>{n.d(r,{R:()=>i,x:()=>t});var d=n(96540);const l={},s=d.createContext(l);function i(e){const r=d.useContext(s);return d.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function t(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),d.createElement(s.Provider,{value:r},e.children)}}}]);