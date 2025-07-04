import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as N3 from 'n3';

import { ExampleMetadataProvider, ExampleValidationProvider } from './ExampleMetadata';
import { ExampleToolbarMenu } from './ExampleCommon';

const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

type TurtleDataSource =
  | { type: 'url'; url: string }
  | { type: 'data'; data: string };

export function PlaygroundGraphAuthoring() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const [dataSource, setDataSource] = React.useState<TurtleDataSource>({
    type: 'url',
    url: 'https://reactodia.github.io/resources/orgOntology.ttl',
  });

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, editor, getCommandBus, performLayout} = context;
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

    if (dataSource.type === 'url') {
      const elements = [
        model.createElement('http://www.w3.org/ns/org#Organization'),
        model.createElement('http://www.w3.org/ns/org#FormalOrganization'),
        model.createElement('http://www.w3.org/ns/org#hasMember'),
        model.createElement('http://www.w3.org/ns/org#hasSubOrganization'),
        model.createElement('http://www.w3.org/ns/org#subOrganizationOf'),
        model.createElement('http://www.w3.org/ns/org#unitOf'),
      ];
      await Promise.all([
        model.requestElementData(elements.map(el => el.iri)),
        model.requestLinks(),
      ]);
      await performLayout({signal});
    } else {
      getCommandBus(Reactodia.UnifiedSearchTopic)
        .trigger('focus', {sectionKey: 'elementTypes'});
    }
  }, [dataSource]);

  const [metadataProvider] = React.useState(() => new ExampleMetadataProvider());
  const [validationProvider] = React.useState(() => new ExampleValidationProvider());
  const [renameLinkProvider] = React.useState(() => new RenameSubclassOfProvider());

  return (
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}
      metadataProvider={metadataProvider}
      validationProvider={validationProvider}
      renameLinkProvider={renameLinkProvider}>
      <Reactodia.DefaultWorkspace
        menu={
          <>
            <ToolbarActionOpenTurtleGraph onOpen={setDataSource} />
            <ExampleToolbarMenu />
          </>
        }
        visualAuthoring={{
          inputResolver: (property, inputProps) => property === 'http://www.w3.org/2000/01/rdf-schema#comment'
            ? <Reactodia.FormInputList {...inputProps} valueInput={MultilineTextInput} />
            : undefined,
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

function MultilineTextInput(props: Reactodia.FormInputSingleProps) {
  return <Reactodia.FormInputText {...props} multiline />;
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
