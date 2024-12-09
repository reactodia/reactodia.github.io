"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[80732],{1848:(e,t,o)=>{o.d(t,{U:()=>i});var r=o(34164),n=(o(96540),o(78478));const a={inline:"inline_KKeb",fullSize:"fullSize_xfsN"};var s=o(74848);function i(e){const{fullSize:t,height:o,children:i}=e,l={"--inline-reactodia-height":t?"auto":o};return(0,s.jsx)("div",{className:(0,r.A)(t?a.fullSize:a.inline),style:l,children:(0,s.jsx)(n.A,{children:()=>(0,s.jsx)(s.Fragment,{children:i})})})}},62424:(e,t,o)=>{o.d(t,{V:()=>c});var r,n=o(96540),a=o(28774);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)({}).hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},s.apply(null,arguments)}const i=e=>{let{title:t,titleId:o,...a}=e;return n.createElement("svg",s({width:16,height:16,viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor","aria-labelledby":o},a),t?n.createElement("title",{id:o},t):null,r||(r=n.createElement("path",{d:"M4.708 5.578 2.061 8.224l2.647 2.646-.708.708-3-3V7.87l3-3 .708.708zm7-.708L11 5.578l2.647 2.646L11 10.87l.708.708 3-3V7.87l-3-3zM4.908 13l.894.448 5-10L9.908 3l-5 10z"})))},l={viewSource:"viewSource_fiKn",label:"label_vLkb"};var d=o(74848);function c(e){const{target:t}=e;return(0,d.jsxs)(a.A,{className:l.viewSource,to:t,title:"View source code for the playground page",children:[(0,d.jsx)(i,{width:24,height:24}),(0,d.jsx)("span",{className:l.label,children:"View Source"})]})}},66446:(e,t,o)=>{o.d(t,{j:()=>s});o(96540);var r=o(19738),n=o(4213),a=o(74848);function s(){const{model:e,editor:t,overlay:o}=r.useWorkspace();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.ToolbarActionOpen,{fileAccept:".json",onSelect:async t=>{const n=new Map;for(const o of e.elements)for(const e of r.iterateEntitiesOf(o))n.set(e.id,e);const a=o.startTask({title:"Importing a layout from file"});try{const o=await t.text(),r=JSON.parse(o);await e.importLayout({dataProvider:e.dataProvider,diagram:r,preloadedElements:n,validateLinks:!0})}catch(s){a.setError(new Error("Failed to load specified file with a diagram layout.",{cause:s}))}finally{a.end()}},children:"Open diagram from file"}),(0,a.jsx)(r.ToolbarActionSave,{mode:"layout",onSelect:()=>{const t=e.exportLayout(),o=JSON.stringify(t),r=new Blob([o],{type:"application/json"}),a=(new Date).toISOString().replaceAll(/[Z\s:-]/g,"");(0,n.saveAs)(r,`reactodia-diagram-${a}.json`)},children:"Save diagram to file"}),t.inAuthoringMode?(0,a.jsx)(r.ToolbarActionSave,{mode:"authoring",onSelect:()=>{const e=t.authoringState;console.log("Authoring state:",e),alert("Please check browser console for result")},children:"Persist changes to data"}):null,(0,a.jsx)(r.ToolbarActionClearAll,{}),(0,a.jsx)(r.ToolbarActionExport,{kind:"exportRaster"}),(0,a.jsx)(r.ToolbarActionExport,{kind:"exportSvg"}),(0,a.jsx)(r.ToolbarActionExport,{kind:"print"})]})}},95216:(e,t,o)=>{o.r(t),o.d(t,{PlaygroundStressTest:()=>i});o(96540);var r=o(19738),n=o(66446),a=o(74848);const s=r.defineLayoutWorker((()=>new Worker(new URL(o.p+o.u(76494),o.b))));function i(e){const{nodeCount:t=500,edgesPerNode:o=2}=e,{defaultLayout:i}=r.useWorker(s),{onMount:l}=r.useLoadedWorkspace((async e=>{let{context:n,signal:a}=e;const{model:s,view:i}=n,l=new r.RdfDataProvider,[d,c]=function(e,t,o){const r=o.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),n=o.namedNode("http://www.w3.org/2000/01/rdf-schema#label"),a=o.namedNode("urn:test:Node"),s=o.namedNode("urn:test:link"),i=e=>o.namedNode(`urn:test:n:${e}`),l=[],d=[];for(let c=0;c<e;c++){const e=i(c);l.push(e.value),d.push(o.quad(e,r,a),o.quad(e,n,o.literal(`Node ${c}`)));for(let r=0;r<t;r++){const t=c-r-1;t>=0&&d.push(o.quad(e,s,i(t)))}}return[d,l]}(t,o,l.factory);l.addGraph(d),await s.importLayout({dataProvider:l,signal:a});const u=Math.floor(Math.sqrt(c.length)),h=s.history.startBatch();for(let t=0;t<c.length;t++){const e=c[t],o=t%u*200,n=100*Math.floor(t/u);s.addElement(new r.EntityElement({id:`n:${t}`,data:r.EntityElement.placeholderData(e),position:{x:o,y:n}}))}h.store(),await Promise.all([s.requestElementData(c),s.requestLinks()]),s.history.reset();const f=i.findAnyCanvas();f&&(f.renderingState.syncUpdate(),f.zoomToFit())}),[]);return(0,a.jsx)(r.Workspace,{ref:l,defaultLayout:i,children:(0,a.jsx)(r.DefaultWorkspace,{menu:(0,a.jsx)(n.j,{}),search:null,navigator:{expanded:!1}})})}},99983:(e,t,o)=>{o.r(t),o.d(t,{default:()=>l});var r=o(78478),n=o(41217),a=o(1848),s=o(62424),i=o(74848);function l(){return(0,i.jsxs)(n.A,{title:"Playground: Stress Test",noFooter:!0,children:[(0,i.jsx)(r.A,{children:()=>{const{PlaygroundStressTest:e}=o(95216),t=new URLSearchParams(document.location.search),r=t.has("node-count")?Number(t.get("node-count")):NaN,n=t.has("edges-per-node")?Number(t.get("edges-per-node")):NaN;return(0,i.jsx)(a.U,{fullSize:!0,children:(0,i.jsx)(e,{nodeCount:Number.isFinite(r)?r:void 0,edgesPerNode:Number.isFinite(n)?n:void 0})})}}),(0,i.jsx)(s.V,{target:"/docs/examples/stress-test"})]})}}}]);