import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as N3 from 'n3';

import { ExampleToolbarMenu } from './ExampleCommon';

const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

type TurtleDataSource =
  | { type: 'url'; url: string }
  | { type: 'data'; data: string };

export function PlaygroundRdfExplorer() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const [dataSource, setDataSource] = React.useState<TurtleDataSource>({
    type: 'url',
    url: 'https://reactodia.github.io/resources/orgOntology.ttl',
  });

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, getCommandBus} = context;

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
      defaultLayout={defaultLayout}>
      <Reactodia.DefaultWorkspace
        menu={
          <>
            <ToolbarActionOpenTurtleGraph onOpen={setDataSource} />
            <ExampleToolbarMenu />
          </>
        }
        languages={[
          {code: 'de', label: 'Deutsch'},
          {code: 'en', label: 'English'},
          {code: 'es', label: 'Español'},
          {code: 'fr', label: 'Français'},
          {code: 'hi', label: 'हिन्दी'},
          {code: 'it', label: 'Italiano'},
          {code: 'ja', label: '日本語'},
          {code: 'pt', label: 'português'},
          {code: 'ru', label: 'Русский'},
          {code: 'zh', label: '汉语'},
        ]}
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
