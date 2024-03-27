"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[46969],{71243:(e,t,s)=>{s.d(t,{A:()=>p});s(96540);var i=s(34164),n=s(17559),a=s(81754),r=s(99169),c=s(28774),o=s(21312),l=s(86025),d=s(74848);function m(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const u={breadcrumbHomeIcon:"breadcrumbHomeIcon_YNFT"};function h(){const e=(0,l.A)("/");return(0,d.jsx)("li",{className:"breadcrumbs__item",children:(0,d.jsx)(c.A,{"aria-label":(0,o.T)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,d.jsx)(m,{className:u.breadcrumbHomeIcon})})})}const b={breadcrumbsContainer:"breadcrumbsContainer_Z_bl"};function x(e){let{children:t,href:s,isLast:i}=e;const n="breadcrumbs__link";return i?(0,d.jsx)("span",{className:n,itemProp:"name",children:t}):s?(0,d.jsx)(c.A,{className:n,href:s,itemProp:"item",children:(0,d.jsx)("span",{itemProp:"name",children:t})}):(0,d.jsx)("span",{className:n,children:t})}function v(e){let{children:t,active:s,index:n,addMicrodata:a}=e;return(0,d.jsxs)("li",{...a&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,i.A)("breadcrumbs__item",{"breadcrumbs__item--active":s}),children:[t,(0,d.jsx)("meta",{itemProp:"position",content:String(n+1)})]})}function p(){const e=(0,a.OF)(),t=(0,r.Dt)();return e?(0,d.jsx)("nav",{className:(0,i.A)(n.G.docs.docBreadcrumbs,b.breadcrumbsContainer),"aria-label":(0,o.T)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,d.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,d.jsx)(h,{}),e.map(((t,s)=>{const i=s===e.length-1,n="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,d.jsx)(v,{active:i,index:s,addMicrodata:!!n,children:(0,d.jsx)(x,{href:n,isLast:i,children:t.label})},s)}))]})}):null}},34136:(e,t,s)=>{s.r(t),s.d(t,{default:()=>y});s(96540);var i=s(1003),n=s(81754),a=s(86025),r=s(34164),c=s(28774),o=s(16654),l=s(21312),d=s(51107);const m={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var u=s(74848);function h(e){let{href:t,children:s}=e;return(0,u.jsx)(c.A,{href:t,className:(0,r.A)("card padding--lg",m.cardContainer),children:s})}function b(e){let{href:t,icon:s,title:i,description:n}=e;return(0,u.jsxs)(h,{href:t,children:[(0,u.jsxs)(d.A,{as:"h2",className:(0,r.A)("text--truncate",m.cardTitle),title:i,children:[s," ",i]}),n&&(0,u.jsx)("p",{className:(0,r.A)("text--truncate",m.cardDescription),title:n,children:n})]})}function x(e){let{item:t}=e;const s=(0,n.Nr)(t);return s?(0,u.jsx)(b,{href:s,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,l.T)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function v(e){let{item:t}=e;const s=(0,o.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,n.cC)(t.docId??void 0);return(0,u.jsx)(b,{href:t.href,icon:s,title:t.label,description:t.description??i?.description})}function p(e){let{item:t}=e;switch(t.type){case"link":return(0,u.jsx)(v,{item:t});case"category":return(0,u.jsx)(x,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function g(e){let{className:t}=e;const s=(0,n.$S)();return(0,u.jsx)(j,{items:s.items,className:t})}function j(e){const{items:t,className:s}=e;if(!t)return(0,u.jsx)(g,{...e});const i=(0,n.d1)(t);return(0,u.jsx)("section",{className:(0,r.A)("row",s),children:i.map(((e,t)=>(0,u.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,u.jsx)(p,{item:e})},t)))})}var f=s(86929),A=s(51878),N=s(4267),_=s(71243);const T={generatedIndexPage:"generatedIndexPage_vN6x",list:"list_eTzJ",title:"title_kItE"};function L(e){let{categoryGeneratedIndex:t}=e;return(0,u.jsx)(i.be,{title:t.title,description:t.description,keywords:t.keywords,image:(0,a.A)(t.image)})}function k(e){let{categoryGeneratedIndex:t}=e;const s=(0,n.$S)();return(0,u.jsxs)("div",{className:T.generatedIndexPage,children:[(0,u.jsx)(A.A,{}),(0,u.jsx)(_.A,{}),(0,u.jsx)(N.A,{}),(0,u.jsxs)("header",{children:[(0,u.jsx)(d.A,{as:"h1",className:T.title,children:t.title}),t.description&&(0,u.jsx)("p",{children:t.description})]}),(0,u.jsx)("article",{className:"margin-top--lg",children:(0,u.jsx)(j,{items:s.items,className:T.list})}),(0,u.jsx)("footer",{className:"margin-top--lg",children:(0,u.jsx)(f.A,{previous:t.navigation.previous,next:t.navigation.next})})]})}function y(e){return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(L,{...e}),(0,u.jsx)(k,{...e})]})}},86929:(e,t,s)=>{s.d(t,{A:()=>o});s(96540);var i=s(21312),n=s(34164),a=s(28774),r=s(74848);function c(e){const{permalink:t,title:s,subLabel:i,isNext:c}=e;return(0,r.jsxs)(a.A,{className:(0,n.A)("pagination-nav__link",c?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[i&&(0,r.jsx)("div",{className:"pagination-nav__sublabel",children:i}),(0,r.jsx)("div",{className:"pagination-nav__label",children:s})]})}function o(e){const{previous:t,next:s}=e;return(0,r.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,i.T)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,r.jsx)(c,{...t,subLabel:(0,r.jsx)(i.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),s&&(0,r.jsx)(c,{...s,subLabel:(0,r.jsx)(i.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}},4267:(e,t,s)=>{s.d(t,{A:()=>o});s(96540);var i=s(34164),n=s(21312),a=s(17559),r=s(32252),c=s(74848);function o(e){let{className:t}=e;const s=(0,r.r)();return s.badge?(0,c.jsx)("span",{className:(0,i.A)(t,a.G.docs.docVersionBadge,"badge badge--secondary"),children:(0,c.jsx)(n.A,{id:"theme.docs.versionBadge.label",values:{versionLabel:s.label},children:"Version: {versionLabel}"})}):null}},51878:(e,t,s)=>{s.d(t,{A:()=>v});s(96540);var i=s(34164),n=s(44586),a=s(28774),r=s(21312),c=s(44070),o=s(17559),l=s(55597),d=s(32252),m=s(74848);const u={unreleased:function(e){let{siteTitle:t,versionMetadata:s}=e;return(0,m.jsx)(r.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,m.jsx)("b",{children:s.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:s}=e;return(0,m.jsx)(r.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,m.jsx)("b",{children:s.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function h(e){const t=u[e.versionMetadata.banner];return(0,m.jsx)(t,{...e})}function b(e){let{versionLabel:t,to:s,onClick:i}=e;return(0,m.jsx)(r.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,m.jsx)("b",{children:(0,m.jsx)(a.A,{to:s,onClick:i,children:(0,m.jsx)(r.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function x(e){let{className:t,versionMetadata:s}=e;const{siteConfig:{title:a}}=(0,n.A)(),{pluginId:r}=(0,c.vT)({failfast:!0}),{savePreferredVersionName:d}=(0,l.g1)(r),{latestDocSuggestion:u,latestVersionSuggestion:x}=(0,c.HW)(r),v=u??(p=x).docs.find((e=>e.id===p.mainDocId));var p;return(0,m.jsxs)("div",{className:(0,i.A)(t,o.G.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,m.jsx)("div",{children:(0,m.jsx)(h,{siteTitle:a,versionMetadata:s})}),(0,m.jsx)("div",{className:"margin-top--md",children:(0,m.jsx)(b,{versionLabel:x.label,to:v.path,onClick:()=>d(x.name)})})]})}function v(e){let{className:t}=e;const s=(0,d.r)();return s.banner?(0,m.jsx)(x,{className:t,versionMetadata:s}):null}}}]);