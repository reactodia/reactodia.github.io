import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as N3 from 'n3';

import { ExampleMetadataApi, ExampleValidationApi } from './ExampleMetadataApi';
import { ExampleToolbarMenu } from './ExampleCommon';

const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

type TurtleDataSource =
  | { type: 'url'; url: string }
  | { type: 'data'; data: string };

export function RdfExample() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const [dataSource, setDataSource] = React.useState<TurtleDataSource>({
    type: 'url',
    url:
      'https://raw.githubusercontent.com/reactodia/reactodia-workspace/' +
      'master/examples/resources/orgOntology.ttl'
  });

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model} = context;

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
  }, [dataSource]);

  const [metadataApi] = React.useState(() => new ExampleMetadataApi());
  const [validationApi] = React.useState(() => new ExampleValidationApi());
  const [renameLinkProvider] = React.useState(() => new RenameSubclassOfProvider());

  const suggestProperties = React.useCallback<Reactodia.PropertySuggestionHandler>(params => {
    let maxLength = 0;
    for (const iri of params.properties) {
      maxLength = Math.max(maxLength, iri.length);
    }
    const scores = params.properties.map((p): Reactodia.PropertyScore => ({
      propertyIri: p,
      score: 1 - p.length / maxLength,
    }));
    return Reactodia.delay(300).then(() => scores);
  }, []);

  return (
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}
      metadataApi={metadataApi}
      validationApi={validationApi}
      renameLinkProvider={renameLinkProvider}
      typeStyleResolver={Reactodia.SemanticTypeStyles}
      onIriClick={({iri}) => window.open(iri)}>
      <Reactodia.DefaultWorkspace
        canvas={{
          elementTemplateResolver: types => {
            if (types.includes('http://www.w3.org/2002/07/owl#DatatypeProperty')) {
              return Reactodia.ClassicTemplate;
            }
            return undefined;
          },
          linkTemplateResolver: type => {
            if (type === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {
              return Reactodia.DefaultLinkTemplate;
            }
            return Reactodia.OntologyLinkTemplates(type);
          },
        }}
        connectionsMenu={{suggestProperties}}
        toolbar={{
          menu: <>
            <ToolbarActionOpenTurtleGraph onOpen={setDataSource} />
            <ExampleToolbarMenu />
          </>
        }}
      />
    </Reactodia.Workspace>
  );
}

class RenameSubclassOfProvider extends Reactodia.RenameLinkToLinkStateProvider {
  override canRename(link: Reactodia.Link): boolean {
      return link.typeId === 'http://www.w3.org/2000/01/rdf-schema#subClassOf';
  }
}

interface ToolbarActionOpenTurtleGraphProps {
  onOpen: (dataSource: TurtleDataSource) => void;
}

function ToolbarActionOpenTurtleGraph(props: ToolbarActionOpenTurtleGraphProps) {
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
