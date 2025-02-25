"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[14719],{29257:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var i=t(64922),s=t(16593);const o={},c="Halo and Selection",r={id:"components/selection",title:"Halo and Selection",description:"There are several canvas widget components which can be used to display actions on the selected diagram elements or links.",source:"@site/docs/components/selection.md",sourceDirName:"components",slug:"/components/selection",permalink:"/docs/components/selection",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/components/selection.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Navigator",permalink:"/docs/components/navigator"},next:{title:"Toolbar and menu",permalink:"/docs/components/toolbar"}},l={},d=[{value:"Selecting elements",id:"selecting-elements",level:2},{value:"Selecting links",id:"selecting-links",level:2},{value:"Styles",id:"styles",level:2}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"halo-and-selection",children:"Halo and Selection"}),"\n",(0,i.jsxs)(n.p,{children:["There are several ",(0,i.jsx)(n.a,{href:"/docs/components/canvas",children:"canvas widget"})," components which can be used to display actions on the selected diagram elements or links."]}),"\n",(0,i.jsx)(n.h2,{id:"selecting-elements",children:"Selecting elements"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/Halo",children:"Halo"})," widget allows selecting a single element to perform an element action on it."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/Selection",children:"Selection"})," widget allows selecting more than one element via rectangular selection box to move them together and perform an element action on them."]}),"\n",(0,i.jsx)(n.p,{children:"There are several built-in element actions that can be used:"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Action component"}),(0,i.jsx)(n.th,{children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/SelectionAction",children:"SelectionAction"})}),(0,i.jsx)(n.td,{children:"Base component to display a custom element action."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/SelectionActionSpinner",children:"SelectionActionSpinner"})}),(0,i.jsx)(n.td,{children:"Displays a loading spinner (useful as building block for other action components)."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/SelectionActionRemove",children:"SelectionActionRemove"})}),(0,i.jsxs)(n.td,{children:[(0,i.jsx)(n.a,{href:"/docs/api/workspace/classes/EditorController#removeitems",children:"Removes an element"})," from the diagram."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/SelectionActionZoomToFit",children:"SelectionActionZoomToFit"})}),(0,i.jsxs)(n.td,{children:["Zooms-in or zooms-out the viewport to ",(0,i.jsx)(n.a,{href:"/docs/api/workspace/interfaces/CanvasApi#zoomtofit",children:"fit"})," all selected elements."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/SelectionActionLayout",children:"SelectionActionLayout"})}),(0,i.jsx)(n.td,{children:"Performs graph layout algorithm on the sub-graph formed from the selected elements."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/ToolbarActionExport",children:"SelectionActionExpand"})}),(0,i.jsx)(n.td,{children:"Toggles expanded state for the selected elements."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/SelectionActionAnchor",children:"SelectionActionAnchor"})}),(0,i.jsx)(n.td,{children:"Displays a link to the entity IRI."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/SelectionActionConnections",children:"SelectionActionConnections"})}),(0,i.jsxs)(n.td,{children:["Opens the ",(0,i.jsx)(n.a,{href:"/docs/components/connections-menu",children:"connections menu"})," for the selected entities."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/SelectionActionAddToFilter",children:"SelectionActionAddToFilter"})}),(0,i.jsxs)(n.td,{children:["Adds the selected entity to the ",(0,i.jsx)(n.a,{href:"/docs/components/instances-search",children:"instances search"})," filter."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/SelectionActionGroup",children:"SelectionActionGroup"})}),(0,i.jsxs)(n.td,{children:[(0,i.jsx)(n.a,{href:"/docs/api/workspace/classes/DataDiagramModel#group",children:"Groups or ungroups"})," selected elements."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/SelectionActionEstablishLink",children:"SelectionActionEstablishLink"})}),(0,i.jsxs)(n.td,{children:["Starts ",(0,i.jsx)(n.a,{href:"/docs/concepts/graph-authoring",children:"creating a relation"})," to an existing or a new entity by dragging it."]})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"selecting-links",children:"Selecting links"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/HaloLink",children:"HaloLink"})," widget allows selecting a single link to perform a link action on it."]}),"\n",(0,i.jsx)(n.p,{children:"There are several built-in link actions that can be used:"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Action component"}),(0,i.jsx)(n.th,{children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/LinkAction",children:"LinkAction"})}),(0,i.jsxs)(n.td,{children:["Base component to display an action on the selected link. ",(0,i.jsx)("br",{}),(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/useLinkActionContext",children:"useLinkActionContext()"})," hook can be used to get additional context for the selected link, including path geometry."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/LinkActionSpinner",children:"LinkActionSpinner"})}),(0,i.jsx)(n.td,{children:"Displays a loading spinner (useful as building block for other action components)."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/LinkActionEdit",children:"LinkActionEdit"})}),(0,i.jsxs)(n.td,{children:["Starts ",(0,i.jsx)(n.a,{href:"/docs/concepts/graph-authoring",children:"editing the relation"}),"."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/LinkActionDelete",children:"LinkActionDelete"})}),(0,i.jsxs)(n.td,{children:["Deletes ",(0,i.jsx)(n.a,{href:"/docs/concepts/graph-authoring",children:"the relation"}),"."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/LinkActionMoveEndpoint",children:"LinkActionMoveEndpoint"})}),(0,i.jsxs)(n.td,{children:["Displays a handle which allows to ",(0,i.jsx)(n.a,{href:"/docs/concepts/graph-authoring",children:"change the relation"})," by moving its endpoint (source or target) to another entity."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"/docs/api/workspace/functions/LinkActionRename",children:"LinkActionRename"})}),(0,i.jsxs)(n.td,{children:["Starts ",(0,i.jsx)(n.a,{href:"/docs/api/workspace/interfaces/RenameLinkProvider",children:"renaming a link"})," (change the label on the diagram only)."]})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"styles",children:"Styles"}),"\n",(0,i.jsxs)(n.p,{children:["The component look can be customized using the following CSS properties (see ",(0,i.jsx)(n.a,{href:"/docs/concepts/design-system",children:"design system"})," for more information):"]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Property"}),(0,i.jsx)(n.th,{children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"--reactodia-selection-icon-filter"})}),(0,i.jsxs)(n.td,{children:[(0,i.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/filter",children:"CSS filter"})," for the element selection action icons."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"--reactodia-selection-multiple-box-shadow"})}),(0,i.jsx)(n.td,{children:"Box shadow for the selection rectangle with multiple elements."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"--reactodia-selection-single-box-shadow"})}),(0,i.jsx)(n.td,{children:"Box shadow for the selection rectangle with a single element."})]})]})]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},16593:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>r});var i=t(77810);const s={},o=i.createContext(s);function c(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);