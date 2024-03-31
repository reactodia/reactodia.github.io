"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[69162],{1848:(e,t,a)=>{a.d(t,{U:()=>i});var r=a(34164),n=(a(96540),a(78478));const o={inline:"inline_KKeb",fullSize:"fullSize_xfsN"};var s=a(74848);function i(e){const{fullSize:t,height:a,children:i}=e,l={"--inline-reactodia-height":t?"auto":a};return(0,s.jsx)("div",{className:(0,r.A)(t?o.fullSize:o.inline),style:l,children:(0,s.jsx)(n.A,{children:()=>(0,s.jsx)(s.Fragment,{children:i})})})}},66446:(e,t,a)=>{a.d(t,{j:()=>s});a(96540);var r=a(19738),n=a(4213),o=a(74848);function s(){const{model:e,editor:t}=r.useWorkspace();return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.ToolbarActionOpen,{fileAccept:".json",onSelect:async t=>{const a=new Map;for(const o of e.elements)a.set(o.iri,o.data);const r=await t.text();try{const t=JSON.parse(r);await e.importLayout({dataProvider:e.dataProvider,diagram:t,preloadedElements:a,validateLinks:!0})}catch(n){alert("Failed to load specified file with a diagram layout.")}},children:"Open diagram from file"}),(0,o.jsx)(r.ToolbarActionSave,{mode:"layout",onSelect:()=>{const t=e.exportLayout(),a=JSON.stringify(t),r=new Blob([a],{type:"application/json"}),o=(new Date).toISOString().replaceAll(/[Z\s:-]/g,"");(0,n.saveAs)(r,`reactodia-diagram-${o}.json`)},children:"Save diagram to file"}),t.inAuthoringMode?(0,o.jsx)(r.ToolbarActionSave,{mode:"authoring",onSelect:()=>{const e=t.authoringState;console.log("Authoring state:",e),alert("Please check browser console for result")},children:"Persist changes to data"}):null,(0,o.jsx)(r.ToolbarActionClearAll,{}),(0,o.jsx)(r.ToolbarActionExport,{kind:"exportRaster"}),(0,o.jsx)(r.ToolbarActionExport,{kind:"exportSvg"}),(0,o.jsx)(r.ToolbarActionExport,{kind:"print"})]})}},96468:(e,t,a)=>{a.r(t),a.d(t,{RdfExample:()=>m});var r=a(96540),n=a(19738),o=a(33291);const s="http://www.w3.org/2002/07/owl#",i="http://www.w3.org/2000/01/rdf-schema#",l={class:s+"Class",objectProperty:s+"ObjectProperty",domain:s+"domain",range:s+"range"},c={subClassOf:i+"subClassOf",subPropertyOf:i+"subPropertyOf"};function p(e,t){return Boolean(e.types.find((e=>e===t)))}const d=500;class u{async canDropOnCanvas(e,t){await f(d,t);const a=await this.typesOfElementsDraggedFrom(e,t);return t?.throwIfAborted(),a.length>0}async canDropOnElement(e,t,a){await f(d,a);const r=await this.possibleLinkTypes(e,t,a);return a?.throwIfAborted(),r.length>0}async possibleLinkTypes(e,t,a){function r(e,t){return void 0===t&&(t="out"),e.map((e=>({linkTypeIri:e,direction:t})))}return await f(d,a),p(e,l.class)&&p(t,l.class)?r([c.subClassOf]).concat(r([c.subClassOf],"in")):p(e,l.objectProperty)&&p(t,l.class)?r([l.domain,l.range]):p(t,l.objectProperty)&&p(e,l.class)?r([l.domain,l.range],"in"):p(e,l.objectProperty)&&p(t,l.objectProperty)?r([c.subPropertyOf]).concat(r([c.subPropertyOf],"in")):[]}async typesOfElementsDraggedFrom(e,t){return await f(d,t),p(e,l.class)?[l.class]:p(e,l.objectProperty)?[l.class,l.objectProperty]:[]}async propertiesForType(e,t){return await f(d,t),[]}async canDeleteElement(e,t){return await f(d,t),!0}async filterConstructibleTypes(e,t){await f(d,t);const a=new Set;return e.forEach((e=>{e.length%2==0&&a.add(e)})),a}async canEditElement(e,t){return await f(d,t),!0}async canLinkElement(e,t){return await f(d,t),!0}async canDeleteLink(e,t,a,r){return await f(d,r),!0}async canEditLink(e,t,a,r){return await f(d,r),!0}async generateNewElement(e,t){await f(d,t);const a=Math.floor(4294967296*(1+Math.random())).toString(16).substring(1);return{id:`${e[0]}_${a}`,types:[...e],label:[n.Rdf.DefaultDataFactory.literal("New Entity")],properties:{}}}}class y{async validate(e){const t=[];return e.target.types.indexOf(l.class)>=0&&e.state.links.forEach((a=>{a.before||a.after.sourceId!==e.target.id||(t.push({type:"link",target:a.after,message:"Cannot add any new link from a Class"}),t.push({type:"element",target:e.target.id,message:`Cannot create <${a.after.linkTypeId}> link from a Class`}))})),await f(d,e.signal),t}}async function f(e,t){return n.delay(e,{signal:t})}var w=a(66446),g=a(74848);const h=n.defineLayoutWorker((()=>new Worker(new URL(a.p+a.u(64589),a.b))));function m(){const{defaultLayout:e}=n.useWorker(h),[t,a]=r.useState({type:"url",url:"https://raw.githubusercontent.com/reactodia/reactodia-workspace/master/examples/resources/orgOntology.ttl"}),{onMount:s}=n.useLoadedWorkspace((async e=>{let{context:a,signal:r}=e;const{model:s}=a;let i;if("url"===t.type){const e=await fetch(t.url,{signal:r});i=await e.text()}else i=t.data;const l=new n.RdfDataProvider;try{l.addGraph((new o.A).parse(i))}catch(c){throw new Error("Error parsing RDF graph data",{cause:c})}await s.importLayout({dataProvider:l,signal:r})}),[t]),[i]=r.useState((()=>new u)),[l]=r.useState((()=>new y)),c=r.useCallback((e=>{let t=0;for(const r of e.properties)t=Math.max(t,r.length);const a=e.properties.map((e=>({propertyIri:e,score:1-e.length/t})));return n.delay(300).then((()=>a))}),[]);return(0,g.jsx)(n.Workspace,{ref:s,defaultLayout:e,metadataApi:i,validationApi:l,typeStyleResolver:n.SemanticTypeStyles,groupBy:[{linkType:"http://www.w3.org/1999/02/22-rdf-syntax-ns#type",linkDirection:"in"}],onIriClick:e=>{let{iri:t}=e;return window.open(t)},children:(0,g.jsx)(n.DefaultWorkspace,{canvas:{elementTemplateResolver:e=>0===e.length?n.GroupTemplate:e.includes("http://www.w3.org/2002/07/owl#DatatypeProperty")?n.ClassicTemplate:void 0,linkTemplateResolver:e=>"http://www.w3.org/2000/01/rdf-schema#subClassOf"===e?{...n.DefaultLinkTemplate,editableLabel:x}:n.OntologyLinkTemplates(e)},connectionsMenu:{suggestProperties:c},toolbar:{menu:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(k,{onOpen:a}),(0,g.jsx)(w.j,{})]})}})})}const b="urn:example:custom-link-label",x={getLabel:e=>{const{linkState:t}=e;if(t&&Object.prototype.hasOwnProperty.call(t,b)){const e=t[b];if("string"==typeof e)return e}},setLabel:(e,t)=>{e.setLinkState({...e.linkState,[b]:0===t.length?void 0:t})}};function k(e){const{onOpen:t}=e;return(0,g.jsx)(n.ToolbarActionOpen,{fileAccept:".ttl",onSelect:async e=>{const a=await e.text();t({type:"data",data:a})},children:"Load RDF (Turtle) data"})}},99249:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var r=a(78478),n=a(41217),o=a(1848),s=a(74848);function i(){return(0,s.jsx)(n.A,{title:"Example: RDF",noFooter:!0,children:(0,s.jsx)(r.A,{children:()=>{const{RdfExample:e}=a(96468);return(0,s.jsx)(o.U,{fullSize:!0,children:(0,s.jsx)(e,{})})}})})}}}]);