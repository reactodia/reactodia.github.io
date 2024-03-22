import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as N3 from 'n3';

export function BasicExample() {
    const GRAPH_DATA =
        'https://raw.githubusercontent.com/reactodia/reactodia-workspace/' +
        'master/examples/resources/orgOntology.ttl';

    const workspaceRef = React.useRef<Reactodia.Workspace | null>(null);

    React.useEffect(() => {
        const controller = new AbortController();
        loadGraphData(controller.signal).catch(err => {
            const {overlayController} = workspaceRef.current!.getContext();
            overlayController.setSpinner({errorOccurred: true});
            console.error(err);
        });
        return () => controller.abort();
    }, []);

    async function loadGraphData(signal: AbortSignal) {
        const {model, view, performLayout} = workspaceRef.current!.getContext();
        // Fetch graph data to use as underlying data source
        const response = await fetch(GRAPH_DATA, {signal});
        const graphData = new N3.Parser().parse(await response.text());
        const dataProvider = new Reactodia.RdfDataProvider({acceptBlankNodes: false});
        dataProvider.addGraph(graphData);

        // Create empty diagram and put owl:Class entities with links between them
        await model.createNewDiagram({dataProvider, signal});
        const elementTypeId = 'http://www.w3.org/2002/07/owl#Class' as Reactodia.ElementTypeIri;
        for (const {element} of await dataProvider.lookup({elementTypeId})) {
            model.createElement(element);
        }
        await model.requestLinksOfType();

        // Layout elements on canvas
        await performLayout({
            signal,
            canvas: view.findAnyCanvas()!,
            layoutFunction: Reactodia.layoutForcePadded,
        });
    }

    return (
        <Reactodia.Workspace ref={workspaceRef}>
            <Reactodia.DefaultWorkspace />
        </Reactodia.Workspace>
    );
}
