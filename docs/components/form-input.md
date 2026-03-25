---
title: <Forms.Input* />
---

# Form input components

Reactodia provides basic built-in components to edit entity or relation properties in a form:

| Form input component | Description |
|----------------------|-------------|
| [`<Forms.InputList />`](/docs/api/forms/functions/InputList.md) | Form input to edit multiple values in a list of specified single value inputs. |
| [`<Forms.InputText />`](/docs/api/forms/functions/InputText.md) | Form input to edit a single value as a plain string with an optional language. |
| [`<Forms.InputSelect />`](/docs/api/forms/functions/InputSelect.md) | Form input to select a value from a predefined list of variants. |
| [`<Forms.InputFile />`](/docs/api/forms/functions/InputFile.md) | Form input to upload files and display previously uploaded files. |

:::warning
Currently form input components are considered **unstable** so there might be breaking changes in their API in the future.
:::

### Example: overriding input to a multiline text field

```tsx live noInline
function Example() {
  const GRAPH_DATA = 'https://reactodia.github.io/resources/orgOntology.ttl';

  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, editor, getCommandBus, performLayout} = context;
    const response = await fetch(GRAPH_DATA, {signal});
    const graphData = new N3.Parser().parse(await response.text());
    const dataProvider = new Reactodia.RdfDataProvider({acceptBlankNodes: false});
    dataProvider.addGraph(graphData);
    await model.createNewDiagram({dataProvider, signal});
    const element = model.createElement('http://www.w3.org/ns/org#Organization');
    await model.requestData();
    await performLayout({signal});
    model.setSelection([element]);
    editor.setAuthoringMode(true);
    getCommandBus(Reactodia.VisualAuthoringTopic)
        .trigger('editEntity', {target: element});
  }, []);

  const RDF_COMMENT = 'http://www.w3.org/2000/01/rdf-schema#comment';

  const [metadataProvider] = React.useState(() => new Reactodia.BaseMetadataProvider({
    canModifyEntity: () => ({canEdit: true}),
    getEntityShape: types => ({
      properties: new Map([
        [Reactodia.rdfs.label, {valueShape: {termType: 'Literal'}}],
        [RDF_COMMENT, {valueShape: {termType: 'Literal'}}],
      ])
    }),
  }));

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace ref={onMount}
        metadataProvider={metadataProvider}
        defaultLayout={defaultLayout}>
          <Reactodia.DefaultWorkspace
            search={null}
            navigator={{expanded: false}}
            visualAuthoring={{
              propertyEditor: options => (
                <Reactodia.DefaultPropertyEditor options={options}
                  resolveInput={(property, inputProps) => (
                    <Forms.InputList {...inputProps}
                      valueInput={
                        property === RDF_COMMENT ? MultilineTextInput : Forms.InputText
                      }
                    />
                  )}
                />
              ),
            }}
          />
      </Reactodia.Workspace>
    </div>
  );
}

function MultilineTextInput(props: Reactodia.FormInputSingleProps) {
  return <Forms.InputText {...props} multiline />;
}

render(<Example />);
```
