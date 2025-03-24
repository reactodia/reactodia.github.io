"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[24085],{1848:(e,t,n)=>{n.d(t,{U:()=>c,y:()=>s});var o=n(34164),r=(n(77810),n(38410)),a=n(18576);const i={inline:"inline_KKeb",fullSize:"fullSize_xfsN"};var l=n(64922);function s(){return(0,l.jsx)(a.A,{children:(0,l.jsx)("meta",{name:"viewport",content:"initial-scale=1, interactive-widget=resizes-content"})})}function c(e){const{fullSize:t,height:n,children:a}=e,s={"--inline-reactodia-height":t?"auto":n};return(0,l.jsx)("div",{className:(0,o.default)(t?i.fullSize:i.inline),style:s,children:(0,l.jsx)(r.A,{children:()=>(0,l.jsx)(l.Fragment,{children:a})})})}},62424:(e,t,n)=>{n.d(t,{V:()=>d});var o,r=n(77810),a=n(43946);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)({}).hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i.apply(null,arguments)}const l=e=>{let{title:t,titleId:n,...a}=e;return r.createElement("svg",i({width:16,height:16,viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor","aria-labelledby":n},a),t?r.createElement("title",{id:n},t):null,o||(o=r.createElement("path",{d:"M4.708 5.578 2.061 8.224l2.647 2.646-.708.708-3-3V7.87l3-3 .708.708zm7-.708L11 5.578l2.647 2.646L11 10.87l.708.708 3-3V7.87l-3-3zM4.908 13l.894.448 5-10L9.908 3l-5 10z"})))},s={viewSource:"viewSource_fiKn",label:"label_vLkb"};var c=n(64922);function d(e){const{target:t}=e;return(0,c.jsxs)(a.A,{className:s.viewSource,to:t,title:"View source code for the playground page",children:[(0,c.jsx)(l,{width:24,height:24}),(0,c.jsx)("span",{className:s.label,children:"View Source"})]})}},66446:(e,t,n)=>{n.d(t,{j:()=>i});n(77810);var o=n(96333),r=n(2519),a=n(64922);function i(){const{model:e,editor:t,overlay:n}=o.useWorkspace();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.ToolbarActionOpen,{fileAccept:".json",onSelect:async t=>{const r=new Map;for(const n of e.elements)for(const e of o.iterateEntitiesOf(n))r.set(e.id,e);const a=n.startTask({title:"Importing a layout from file"});try{const n=await t.text(),o=JSON.parse(n);await e.importLayout({dataProvider:e.dataProvider,diagram:o,preloadedElements:r,validateLinks:!0})}catch(i){a.setError(new Error("Failed to load specified file with a diagram layout.",{cause:i}))}finally{a.end()}},children:"Open diagram from file"}),(0,a.jsx)(o.ToolbarActionSave,{mode:"layout",onSelect:()=>{const t=e.exportLayout(),n=JSON.stringify(t),o=new Blob([n],{type:"application/json"}),a=(new Date).toISOString().replaceAll(/[Z\s:-]/g,"");(0,r.saveAs)(o,`reactodia-diagram-${a}.json`)},children:"Save diagram to file"}),t.inAuthoringMode?(0,a.jsx)(o.ToolbarActionSave,{mode:"authoring",onSelect:()=>{const e=t.authoringState;console.log("Authoring state:",e),alert("Please check browser console for result")},children:"Persist changes to data"}):null,(0,a.jsx)(o.ToolbarActionClearAll,{}),(0,a.jsx)(o.ToolbarActionExport,{kind:"exportRaster"}),(0,a.jsx)(o.ToolbarActionExport,{kind:"exportSvg"}),(0,a.jsx)(o.ToolbarActionExport,{kind:"print"})]})}},2200:(e,t,n)=>{n.r(t),n.d(t,{PlaygroundSparql:()=>p});var o=n(77810),r=n(96333),a=n(66446);function i(){const e=window.location.hash;if(e.length>1)try{return new URLSearchParams(e.substring(1))}catch(t){}}var l=n(64922);function s(e){const{settings:t,applySettings:n}=e;if(!t)return null;const o=r.useWorkspace(),a=URL.canParse(t.endpointUrl)?new URL(t.endpointUrl):void 0;return(0,l.jsxs)(r.ToolbarAction,{onSelect:()=>c(t,n,o),children:["SPARQL endpoint: ",(0,l.jsx)("code",{children:a?.host??t.endpointUrl})]})}function c(e,t,n){const{overlay:o}=n;o.showDialog({style:{caption:"SPARQL connection settings",defaultSize:{width:400,height:250},resizableBy:"x",closable:Boolean(e)},content:(0,l.jsx)(d,{initialSettings:e,onSubmit:e=>{o.hideDialog(),t(e)}})})}function d(e){const{initialSettings:t,onSubmit:n}=e,[r,a]=o.useState(t??{endpointUrl:""}),i=0===r.endpointUrl.length||URL.canParse(r.endpointUrl),s=r.endpointUrl.length>0&&i;return(0,l.jsxs)("div",{className:"reactodia-form",children:[(0,l.jsxs)("div",{className:"reactodia-form__body",children:[(0,l.jsxs)("div",{className:"reactodia-form__control-row",children:[(0,l.jsx)("label",{htmlFor:"sparqlEndpointUrl",children:"Endpoint URL"}),(0,l.jsx)("input",{id:"sparqlEndpointUrl",type:"input",className:"reactodia-form-control",placeholder:"SPARQL endpoint URL",autoFocus:!0,value:r.endpointUrl,onChange:e=>{const t=e.currentTarget.value;a((e=>({...e,endpointUrl:t})))},onKeyDown:e=>{"Enter"===e.key&&s&&n(r)}}),i?null:(0,l.jsx)("div",{className:"reactodia-form__control-error",children:"Invalid URL"})]}),(0,l.jsx)("div",{className:"reactodia-form__control-row",children:"A public SPARQL endpoints will work if only if its configured to allow cross-origin GET queries (CORS headers)."})]}),(0,l.jsx)("div",{className:"reactodia-form__controls",children:(0,l.jsx)("button",{className:"reactodia-btn reactodia-btn-primary",type:"button",disabled:!s,onClick:()=>n(r),children:"Connect"})})]})}const u=r.defineLayoutWorker((()=>new Worker(new URL(n.p+n.u(33968),n.b))));function p(){const{defaultLayout:e}=r.useWorker(u),[t,n]=o.useState((()=>{const e=i(),t=e?.get("sparql-endpoint");return t?{endpointUrl:t}:void 0})),d=e=>{!function(e,t){const n=i()??new URLSearchParams;t?n.set(e,t):n.delete(e),window.location.hash=n.toString()}("sparql-endpoint",e.endpointUrl),n(e)},{onMount:p}=r.useLoadedWorkspace((async e=>{let{context:n,signal:o}=e;const{model:a,getCommandBus:i}=n;if(t){const e=new r.SparqlDataProvider({endpointUrl:t.endpointUrl,imagePropertyUris:["http://xmlns.com/foaf/0.1/img"]},r.OwlStatsSettings);a.importLayout({dataProvider:e,validateLinks:!0,signal:o}),i(r.UnifiedSearchTopic).trigger("focus",{sectionKey:"elementTypes"})}else c(t,d,n)}),[t]);return(0,l.jsx)(r.Workspace,{ref:p,defaultLayout:e,children:(0,l.jsx)(r.DefaultWorkspace,{menu:(0,l.jsx)(a.j,{}),canvasWidgets:[(0,l.jsx)(r.Toolbar,{dock:"sw",dockOffsetY:40,children:(0,l.jsx)(s,{settings:t,applySettings:d})},"sparql-settings")],languages:[{code:"de",label:"Deutsch"},{code:"en",label:"english"},{code:"es",label:"espa\xf1ol"},{code:"fr",label:"fran\xe7ais"},{code:"ja",label:"\u65e5\u672c\u8a9e"},{code:"hi",label:"\u0939\u093f\u0928\u094d\u0926\u0940"},{code:"pt",label:"portugu\xeas"},{code:"ru",label:"\u0440\u0443\u0441\u0441\u043a\u0438\u0439"},{code:"zh",label:"\u6c49\u8bed"}]})})}},66011:(e,t,n)=>{n.r(t),n.d(t,{default:()=>s});var o=n(38410),r=n(88320),a=n(1848),i=n(62424),l=n(64922);function s(){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a.y,{}),(0,l.jsxs)(r.A,{title:"Playground: SPARQL",noFooter:!0,children:[(0,l.jsx)(o.A,{children:()=>{const{PlaygroundSparql:e}=n(2200);return Promise.resolve().then(n.bind(n,2200)),(0,l.jsx)(a.U,{fullSize:!0,children:(0,l.jsx)(e,{})})}}),(0,l.jsx)(i.V,{target:"/docs/examples/sparql"})]})]})}}}]);