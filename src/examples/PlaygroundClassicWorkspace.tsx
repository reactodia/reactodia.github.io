import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import { SemanticTypeStyles, makeOntologyLinkTemplates } from '@reactodia/workspace/legacy-styles';
import * as N3 from 'n3';

import { ExampleToolbarMenu } from './ExampleCommon';

const OntologyLinkTemplates = makeOntologyLinkTemplates(Reactodia);
const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

type TurtleDataSource =
  | { type: 'url'; url: string }
  | { type: 'data'; data: string };

export function PlaygroundClassicWorkspace() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const [dataSource, setDataSource] = React.useState<TurtleDataSource>({
    type: 'url',
    url: 'https://reactodia.github.io/resources/orgOntology.ttl',
  });

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, editor, getCommandBus} = context;
    editor.setAuthoringMode(true);

    let turtleData: string;
    if (dataSource.type === 'url') {
      const response = await fetch(dataSource.url, {signal});
      turtleData = await response.text();
    } else {
      turtleData = dataSource.data;
    }

    const dataProvider = new Reactodia.RdfDataProvider();
    try {
      dataProvider.addGraph(new N3.Parser().parse(turtleData));
    } catch (err) {
      throw new Error('Error parsing RDF graph data', {cause: err});
    }

    await model.importLayout({dataProvider, signal});

    getCommandBus(Reactodia.UnifiedSearchTopic)
      .trigger('focus', {sectionKey: 'elementTypes'});
  }, [dataSource]);

  return (
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}
      typeStyleResolver={SemanticTypeStyles}>
      <Reactodia.ClassicWorkspace
        canvas={{
          elementTemplateResolver: (types, element) => {
            if (types.includes('http://www.w3.org/2002/07/owl#DatatypeProperty')) {
              return Reactodia.ClassicTemplate;
            }
            return undefined;
          },
          linkTemplateResolver: (linkType, link) => {
            if (linkType === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {
              return Reactodia.StandardLinkTemplate;
            }
            return OntologyLinkTemplates(linkType);
          },
        }}
        toolbar={{
          menu: (
            <>
              <ToolbarActionOpenTurtleGraph onOpen={setDataSource} />
              <ExampleToolbarMenu />
            </>
          )
        }}
      />
    </Reactodia.Workspace>
  );
}

function ToolbarActionOpenTurtleGraph(props: {
  onOpen: (dataSource: TurtleDataSource) => void;
}) {
  const {onOpen} = props;
  return (
    <Reactodia.ToolbarActionOpen
      fileAccept='.ttl'
      onSelect={async file => {
        const turtleText = await file.text();
        onOpen({type: 'data', data: turtleText});
      }}>
      Load RDF (Turtle) data
    </Reactodia.ToolbarActionOpen>
  );
}
