"use strict";(self.webpackChunk_reactodia_reactodia_github_io=self.webpackChunk_reactodia_reactodia_github_io||[]).push([[67514],{23197:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>y,contentTitle:()=>c,default:()=>g,frontMatter:()=>d,metadata:()=>p,toc:()=>m});var t=n(64922),a=n(16593),o=n(20509);n(43946);const i="import * as React from 'react';\r\nimport * as Reactodia from '@reactodia/workspace';\r\nimport * as N3 from 'n3';\r\n\r\nimport { ExampleMetadataProvider, ExampleValidationProvider } from './ExampleMetadata';\r\nimport { ExampleToolbarMenu } from './ExampleCommon';\r\n\r\nconst Layouts = Reactodia.defineLayoutWorker(() => new Worker(\r\n  new URL('@reactodia/workspace/layout.worker', import.meta.url)\r\n));\r\n\r\ntype TurtleDataSource =\r\n  | { type: 'url'; url: string }\r\n  | { type: 'data'; data: string };\r\n\r\nexport function PlaygroundGraphAuthoring() {\r\n  const {defaultLayout} = Reactodia.useWorker(Layouts);\r\n\r\n  const [dataSource, setDataSource] = React.useState<TurtleDataSource>({\r\n    type: 'url',\r\n    url: 'https://reactodia.github.io/resources/orgOntology.ttl',\r\n  });\r\n  const [searchCommands] = React.useState(() =>\r\n    new Reactodia.EventSource<Reactodia.UnifiedSearchCommands>\r\n  );\r\n\r\n  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {\r\n    const {model, editor, performLayout} = context;\r\n    editor.setAuthoringMode(true);\r\n\r\n    let turtleData: string;\r\n    if (dataSource.type === 'url') {\r\n      const response = await fetch(dataSource.url, {signal});\r\n      turtleData = await response.text();\r\n    } else {\r\n      turtleData = dataSource.data;\r\n    }\r\n\r\n    const dataProvider = new Reactodia.RdfDataProvider();\r\n    try {\r\n      dataProvider.addGraph(new N3.Parser().parse(turtleData));\r\n    } catch (err) {\r\n      throw new Error('Error parsing RDF graph data', {cause: err});\r\n    }\r\n\r\n    await model.importLayout({dataProvider, signal});\r\n\r\n    if (dataSource.type === 'url') {\r\n      const elements = [\r\n        model.createElement('http://www.w3.org/ns/org#Organization'),\r\n        model.createElement('http://www.w3.org/ns/org#FormalOrganization'),\r\n        model.createElement('http://www.w3.org/ns/org#hasMember'),\r\n        model.createElement('http://www.w3.org/ns/org#hasSubOrganization'),\r\n        model.createElement('http://www.w3.org/ns/org#subOrganizationOf'),\r\n        model.createElement('http://www.w3.org/ns/org#unitOf'),\r\n      ];\r\n      model.history.execute(Reactodia.setElementExpanded(elements[0], true));\r\n      await Promise.all([\r\n        model.requestElementData(elements.map(el => el.iri)),\r\n        model.requestLinks(),\r\n      ]);\r\n      await performLayout({signal});\r\n    } else {\r\n      searchCommands.trigger('focus', {sectionKey: 'elementTypes'});\r\n    }\r\n  }, [dataSource]);\r\n\r\n  const [metadataProvider] = React.useState(() => new ExampleMetadataProvider());\r\n  const [validationProvider] = React.useState(() => new ExampleValidationProvider());\r\n  const [renameLinkProvider] = React.useState(() => new RenameSubclassOfProvider());\r\n\r\n  return (\r\n    <Reactodia.Workspace ref={onMount}\r\n      defaultLayout={defaultLayout}\r\n      metadataProvider={metadataProvider}\r\n      validationProvider={validationProvider}\r\n      renameLinkProvider={renameLinkProvider}\r\n      typeStyleResolver={Reactodia.SemanticTypeStyles}\r\n      onIriClick={({iri}) => window.open(iri)}>\r\n      <Reactodia.DefaultWorkspace\r\n        canvas={{\r\n          linkTemplateResolver: type => {\r\n            if (type === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {\r\n              return Reactodia.DefaultLinkTemplate;\r\n            }\r\n            return Reactodia.OntologyLinkTemplates(type);\r\n          },\r\n        }}\r\n        menu={\r\n          <>\r\n            <ToolbarActionOpenTurtleGraph onOpen={setDataSource} />\r\n            <ExampleToolbarMenu />\r\n          </>\r\n        }\r\n        searchCommands={searchCommands}\r\n      />\r\n    </Reactodia.Workspace>\r\n  );\r\n}\r\n\r\nclass RenameSubclassOfProvider extends Reactodia.RenameLinkToLinkStateProvider {\r\n  override canRename(link: Reactodia.Link): boolean {\r\n      return link.typeId === 'http://www.w3.org/2000/01/rdf-schema#subClassOf';\r\n  }\r\n}\r\n\r\nfunction ToolbarActionOpenTurtleGraph(props: {\r\n  onOpen: (dataSource: TurtleDataSource) => void;\r\n}) {\r\n  const {onOpen} = props;\r\n  return (\r\n    <Reactodia.ToolbarActionOpen\r\n      fileAccept='.ttl'\r\n      onSelect={async file => {\r\n        const turtleText = await file.text();\r\n        onOpen({type: 'data', data: turtleText});\r\n      }}>\r\n      Load RDF (Turtle) data\r\n    </Reactodia.ToolbarActionOpen>\r\n  );\r\n}\r\n";var s=n(43558),l=n(98576);const d={sidebar_position:4},c="Graph Authoring",p={id:"examples/graph-authoring",title:"Graph Authoring",description:"Example demonstrating visual graph authoring capabilities on in-memory RDF graph data.",source:"@site/docs/examples/graph-authoring.mdx",sourceDirName:"examples",slug:"/examples/graph-authoring",permalink:"/docs/examples/graph-authoring",draft:!1,unlisted:!1,editUrl:"https://github.com/reactodia/reactodia.github.io/tree/main/docs/examples/graph-authoring.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docs",previous:{title:"Graph Authoring",permalink:"/docs/examples/rdf-explorer"},next:{title:"SPARQL Navigator",permalink:"/docs/examples/sparql"}},y={},m=[];function u(e){const r={a:"a",admonition:"admonition",h1:"h1",p:"p",...(0,a.R)(),...e.components},{Details:n}=r;return n||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"graph-authoring",children:"Graph Authoring"}),"\n",(0,t.jsxs)(r.p,{children:["Example demonstrating ",(0,t.jsx)(r.a,{href:"/docs/concepts/graph-authoring",children:"visual graph authoring"})," capabilities on in-memory RDF graph data."]}),"\n",(0,t.jsx)(r.admonition,{type:"tip",children:(0,t.jsx)(r.p,{children:(0,t.jsx)(r.a,{href:"/playground/graph-authoring",children:"\u25b6\ufe0e Open live demo"})})}),"\n","\n","\n",(0,t.jsx)(o.A,{language:"tsx",title:"/src/examples/PlaygroundGraphAuthoring.tsx",showLineNumbers:!0,children:i}),"\n",(0,t.jsxs)(n,{children:[(0,t.jsx)("summary",{children:"ExampleMetadata.ts"}),(0,t.jsx)(o.A,{language:"tsx",title:"/src/examples/ExampleMetadata.ts",showLineNumbers:!0,children:s})]}),"\n",(0,t.jsxs)(n,{children:[(0,t.jsx)("summary",{children:"ExampleCommon.tsx"}),(0,t.jsx)(o.A,{language:"tsx",title:"/src/examples/ExampleCommon.tsx",showLineNumbers:!0,children:l})]})]})}function g(e={}){const{wrapper:r}={...(0,a.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},90211:(e,r,n)=>{n.r(r),n.d(r,{N3:()=>t});var t=n(91053)},11340:(e,r,n)=>{n.r(r),n.d(r,{Reactodia:()=>t});var t=n(22334)},64685:(e,r,n)=>{n.d(r,{A:()=>a});var t=n(77810);const a={React:t,...t,get Reactodia(){const{Reactodia:e}=n(11340);return e},get N3(){const{N3:e}=n(90211);return e},get Layouts(){const{Reactodia:e}=n(11340);return e.defineLayoutWorker((()=>new Worker(new URL(n.p+n.u(5039),n.b))))}}},98576:e=>{e.exports="import * as React from 'react';\r\nimport * as Reactodia from '@reactodia/workspace';\r\nimport { saveAs } from 'file-saver';\r\n\r\nexport function ExampleToolbarMenu() {\r\n  const {model, editor, overlay} = Reactodia.useWorkspace();\r\n  return (\r\n    <>\r\n      <Reactodia.ToolbarActionOpen\r\n        fileAccept='.json'\r\n        onSelect={async file => {\r\n          const preloadedElements = new Map<Reactodia.ElementIri, Reactodia.ElementModel>();\r\n          for (const element of model.elements) {\r\n            for (const data of Reactodia.iterateEntitiesOf(element)) {\r\n              preloadedElements.set(data.id, data);\r\n            }\r\n          }\r\n\r\n          const task = overlay.startTask({title: 'Importing a layout from file'});\r\n          try {\r\n            const json = await file.text();\r\n            const diagramLayout = JSON.parse(json);\r\n            await model.importLayout({\r\n              dataProvider: model.dataProvider,\r\n              diagram: diagramLayout,\r\n              preloadedElements,\r\n              validateLinks: true,\r\n            });\r\n          } catch (err) {\r\n            task.setError(new Error(\r\n              'Failed to load specified file with a diagram layout.',\r\n              {cause: err}\r\n            ));\r\n          } finally {\r\n            task.end();\r\n          }\r\n        }}>\r\n        Open diagram from file\r\n      </Reactodia.ToolbarActionOpen>\r\n      <Reactodia.ToolbarActionSave mode='layout'\r\n        onSelect={() => {\r\n          const diagramLayout = model.exportLayout();\r\n          const layoutString = JSON.stringify(diagramLayout);\r\n          const blob = new Blob([layoutString], {type: 'application/json'});\r\n          const timestamp = new Date().toISOString().replaceAll(/[Z\\s:-]/g, '');\r\n          saveAs(blob, `reactodia-diagram-${timestamp}.json`);\r\n        }}>\r\n        Save diagram to file\r\n      </Reactodia.ToolbarActionSave>\r\n      {editor.inAuthoringMode ? (\r\n        <Reactodia.ToolbarActionSave mode='authoring'\r\n          onSelect={() => {\r\n            const state = editor.authoringState;\r\n            console.log('Authoring state:', state);\r\n            alert('Please check browser console for result');\r\n          }}>\r\n          Persist changes to data\r\n        </Reactodia.ToolbarActionSave>\r\n      ) : null}\r\n      <Reactodia.ToolbarActionClearAll />\r\n      <Reactodia.ToolbarActionExport kind='exportRaster' />\r\n      <Reactodia.ToolbarActionExport kind='exportSvg' />\r\n      <Reactodia.ToolbarActionExport kind='print' />\r\n    </>\r\n  );\r\n}\r\n"},43558:e=>{e.exports="import * as Reactodia from '@reactodia/workspace';\r\n\r\nconst owl = vocabulary('http://www.w3.org/2002/07/owl#', [\r\n  'Class',\r\n  'AnnotationProperty',\r\n  'DatatypeProperty',\r\n  'ObjectProperty',\r\n]);\r\n\r\nconst rdfs = vocabulary('http://www.w3.org/2000/01/rdf-schema#', [\r\n  'comment',\r\n  'domain',\r\n  'range',\r\n  'seeAlso',\r\n  'subClassOf',\r\n  'subPropertyOf',\r\n]);\r\n\r\nconst SIMULATED_DELAY: number = 200; /* ms */\r\n\r\nexport class ExampleMetadataProvider implements Reactodia.MetadataProvider {\r\n  private readonly propertyTypes = [owl.AnnotationProperty, owl.DatatypeProperty, owl.ObjectProperty];\r\n  private readonly editableTypes = new Set([owl.Class, ...this.propertyTypes]);\r\n  private readonly literalLanguages: ReadonlyArray<string> = ['de', 'en', 'es', 'ru', 'zh'];\r\n\r\n  getLiteralLanguages(): ReadonlyArray<string> {\r\n    return this.literalLanguages;\r\n  }\r\n\r\n  async createEntity(\r\n    type: Reactodia.ElementTypeIri,\r\n    options: { readonly signal?: AbortSignal }\r\n  ): Promise<Reactodia.ElementModel> {\r\n    await Reactodia.delay(SIMULATED_DELAY, {signal: options.signal});\r\n    const random32BitDigits = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);\r\n    const typeLabel = Reactodia.Rdf.getLocalName(type) ?? 'Entity';\r\n    return {\r\n      id: `${type}_${random32BitDigits}` as Reactodia.ElementIri,\r\n      types: [type],\r\n      label: [Reactodia.Rdf.DefaultDataFactory.literal(`New ${typeLabel}`)],\r\n      properties: {},\r\n    };\r\n  }\r\n\r\n  async createRelation(\r\n    source: Reactodia.ElementModel,\r\n    target: Reactodia.ElementModel,\r\n    linkType: Reactodia.LinkTypeIri,\r\n    options: { readonly signal?: AbortSignal }\r\n  ): Promise<Reactodia.LinkModel> {\r\n    await Reactodia.delay(SIMULATED_DELAY, {signal: options.signal});\r\n    return {\r\n      sourceId: source.id,\r\n      targetId: target.id,\r\n      linkTypeId: linkType,\r\n      properties: {},\r\n    };\r\n  }\r\n\r\n  async canConnect(\r\n    source: Reactodia.ElementModel,\r\n    target: Reactodia.ElementModel | undefined,\r\n    linkType: Reactodia.LinkTypeIri | undefined,\r\n    options: { readonly signal?: AbortSignal }\r\n  ): Promise<Reactodia.MetadataCanConnect[]> {\r\n    await Reactodia.delay(SIMULATED_DELAY, {signal: options.signal});\r\n\r\n    const connections: Reactodia.MetadataCanConnect[] = [];\r\n    const addConnections = (\r\n      types: readonly Reactodia.ElementTypeIri[],\r\n      allOutLinks: readonly Reactodia.LinkTypeIri[],\r\n      allInLinks: readonly Reactodia.LinkTypeIri[]\r\n    ) => {\r\n      const outLinks = linkType\r\n        ? allOutLinks.filter(type => type === linkType)\r\n        : allOutLinks;\r\n      const inLinks = linkType\r\n        ? allInLinks.filter(type => type === linkType)\r\n        : allInLinks;\r\n      if (types.length > 0 && (outLinks.length > 0 || inLinks.length > 0)) {\r\n        connections.push({ targetTypes: new Set(types), outLinks, inLinks });\r\n      }\r\n    };\r\n\r\n    if (hasType(source, owl.Class)) {\r\n      if (hasType(target, owl.Class)) {\r\n        addConnections([owl.Class], [rdfs.subClassOf], [rdfs.subClassOf]);\r\n      }\r\n\r\n      const targetPropertyTypes = this.propertyTypes.filter(type => hasType(target, type));\r\n      if (targetPropertyTypes.length > 0) {\r\n        addConnections(targetPropertyTypes, [], [rdfs.domain, rdfs.range]);\r\n      }\r\n    }\r\n\r\n    const sourcePropertyTypes = this.propertyTypes.filter(type => hasType(source, type));\r\n    if (sourcePropertyTypes.length > 0) {\r\n      for (const type of sourcePropertyTypes) {\r\n        if (hasType(target, type)) {\r\n          addConnections([type], [rdfs.subPropertyOf], [rdfs.subPropertyOf]);\r\n        }\r\n      }\r\n\r\n      if (hasType(target, owl.Class)) {\r\n        addConnections([owl.Class], [rdfs.domain, rdfs.range], []);\r\n      }\r\n    }\r\n\r\n    return connections;\r\n  }\r\n\r\n  async canModifyEntity(\r\n    entity: Reactodia.ElementModel,\r\n    options: { readonly signal?: AbortSignal; }\r\n  ): Promise<Reactodia.MetadataCanModifyEntity> {\r\n    await Reactodia.delay(SIMULATED_DELAY, {signal: options.signal});\r\n    const editable = entity.types.some(type => this.editableTypes.has(type));\r\n    return {\r\n      canChangeIri: entity.types.includes(owl.Class),\r\n      canEdit: editable,\r\n      canDelete: editable,\r\n    };\r\n  }\r\n\r\n  async canModifyRelation(\r\n    link: Reactodia.LinkModel,\r\n    source: Reactodia.ElementModel,\r\n    target: Reactodia.ElementModel,\r\n    options: { readonly signal?: AbortSignal; }\r\n  ): Promise<Reactodia.MetadataCanModifyRelation> {\r\n    await Reactodia.delay(SIMULATED_DELAY, {signal: options.signal});\r\n    switch (link.linkTypeId) {\r\n      case rdfs.domain:\r\n      case rdfs.range:\r\n      case rdfs.subClassOf:\r\n      case rdfs.subPropertyOf: {\r\n        return {\r\n          canChangeType: true,\r\n          canDelete: true,\r\n        };\r\n      }\r\n      default: {\r\n        return {};\r\n      }\r\n    }\r\n  }\r\n\r\n  async getEntityShape(\r\n    types: ReadonlyArray<Reactodia.ElementTypeIri>,\r\n    options: { readonly signal?: AbortSignal; }\r\n  ): Promise<Reactodia.MetadataEntityShape> {\r\n    await Reactodia.delay(SIMULATED_DELAY, {signal: options.signal});\r\n    const properties = new Map<Reactodia.PropertyTypeIri, Reactodia.MetadataPropertyShape>();\r\n    if (types.some(type => this.editableTypes.has(type))) {\r\n      properties.set(rdfs.comment, {\r\n        valueShape: {termType: 'Literal'},\r\n      });\r\n      properties.set(rdfs.seeAlso, {\r\n        valueShape: {termType: 'NamedNode'},\r\n      });\r\n    }\r\n    return {properties};\r\n  }\r\n\r\n  async filterConstructibleTypes(\r\n    types: ReadonlySet<Reactodia.ElementTypeIri>,\r\n    options: { readonly signal?: AbortSignal }\r\n  ): Promise<ReadonlySet<Reactodia.ElementTypeIri>> {\r\n    await Reactodia.delay(SIMULATED_DELAY, {signal: options.signal});\r\n    return new Set(Array.from(types).filter(type => this.editableTypes.has(type)));\r\n  }\r\n}\r\n\r\nexport class ExampleValidationProvider implements Reactodia.ValidationProvider {\r\n  async validate(\r\n    event: Reactodia.ValidationEvent\r\n  ): Promise<Reactodia.ValidationResult> {\r\n    const items: Array<Reactodia.ValidatedElement | Reactodia.ValidatedLink> = [];\r\n\r\n    if (event.target.types.includes(owl.Class)) {\r\n      event.state.links.forEach(e => {\r\n        if (e.type === 'relationAdd' && e.data.sourceId === event.target.id) {\r\n          items.push({\r\n            type: 'link',\r\n            target: e.data,\r\n            severity: 'error',\r\n            message: 'Cannot add any new link from a Class',\r\n          });\r\n          items.push({\r\n            type: 'element',\r\n            target: event.target.id,\r\n            severity: 'warning',\r\n            message: `Cannot create <${e.data.linkTypeId}> link from a Class`,\r\n          });\r\n        }\r\n      });\r\n    }\r\n\r\n    if (event.target.types.includes(owl.ObjectProperty)) {\r\n      if (!event.outboundLinks.some(link => link.linkTypeId === rdfs.subPropertyOf)) {\r\n        items.push({\r\n          type: 'element',\r\n          target: event.target.id,\r\n          severity: 'info',\r\n          message: 'It might be a good idea to make the property a sub-property of another',\r\n        });\r\n      }\r\n    }\r\n\r\n    await Reactodia.delay(SIMULATED_DELAY, {signal: event.signal});\r\n    return {items};\r\n  }\r\n}\r\n\r\ntype VocabularyKeyType<K extends string> =\r\n  K extends Capitalize<K>\r\n    ? Reactodia.ElementTypeIri\r\n    : Reactodia.LinkTypeIri & Reactodia.PropertyTypeIri;\r\n\r\ntype Vocabulary<Keys extends string[]> = {\r\n  readonly [K in Keys[number]]: VocabularyKeyType<K>;\r\n};\r\n\r\nfunction vocabulary<const Keys extends string[]>(prefix: string, keys: Keys): Vocabulary<Keys> {\r\n  const result: { [key: string]: string } = Object.create(null);\r\n  for (const key of keys) {\r\n    result[key] = prefix + key;\r\n  }\r\n  return result as Vocabulary<Keys>;\r\n}\r\n\r\nfunction hasType(model: Reactodia.ElementModel | undefined, type: Reactodia.ElementTypeIri) {\r\n  return Boolean(!model || model.types.includes(type));\r\n}\r\n"}}]);