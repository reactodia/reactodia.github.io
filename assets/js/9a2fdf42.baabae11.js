"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[38861],{94967:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>t,contentTitle:()=>l,default:()=>o,frontMatter:()=>d,metadata:()=>c,toc:()=>a});var s=n(64922),i=n(16593);const d={},l="Interface: Translation",c={id:"api/workspace/interfaces/Translation",title:"Interface: Translation",description:"Provides i18n strings and templates for the UI elements.",source:"@site/docs/api/workspace/interfaces/Translation.md",sourceDirName:"api/workspace/interfaces",slug:"/api/workspace/interfaces/Translation",permalink:"/docs/api/workspace/interfaces/Translation",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/api/workspace/interfaces/Translation.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Interface: TemporaryState",permalink:"/docs/api/workspace/interfaces/TemporaryState"},next:{title:"Interface: ValidationProvider",permalink:"/docs/api/workspace/interfaces/ValidationProvider"}},t={},a=[{value:"Methods",id:"methods",level:2},{value:"formatIri()",id:"formatiri",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"formatLabel()",id:"formatlabel",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"selectLabel()",id:"selectlabel",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"selectValues()",id:"selectvalues",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"template()",id:"template",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"text()",id:"text",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-5",level:4}];function h(e){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"interface-translation",children:"Interface: Translation"}),"\n",(0,s.jsx)(r.p,{children:"Provides i18n strings and templates for the UI elements."}),"\n",(0,s.jsx)(r.h2,{id:"methods",children:"Methods"}),"\n",(0,s.jsx)(r.h3,{id:"formatiri",children:"formatIri()"}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"formatIri"}),"(",(0,s.jsx)(r.code,{children:"iri"}),"): ",(0,s.jsx)(r.code,{children:"string"})]}),"\n"]}),"\n",(0,s.jsx)(r.p,{children:"Formats IRI to display in the UI:"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["usual IRIs are enclosed in ",(0,s.jsx)(r.code,{children:"<IRI>"}),";"]}),"\n",(0,s.jsxs)(r.li,{children:["anonymous element IRIs displayed as ",(0,s.jsx)(r.code,{children:"(blank node)"}),"."]}),"\n"]}),"\n",(0,s.jsx)(r.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"iri"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"string"})})})]})})]}),"\n",(0,s.jsx)(r.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"string"})}),"\n",(0,s.jsx)(r.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/b7445388473252d08748e61e6863539da837bbb3/src/coreUtils/i18n.tsx#L133",children:"coreUtils/i18n.tsx:133"})}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"formatlabel",children:"formatLabel()"}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"formatLabel"}),"(",(0,s.jsx)(r.code,{children:"labels"}),", ",(0,s.jsx)(r.code,{children:"fallbackIri"}),", ",(0,s.jsx)(r.code,{children:"language"}),"): ",(0,s.jsx)(r.code,{children:"string"})]}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:["Same as ",(0,s.jsx)(r.a,{href:"/docs/api/workspace/interfaces/Translation#selectlabel",children:"selectLabel()"})," but uses local part of\r\nthe ",(0,s.jsx)(r.code,{children:"fallbackIri"})," as a fallback to display an entity referred by IRI\r\neven if there is no suitable label to use."]}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"Example"}),":"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"// Returns: 'Apple'\r\nconst name = t.formatLabel(\r\n    [\r\n        model.factory.literal('Apfel', 'de'),\r\n        model.factory.literal('\u042f\u0431\u043b\u043e\u043a\u043e', 'ru'),\r\n    ],\r\n    'http://example.com/entity/Apple',\r\n    'en'\r\n);\n"})}),"\n",(0,s.jsx)(r.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"labels"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"undefined"})," | readonly ",(0,s.jsx)(r.code,{children:"Literal"}),"[]"]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"fallbackIri"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"string"})})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"language"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"string"})})})]})]})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"string"})}),"\n",(0,s.jsx)(r.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/b7445388473252d08748e61e6863539da837bbb3/src/coreUtils/i18n.tsx#L122",children:"coreUtils/i18n.tsx:122"})}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"selectlabel",children:"selectLabel()"}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"selectLabel"}),"(",(0,s.jsx)(r.code,{children:"labels"}),", ",(0,s.jsx)(r.code,{children:"language"}),"): ",(0,s.jsx)(r.code,{children:"undefined"})," | ",(0,s.jsx)(r.code,{children:"Literal"})]}),"\n"]}),"\n",(0,s.jsx)(r.p,{children:"Selects a single preferred literal for the target language out of several candidates."}),"\n",(0,s.jsxs)(r.p,{children:["Language code is specified as lowercase ",(0,s.jsx)(r.a,{href:"https://www.rfc-editor.org/rfc/rfc5646",children:"BCP47"}),"\r\nstring (examples: ",(0,s.jsx)(r.code,{children:"en"}),", ",(0,s.jsx)(r.code,{children:"en-gb"}),", etc)."]}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"Example"}),":"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"// Returns: Rdf.Literal { value = 'Apfel', language = 'de' }\r\nconst name = t.selectLabel(\r\n    [\r\n        model.factory.literal('Apple', 'en'),\r\n        model.factory.literal('Apfel', 'de'),\r\n        model.factory.literal('\u042f\u0431\u043b\u043e\u043a\u043e', 'ru'),\r\n    ],\r\n    'de'\r\n);\n"})}),"\n",(0,s.jsx)(r.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Description"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"labels"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:["readonly ",(0,s.jsx)(r.code,{children:"Literal"}),"[]"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"candidate literal with same or different language codes"})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"language"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"string"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"target language code"})})]})]})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-2",children:"Returns"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"undefined"})," | ",(0,s.jsx)(r.code,{children:"Literal"})]}),"\n",(0,s.jsxs)(r.p,{children:["selected literal or ",(0,s.jsx)(r.code,{children:"undefined"})," if no suitable literal was found"]}),"\n",(0,s.jsx)(r.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/b7445388473252d08748e61e6863539da837bbb3/src/coreUtils/i18n.tsx#L83",children:"coreUtils/i18n.tsx:83"})}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"selectvalues",children:"selectValues()"}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"selectValues"}),"(",(0,s.jsx)(r.code,{children:"values"}),", ",(0,s.jsx)(r.code,{children:"language"}),"): (",(0,s.jsx)(r.code,{children:"Literal"})," | ",(0,s.jsx)(r.a,{href:"/docs/api/workspace/namespaces/Rdf/type-aliases/NamedNode",children:(0,s.jsx)(r.code,{children:"NamedNode"})}),"<",(0,s.jsx)(r.code,{children:"string"}),">)[]"]}),"\n"]}),"\n",(0,s.jsx)(r.p,{children:"Selects a subset of RDF values for the target language."}),"\n",(0,s.jsx)(r.p,{children:"The value is included if matches at least one criteria:"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"is a named node,"}),"\n",(0,s.jsx)(r.li,{children:"is a literal without language,"}),"\n",(0,s.jsx)(r.li,{children:"is a literal with language equal to the target language."}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:["Language code is specified as lowercase ",(0,s.jsx)(r.a,{href:"https://www.rfc-editor.org/rfc/rfc5646",children:"BCP47"}),"\r\nstring (examples: ",(0,s.jsx)(r.code,{children:"en"}),", ",(0,s.jsx)(r.code,{children:"en-gb"}),", etc)."]}),"\n",(0,s.jsx)(r.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"values"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:["readonly (",(0,s.jsx)(r.code,{children:"Literal"})," | ",(0,s.jsx)(r.a,{href:"/docs/api/workspace/namespaces/Rdf/type-aliases/NamedNode",children:(0,s.jsx)(r.code,{children:"NamedNode"})}),"<",(0,s.jsx)(r.code,{children:"string"}),">)[]"]})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"language"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"string"})})})]})]})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-3",children:"Returns"}),"\n",(0,s.jsxs)(r.p,{children:["(",(0,s.jsx)(r.code,{children:"Literal"})," | ",(0,s.jsx)(r.a,{href:"/docs/api/workspace/namespaces/Rdf/type-aliases/NamedNode",children:(0,s.jsx)(r.code,{children:"NamedNode"})}),"<",(0,s.jsx)(r.code,{children:"string"}),">)[]"]}),"\n",(0,s.jsx)(r.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/b7445388473252d08748e61e6863539da837bbb3/src/coreUtils/i18n.tsx#L99",children:"coreUtils/i18n.tsx:99"})}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"template",children:"template()"}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"template"}),"(",(0,s.jsx)(r.code,{children:"key"}),", ",(0,s.jsx)(r.code,{children:"parts"}),"): ",(0,s.jsx)(r.code,{children:"ReactNode"})]}),"\n"]}),"\n",(0,s.jsx)(r.p,{children:"Templates a translation string into React Fragment by replacing\r\nplaceholders with provided React nodes (elements, etc)."}),"\n",(0,s.jsx)(r.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"key"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"`${string}.${string}`"})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"parts"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"Record"}),"<",(0,s.jsx)(r.code,{children:"string"}),", ",(0,s.jsx)(r.code,{children:"ReactNode"}),">"]})})]})]})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-4",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"ReactNode"})}),"\n",(0,s.jsx)(r.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/b7445388473252d08748e61e6863539da837bbb3/src/coreUtils/i18n.tsx#L55",children:"coreUtils/i18n.tsx:55"})}),"\n",(0,s.jsx)(r.hr,{}),"\n",(0,s.jsx)(r.h3,{id:"text",children:"text()"}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.strong,{children:"text"}),"(",(0,s.jsx)(r.code,{children:"key"}),", ",(0,s.jsx)(r.code,{children:"placeholders"}),"?): ",(0,s.jsx)(r.code,{children:"string"})]}),"\n"]}),"\n",(0,s.jsx)(r.p,{children:"Formats a translation string by replacing placeholders with\r\nprovided values."}),"\n",(0,s.jsx)(r.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"key"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"`${string}.${string}`"})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"placeholders"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"Record"}),"<",(0,s.jsx)(r.code,{children:"string"}),", ",(0,s.jsx)(r.code,{children:"string"})," | ",(0,s.jsx)(r.code,{children:"number"})," | ",(0,s.jsx)(r.code,{children:"boolean"}),">"]})})]})]})]}),"\n",(0,s.jsx)(r.h4,{id:"returns-5",children:"Returns"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.code,{children:"string"})}),"\n",(0,s.jsx)(r.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"https://github.com/AlexeyMz/reactodia-workspace/blob/b7445388473252d08748e61e6863539da837bbb3/src/coreUtils/i18n.tsx#L46",children:"coreUtils/i18n.tsx:46"})})]})}function o(e={}){const{wrapper:r}={...(0,i.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},16593:(e,r,n)=>{n.d(r,{R:()=>l,x:()=>c});var s=n(77810);const i={},d=s.createContext(i);function l(e){const r=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(d.Provider,{value:r},e.children)}}}]);