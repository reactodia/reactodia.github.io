---
slug: /
sidebar_position: 1
---

# Tutorial Intro

Let's discover **Docusaurus in less than 5 minutes**.

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.

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
