"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[22143],{84611:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=t(74848),r=t(28453);const a={title:"Dialog"},s="Dialog system",i={id:"components/dialog",title:"Dialog",description:"It is possible to show a dialog either attached to target element, link or as a modal over the canvas viewport itself.",source:"@site/docs/components/dialog.md",sourceDirName:"components",slug:"/components/dialog",permalink:"/docs/components/dialog",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/components/dialog.md",tags:[],version:"current",frontMatter:{title:"Dialog"},sidebar:"docs",previous:{title:"Connections Menu",permalink:"/docs/components/connections-menu"},next:{title:"Drop on Canvas",permalink:"/docs/components/drop-on-canvas"}},d={},c=[{value:"Example: a modal dialog over the viewport",id:"example-a-modal-dialog-over-the-viewport",level:3}];function l(e){const o={a:"a",code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.h1,{id:"dialog-system",children:"Dialog system"}),"\n",(0,n.jsxs)(o.p,{children:["It is possible to show a dialog either attached to target ",(0,n.jsx)(o.a,{href:"/docs/concepts/graph-model",children:"element"}),", ",(0,n.jsx)(o.a,{href:"/docs/concepts/graph-model",children:"link"})," or as a modal over the canvas viewport itself."]}),"\n",(0,n.jsxs)(o.p,{children:["The following methods and properties from ",(0,n.jsx)(o.a,{href:"/docs/api/workspace/classes/OverlayController",children:"OverlayController"})," (accessible from ",(0,n.jsx)(o.a,{href:"/docs/concepts/workspace-context",children:"workspace context"}),") provide means to interact with the dialogs:"]}),"\n",(0,n.jsxs)(o.table,{children:[(0,n.jsx)(o.thead,{children:(0,n.jsxs)(o.tr,{children:[(0,n.jsx)(o.th,{children:"Method or property"}),(0,n.jsx)(o.th,{children:"Description"})]})}),(0,n.jsxs)(o.tbody,{children:[(0,n.jsxs)(o.tr,{children:[(0,n.jsxs)(o.td,{children:[(0,n.jsx)(o.a,{href:"/docs/api/workspace/classes/OverlayController#showdialog",children:"showDialog()"})," method"]}),(0,n.jsx)(o.td,{children:"Opens a dialog with the specified style and content."})]}),(0,n.jsxs)(o.tr,{children:[(0,n.jsxs)(o.td,{children:[(0,n.jsx)(o.a,{href:"/docs/api/workspace/classes/OverlayController#hidedialog",children:"hideDialog()"})," method"]}),(0,n.jsx)(o.td,{children:"Hides a currently open dialog."})]}),(0,n.jsxs)(o.tr,{children:[(0,n.jsxs)(o.td,{children:[(0,n.jsx)(o.a,{href:"/docs/api/workspace/classes/OverlayController#openeddialog",children:"openedDialog"})," property"]}),(0,n.jsxs)(o.td,{children:["Can be used to read the state of the currently open dialog. ",(0,n.jsx)("br",{})," Has corresponding ",(0,n.jsx)(o.a,{href:"/docs/api/workspace/interfaces/OverlayControllerEvents",children:"changeOpenedDialog"})," event."]})]})]})]}),"\n",(0,n.jsx)(o.h3,{id:"example-a-modal-dialog-over-the-viewport",children:"Example: a modal dialog over the viewport"}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-tsx",metastring:"live",live:!0,children:"function Example() {\r\n  const {defaultLayout} = Reactodia.useWorker(Layouts);\r\n\r\n  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {\r\n      const {overlay} = context;\r\n      overlay.showDialog({\r\n        style: {\r\n          caption: 'Custom modal dialog',\r\n        },\r\n        content: (\r\n          <div className='reactodia-form'>\r\n            <div className='reactodia-form__body'>\r\n              <div>Custom dialog content</div>\r\n            </div>\r\n            <div className='reactodia-form__controls'>\r\n              <button className='reactodia-btn reactodia-btn-primary'\r\n                type='button'\r\n                onClick={() => overlay.hideDialog()}>\r\n                Close\r\n              </button>\r\n            </div>\r\n          </div>\r\n        ),\r\n      });\r\n  }, []);\r\n\r\n  return (\r\n    <div className='reactodia-live-editor'>\r\n      <Reactodia.Workspace ref={onMount}\r\n        defaultLayout={defaultLayout}>\r\n        <Reactodia.DefaultWorkspace />\r\n      </Reactodia.Workspace>\r\n    </div>\r\n  );\r\n}\n"})})]})}function h(e={}){const{wrapper:o}={...(0,r.R)(),...e.components};return o?(0,n.jsx)(o,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},28453:(e,o,t)=>{t.d(o,{R:()=>s,x:()=>i});var n=t(96540);const r={},a=n.createContext(r);function s(e){const o=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function i(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),n.createElement(a.Provider,{value:o},e.children)}}}]);