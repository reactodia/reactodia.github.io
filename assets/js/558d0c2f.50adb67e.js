"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[402],{1848:(e,t,o)=>{o.d(t,{U:()=>s});var a=o(34164),n=(o(96540),o(78478));const r={inline:"inline_KKeb",fullSize:"fullSize_xfsN"};var i=o(74848);function s(e){const{fullSize:t,height:o,children:s}=e,l={"--inline-reactodia-height":t?"auto":o};return(0,i.jsx)("div",{className:(0,a.A)(t?r.fullSize:r.inline),style:l,children:(0,i.jsx)(n.A,{children:()=>(0,i.jsx)(i.Fragment,{children:s})})})}},66446:(e,t,o)=>{o.d(t,{j:()=>i});o(96540);var a=o(19738),n=o(4213),r=o(74848);function i(){const{model:e,editor:t}=a.useWorkspace();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.ToolbarActionOpen,{fileAccept:".json",onSelect:async t=>{const o=new Map;for(const i of e.elements)for(const e of a.iterateEntitiesOf(i))o.set(e.id,e);const n=await t.text();try{const t=JSON.parse(n);await e.importLayout({dataProvider:e.dataProvider,diagram:t,preloadedElements:o,validateLinks:!0})}catch(r){alert("Failed to load specified file with a diagram layout.")}},children:"Open diagram from file"}),(0,r.jsx)(a.ToolbarActionSave,{mode:"layout",onSelect:()=>{const t=e.exportLayout(),o=JSON.stringify(t),a=new Blob([o],{type:"application/json"}),r=(new Date).toISOString().replaceAll(/[Z\s:-]/g,"");(0,n.saveAs)(a,`reactodia-diagram-${r}.json`)},children:"Save diagram to file"}),t.inAuthoringMode?(0,r.jsx)(a.ToolbarActionSave,{mode:"authoring",onSelect:()=>{const e=t.authoringState;console.log("Authoring state:",e),alert("Please check browser console for result")},children:"Persist changes to data"}):null,(0,r.jsx)(a.ToolbarActionClearAll,{}),(0,r.jsx)(a.ToolbarActionExport,{kind:"exportRaster"}),(0,r.jsx)(a.ToolbarActionExport,{kind:"exportSvg"}),(0,r.jsx)(a.ToolbarActionExport,{kind:"print"})]})}},2129:(e,t,o)=>{o.r(t),o.d(t,{StressTestExample:()=>s});o(96540);var a=o(19738),n=o(66446),r=o(74848);const i=a.defineLayoutWorker((()=>new Worker(new URL(o.p+o.u(31732),o.b))));function s(e){const{nodeCount:t=500,edgesPerNode:o=2}=e,{defaultLayout:s}=a.useWorker(i),{onMount:l}=a.useLoadedWorkspace((async e=>{let{context:n,signal:r}=e;const{model:i,view:s}=n,l=new a.RdfDataProvider,[d,c]=function(e,t,o){const a=o.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),n=o.namedNode("http://www.w3.org/2000/01/rdf-schema#label"),r=o.namedNode("urn:test:Node"),i=o.namedNode("urn:test:link"),s=e=>o.namedNode(`urn:test:n:${e}`),l=[],d=[];for(let c=0;c<e;c++){const e=s(c);l.push(e.value),d.push(o.quad(e,a,r),o.quad(e,n,o.literal(`Node ${c}`)));for(let a=0;a<t;a++){const t=c-a-1;t>=0&&d.push(o.quad(e,i,s(t)))}}return[d,l]}(t,o,l.factory);l.addGraph(d),await i.importLayout({dataProvider:l,signal:r});const u=Math.floor(Math.sqrt(c.length)),h=i.history.startBatch();for(let t=0;t<c.length;t++){const e=c[t],o=t%u*200,n=100*Math.floor(t/u);i.addElement(new a.EntityElement({id:`n:${t}`,data:a.EntityElement.placeholderData(e),position:{x:o,y:n}}))}h.store(),await Promise.all([i.requestElementData(c),i.requestLinks()]),i.history.reset();const p=s.findAnyCanvas();p&&(p.renderingState.syncUpdate(),p.zoomToFit())}),[]);return(0,r.jsx)(a.Workspace,{ref:l,defaultLayout:s,children:(0,r.jsx)(a.DefaultWorkspace,{leftColumn:{defaultCollapsed:!0},toolbar:{menu:(0,r.jsx)(n.j,{})},navigator:{expanded:!1}})})}},85764:(e,t,o)=>{o.r(t),o.d(t,{default:()=>s});var a=o(78478),n=o(41217),r=o(1848),i=o(74848);function s(){return(0,i.jsx)(n.A,{title:"Example: Stress Test",noFooter:!0,children:(0,i.jsx)(a.A,{children:()=>{const{StressTestExample:e}=o(2129),t=new URLSearchParams(document.location.search),a=t.has("node-count")?Number(t.get("node-count")):NaN,n=t.has("edges-per-node")?Number(t.get("edges-per-node")):NaN;return(0,i.jsx)(r.U,{fullSize:!0,children:(0,i.jsx)(e,{nodeCount:Number.isFinite(a)?a:void 0,edgesPerNode:Number.isFinite(n)?n:void 0})})}})})}}}]);