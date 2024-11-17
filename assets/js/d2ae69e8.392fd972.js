"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[14219],{585:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>m,contentTitle:()=>d,default:()=>f,frontMatter:()=>c,metadata:()=>p,toc:()=>u});var t=n(74848),a=n(28453),o=n(92147);n(28774);const i="import * as React from 'react';\r\nimport * as Reactodia from '@reactodia/workspace';\r\nimport * as N3 from 'n3';\r\n\r\nimport { ExampleMetadataApi, ExampleValidationApi } from './ExampleMetadataApi';\r\nimport { ExampleToolbarMenu } from './ExampleCommon';\r\n\r\nconst Layouts = Reactodia.defineLayoutWorker(() => new Worker(\r\n  new URL('@reactodia/workspace/layout.worker', import.meta.url)\r\n));\r\n\r\ntype TurtleDataSource =\r\n  | { type: 'url'; url: string }\r\n  | { type: 'data'; data: string };\r\n\r\nexport function RdfExample() {\r\n  const {defaultLayout} = Reactodia.useWorker(Layouts);\r\n\r\n  const [dataSource, setDataSource] = React.useState<TurtleDataSource>({\r\n    type: 'url',\r\n    url:\r\n      'https://raw.githubusercontent.com/reactodia/reactodia-workspace/' +\r\n      'master/examples/resources/orgOntology.ttl'\r\n  });\r\n\r\n  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {\r\n    const {model} = context;\r\n\r\n    let turtleData: string;\r\n    if (dataSource.type === 'url') {\r\n      const response = await fetch(dataSource.url, {signal});\r\n      turtleData = await response.text();\r\n    } else {\r\n      turtleData = dataSource.data;\r\n    }\r\n\r\n    const dataProvider = new Reactodia.RdfDataProvider();\r\n    try {\r\n      dataProvider.addGraph(new N3.Parser().parse(turtleData));\r\n    } catch (err) {\r\n      throw new Error('Error parsing RDF graph data', {cause: err});\r\n    }\r\n\r\n    await model.importLayout({dataProvider, signal});\r\n  }, [dataSource]);\r\n\r\n  const [metadataApi] = React.useState(() => new ExampleMetadataApi());\r\n  const [validationApi] = React.useState(() => new ExampleValidationApi());\r\n  const [renameLinkProvider] = React.useState(() => new RenameSubclassOfProvider());\r\n\r\n  const suggestProperties = React.useCallback<Reactodia.PropertySuggestionHandler>(params => {\r\n    let maxLength = 0;\r\n    for (const iri of params.properties) {\r\n      maxLength = Math.max(maxLength, iri.length);\r\n    }\r\n    const scores = params.properties.map((p): Reactodia.PropertyScore => ({\r\n      propertyIri: p,\r\n      score: 1 - p.length / maxLength,\r\n    }));\r\n    return Reactodia.delay(300).then(() => scores);\r\n  }, []);\r\n\r\n  return (\r\n    <Reactodia.Workspace ref={onMount}\r\n      defaultLayout={defaultLayout}\r\n      metadataApi={metadataApi}\r\n      validationApi={validationApi}\r\n      renameLinkProvider={renameLinkProvider}\r\n      typeStyleResolver={Reactodia.SemanticTypeStyles}\r\n      onIriClick={({iri}) => window.open(iri)}>\r\n      <Reactodia.DefaultWorkspace\r\n        canvas={{\r\n          elementTemplateResolver: types => {\r\n            if (types.includes('http://www.w3.org/2002/07/owl#DatatypeProperty')) {\r\n              return Reactodia.ClassicTemplate;\r\n            }\r\n            return undefined;\r\n          },\r\n          linkTemplateResolver: type => {\r\n            if (type === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {\r\n              return Reactodia.DefaultLinkTemplate;\r\n            }\r\n            return Reactodia.OntologyLinkTemplates(type);\r\n          },\r\n        }}\r\n        connectionsMenu={{suggestProperties}}\r\n        toolbar={{\r\n          menu: <>\r\n            <ToolbarActionOpenTurtleGraph onOpen={setDataSource} />\r\n            <ExampleToolbarMenu />\r\n          </>\r\n        }}\r\n      />\r\n    </Reactodia.Workspace>\r\n  );\r\n}\r\n\r\nclass RenameSubclassOfProvider extends Reactodia.RenameLinkToLinkStateProvider {\r\n  override canRename(link: Reactodia.Link): boolean {\r\n      return link.typeId === 'http://www.w3.org/2000/01/rdf-schema#subClassOf';\r\n  }\r\n}\r\n\r\ninterface ToolbarActionOpenTurtleGraphProps {\r\n  onOpen: (dataSource: TurtleDataSource) => void;\r\n}\r\n\r\nfunction ToolbarActionOpenTurtleGraph(props: ToolbarActionOpenTurtleGraphProps) {\r\n  const {onOpen} = props;\r\n  return (\r\n    <Reactodia.ToolbarActionOpen\r\n      fileAccept='.ttl'\r\n      onSelect={async file => {\r\n        const turtleText = await file.text();\r\n        onOpen({type: 'data', data: turtleText});\r\n      }}>\r\n      Load RDF (Turtle) data\r\n    </Reactodia.ToolbarActionOpen>\r\n  );\r\n}\r\n",s="import * as Reactodia from '@reactodia/workspace';\r\n\r\nconst OWL_PREFIX = 'http://www.w3.org/2002/07/owl#';\r\nconst RDFS_PREFIX = 'http://www.w3.org/2000/01/rdf-schema#';\r\n\r\nconst owl = {\r\n  class: OWL_PREFIX + 'Class' as Reactodia.ElementTypeIri,\r\n  objectProperty: OWL_PREFIX + 'ObjectProperty' as Reactodia.ElementTypeIri,\r\n  domain: OWL_PREFIX + 'domain' as Reactodia.LinkTypeIri,\r\n  range: OWL_PREFIX + 'range' as Reactodia.LinkTypeIri,\r\n};\r\nconst rdfs = {\r\n  subClassOf: RDFS_PREFIX + 'subClassOf' as Reactodia.LinkTypeIri,\r\n  subPropertyOf: RDFS_PREFIX + 'subPropertyOf' as Reactodia.LinkTypeIri,\r\n};\r\n\r\nfunction hasType(model: Reactodia.ElementModel, type: Reactodia.ElementTypeIri) {\r\n  return Boolean(model.types.find(t => t === type));\r\n}\r\n\r\nconst SIMULATED_DELAY: number = 500; /* ms */\r\n\r\nexport class ExampleMetadataApi implements Reactodia.MetadataApi {\r\n  async canDropOnCanvas(\r\n    source: Reactodia.ElementModel,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<boolean> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    const elementTypes = await this.typesOfElementsDraggedFrom(source, ct);\r\n    ct?.throwIfAborted();\r\n    return elementTypes.length > 0;\r\n  }\r\n\r\n  async canDropOnElement(\r\n    source: Reactodia.ElementModel,\r\n    target: Reactodia.ElementModel,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<boolean> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    const linkTypes = await this.possibleLinkTypes(source, target, ct);\r\n    ct?.throwIfAborted();\r\n    return linkTypes.length > 0;\r\n  }\r\n\r\n  async possibleLinkTypes(\r\n    source: Reactodia.ElementModel,\r\n    target: Reactodia.ElementModel,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<Reactodia.DirectedLinkType[]> {\r\n    function mapLinkTypes(\r\n      types: Reactodia.LinkTypeIri[],\r\n      direction: Reactodia.LinkDirection = 'out'\r\n    ): Reactodia.DirectedLinkType[] {\r\n      return types.map(linkTypeIri => ({ linkTypeIri, direction }));\r\n    }\r\n\r\n    await delay(SIMULATED_DELAY, ct);\r\n    if (hasType(source, owl.class) && hasType(target, owl.class)) {\r\n      return mapLinkTypes([rdfs.subClassOf]).concat(mapLinkTypes([rdfs.subClassOf], 'in'));\r\n    } else if (hasType(source, owl.objectProperty) && hasType(target, owl.class)) {\r\n      return mapLinkTypes([owl.domain, owl.range]);\r\n    } else if (hasType(target, owl.objectProperty) && hasType(source, owl.class)) {\r\n      return mapLinkTypes([owl.domain, owl.range], 'in');\r\n    } else if (hasType(source, owl.objectProperty) && hasType(target, owl.objectProperty)) {\r\n      return mapLinkTypes([rdfs.subPropertyOf]).concat(mapLinkTypes([rdfs.subPropertyOf], 'in'));\r\n    } else {\r\n      return [];\r\n    }\r\n  }\r\n\r\n  async typesOfElementsDraggedFrom(\r\n    source: Reactodia.ElementModel,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<Reactodia.ElementTypeIri[]> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    return (\r\n      hasType(source, owl.class) ? [owl.class] :\r\n        hasType(source, owl.objectProperty) ? [owl.class, owl.objectProperty] :\r\n          []\r\n    );\r\n  }\r\n\r\n  async propertiesForType(\r\n    type: Reactodia.ElementTypeIri,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<Reactodia.PropertyTypeIri[]> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    return [];\r\n  }\r\n\r\n  async canDeleteElement(\r\n    element: Reactodia.ElementModel,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<boolean> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    return true;\r\n  }\r\n\r\n  async filterConstructibleTypes(\r\n    types: ReadonlySet<Reactodia.ElementTypeIri>,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<ReadonlySet<Reactodia.ElementTypeIri>> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    const result = new Set<Reactodia.ElementTypeIri>();\r\n    types.forEach(type => {\r\n      if (type.length % 2 === 0) {\r\n        result.add(type);\r\n      }\r\n    });\r\n    return result;\r\n  }\r\n\r\n  async canEditElement(\r\n    element: Reactodia.ElementModel,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<boolean> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    return true;\r\n  }\r\n\r\n  async canLinkElement(\r\n    element: Reactodia.ElementModel,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<boolean> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    return true;\r\n  }\r\n\r\n  async canDeleteLink(\r\n    link: Reactodia.LinkModel,\r\n    source: Reactodia.ElementModel,\r\n    target: Reactodia.ElementModel,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<boolean> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    return true;\r\n  }\r\n\r\n  async canEditLink(\r\n    link: Reactodia.LinkModel,\r\n    source: Reactodia.ElementModel,\r\n    target: Reactodia.ElementModel,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<boolean> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    return true;\r\n  }\r\n\r\n  async generateNewElement(\r\n    types: ReadonlyArray<Reactodia.ElementTypeIri>,\r\n    ct: AbortSignal | undefined\r\n  ): Promise<Reactodia.ElementModel> {\r\n    await delay(SIMULATED_DELAY, ct);\r\n    const random32BitDigits = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);\r\n    return {\r\n      id: `${types[0]}_${random32BitDigits}` as Reactodia.ElementIri,\r\n      types: [...types],\r\n      label: [Reactodia.Rdf.DefaultDataFactory.literal('New Entity')],\r\n      properties: {},\r\n    };\r\n  }\r\n}\r\n\r\nexport class ExampleValidationApi implements Reactodia.ValidationApi {\r\n  async validate(event: Reactodia.ValidationEvent): Promise<Array<Reactodia.ElementError | Reactodia.LinkError>> {\r\n    const errors: Array<Reactodia.ElementError | Reactodia.LinkError> = [];\r\n    if (event.target.types.indexOf(owl.class) >= 0) {\r\n      event.state.links.forEach(e => {\r\n        if (!e.before && e.after.sourceId === event.target.id) {\r\n          errors.push({\r\n            type: 'link',\r\n            target: e.after,\r\n            message: 'Cannot add any new link from a Class',\r\n          });\r\n          errors.push({\r\n            type: 'element',\r\n            target: event.target.id,\r\n            message: `Cannot create <${e.after.linkTypeId}> link from a Class`,\r\n          });\r\n        }\r\n      });\r\n    }\r\n\r\n    await delay(SIMULATED_DELAY, event.signal);\r\n    return errors;\r\n  }\r\n}\r\n\r\nasync function delay(amountMs: number, ct: AbortSignal | undefined) {\r\n  return Reactodia.delay(amountMs, {signal: ct});\r\n}\r\n";var l=n(98576);const c={sidebar_position:3},d="RDF Graph Authoring",p={id:"examples/rdf",title:"RDF Graph Authoring",description:"Example demonstrating working with in-memory RDF data and graph authoring capabilities.",source:"@site/docs/examples/rdf.mdx",sourceDirName:"examples",slug:"/examples/rdf",permalink:"/docs/examples/rdf",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/examples/rdf.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docs",previous:{title:"Basic Workspace",permalink:"/docs/examples/basic"},next:{title:"Stress Test",permalink:"/docs/examples/stress-test"}},m={},u=[];function y(e){const r={a:"a",admonition:"admonition",h1:"h1",p:"p",...(0,a.R)(),...e.components},{Details:n}=r;return n||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"rdf-graph-authoring",children:"RDF Graph Authoring"}),"\n",(0,t.jsx)(r.p,{children:"Example demonstrating working with in-memory RDF data and graph authoring capabilities."}),"\n",(0,t.jsx)(r.admonition,{type:"tip",children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/live-demo/rdf",children:"\u25b6\ufe0e Open live demo"})})}),"\n","\n","\n",(0,t.jsx)(o.A,{language:"tsx",title:"/src/examples/ReactodiaRdf.tsx",showLineNumbers:!0,children:i}),"\n",(0,t.jsxs)(n,{children:[(0,t.jsx)("summary",{children:"ExampleMetadataApi.ts"}),(0,t.jsx)(o.A,{language:"tsx",title:"/src/examples/ExampleMetadataApi.ts",showLineNumbers:!0,children:s})]}),"\n",(0,t.jsxs)(n,{children:[(0,t.jsx)("summary",{children:"ExampleCommon.tsx"}),(0,t.jsx)(o.A,{language:"tsx",title:"/src/examples/ExampleCommon.tsx",showLineNumbers:!0,children:l})]})]})}function f(e={}){const{wrapper:r}={...(0,a.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(y,{...e})}):y(e)}},86871:(e,r,n)=>{n.r(r),n.d(r,{N3:()=>t});var t=n(48640)},71712:(e,r,n)=>{n.r(r),n.d(r,{Reactodia:()=>t});var t=n(19738)},51433:(e,r,n)=>{n.d(r,{A:()=>a});var t=n(96540);const a={React:t,...t,get Reactodia(){const{Reactodia:e}=n(71712);return e},get N3(){const{N3:e}=n(86871);return e},get Layouts(){const{Reactodia:e}=n(71712);return e.defineLayoutWorker((()=>new Worker(new URL(n.p+n.u(86970),n.b))))}}},98576:e=>{e.exports="import * as React from 'react';\r\nimport * as Reactodia from '@reactodia/workspace';\r\nimport { saveAs } from 'file-saver';\r\n\r\nexport function ExampleToolbarMenu() {\r\n  const {model, editor} = Reactodia.useWorkspace();\r\n  return (\r\n    <>\r\n      <Reactodia.ToolbarActionOpen\r\n        fileAccept='.json'\r\n        onSelect={async file => {\r\n          const preloadedElements = new Map<Reactodia.ElementIri, Reactodia.ElementModel>();\r\n          for (const element of model.elements) {\r\n            for (const data of Reactodia.iterateEntitiesOf(element)) {\r\n              preloadedElements.set(data.id, data);\r\n            }\r\n          }\r\n\r\n          const json = await file.text();\r\n          try {\r\n            const diagramLayout = JSON.parse(json);\r\n            await model.importLayout({\r\n              dataProvider: model.dataProvider,\r\n              diagram: diagramLayout,\r\n              preloadedElements,\r\n              validateLinks: true,\r\n            });\r\n          } catch (err) {\r\n            alert('Failed to load specified file with a diagram layout.');\r\n          }\r\n        }}>\r\n        Open diagram from file\r\n      </Reactodia.ToolbarActionOpen>\r\n      <Reactodia.ToolbarActionSave mode='layout'\r\n        onSelect={() => {\r\n          const diagramLayout = model.exportLayout();\r\n          const layoutString = JSON.stringify(diagramLayout);\r\n          const blob = new Blob([layoutString], {type: 'application/json'});\r\n          const timestamp = new Date().toISOString().replaceAll(/[Z\\s:-]/g, '');\r\n          saveAs(blob, `reactodia-diagram-${timestamp}.json`);\r\n        }}>\r\n        Save diagram to file\r\n      </Reactodia.ToolbarActionSave>\r\n      {editor.inAuthoringMode ? (\r\n        <Reactodia.ToolbarActionSave mode='authoring'\r\n          onSelect={() => {\r\n            const state = editor.authoringState;\r\n            console.log('Authoring state:', state);\r\n            alert('Please check browser console for result');\r\n          }}>\r\n          Persist changes to data\r\n        </Reactodia.ToolbarActionSave>\r\n      ) : null}\r\n      <Reactodia.ToolbarActionClearAll />\r\n      <Reactodia.ToolbarActionExport kind='exportRaster' />\r\n      <Reactodia.ToolbarActionExport kind='exportSvg' />\r\n      <Reactodia.ToolbarActionExport kind='print' />\r\n    </>\r\n  );\r\n}\r\n"}}]);