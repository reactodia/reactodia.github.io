---
sidebar_position: 1
title: Live
---

# Example in the live editor

Workspace usage example via live editor block which updates on every change.

```tsx live
function SimpleExample() {
    const GRAPH_DATA =
        'https://raw.githubusercontent.com/reactodia/reactodia-workspace/' +
        'master/examples/resources/orgOntology.ttl';

    const controllerRef = React.useRef<AbortController>();
    const onWorkspaceMount = React.useCallback(workspace => {
        if (workspace) {
            const controller = new AbortController();
            controllerRef.current = controller;
            const context = workspace.getContext();
            loadGraphData(context, controller.signal).catch(err => {
                if (err.name === 'AbortError') {
                    return;
                }
                context.overlayController.setSpinner({errorOccurred: true});
                console.error(err);
            });
        } else if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = undefined;
        }
    }, []);

    async function loadGraphData(context: Reactodia.WorkspaceContext, signal: AbortSignal) {
        const {model, view, performLayout} = context;
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
        <Reactodia.Workspace ref={onWorkspaceMount}>
            <Reactodia.DefaultWorkspace />
        </Reactodia.Workspace>
    );
}
```
