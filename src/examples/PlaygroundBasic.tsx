import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as N3 from 'n3';

const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

export function PlaygroundBasic() {
  const GRAPH_DATA = 'https://reactodia.github.io/resources/orgOntology.ttl';

  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, performLayout} = context;
    // Fetch graph data to use as underlying data source
    const response = await fetch(GRAPH_DATA, {signal});
    const graphData = new N3.Parser().parse(await response.text());
    const dataProvider = new Reactodia.RdfDataProvider({acceptBlankNodes: false});
    dataProvider.addGraph(graphData);

    // Create empty diagram and put owl:Class entities with links between them
    await model.createNewDiagram({dataProvider, signal});
    const elementTypeId = 'http://www.w3.org/2002/07/owl#Class';
    for (const {element} of await dataProvider.lookup({elementTypeId})) {
      model.createElement(element);
    }
    await model.requestLinks();

    // Layout elements on canvas
    await performLayout({signal});
  }, []);

  return (
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}>
      <Reactodia.DefaultWorkspace />
    </Reactodia.Workspace>
  );
}
