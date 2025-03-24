---
title: <UnifiedSearch />
---

# Unified Search

[`<UnifiedSearch />`](/docs/api/workspace/functions/UnifiedSearch.md) is a component to display a search input with a dropdown for results.

## Search sections

One or many available search sections (providers) can be specified:

| Section component | Description |
|-------------------|-------------|
| [`<SearchSectionElementTypes />`](/docs/api/workspace/functions/SearchSectionElementTypes.md) | Allows to lookup entity types displayed in the tree form and create new entities in [authoring mode](/docs/concepts/graph-authoring.md). |
| [`<SearchSectionEntities />`](/docs/api/workspace/functions/SearchSectionEntities.md) | Allows to lookup entities using [data provider](/docs/concepts/data-provider.md). |
| [`<SearchSectionLinkTypes />`](/docs/api/workspace/functions/SearchSectionLinkTypes.md) | Allows to lookup displayed link types and change their [visibility settings](/docs/api/workspace/classes/DiagramModel.md#getlinkvisibility). |

## Implement a custom search section

[`useUnifiedSearchSection()`](/docs/api/workspace/functions/useUnifiedSearchSection.md) hook can be used to implement a custom search section:

```tsx live noInline
function NpmPackagesSearchSection() {
  const {shouldRender, searchStore} = Reactodia.useUnifiedSearchSection();

  const [items, setItems] = React.useState<readonly Reactodia.ElementModel[]>([]);
  const [selection, setSelection] = React.useState(() => new Set<Reactodia.ElementIri>());

  React.useEffect(() => {
    const listener = new Reactodia.EventObserver();
    let controller = new AbortController();
    listener.listen(searchStore.events, 'executeSearch', async ({value}) => {
      controller.abort();
      controller = new AbortController();
      const signal = controller.signal;
      let items: Reactodia.ElementModel[] = [];
      try {
        items = await queryNpmRegistry(value, signal);
      } catch (err) {
        if (signal.aborted) { return; }
        console.error(err);
      }
      setItems(items);
      setSelection(new Set<Reactodia.ElementIri>());
    });
    listener.listen(searchStore.events, 'clearSearch', ({value}) => {
      controller.abort();
      setItems([]);
      setSelection(new Set<Reactodia.ElementIri>());
    });
    return () => {
      controller.abort();
      listener.stopListening();
    };
  }, [searchStore]);

  return shouldRender ? (
    <div className='reactodia-scrollable'>
      <Reactodia.SearchResults
        items={items}
        selection={selection}
        onSelectionChanged={setSelection}
      />
    </div>
  ) : null;
}

async function queryNpmRegistry(
  text: string,
  signal: AbortSignal
): Reactodia.ElementModel[] {
  if (text.length === 0) {
    return [];
  }
  const res = await fetch(
    `https://registry.npmjs.org/-/v1/search?text=${text}`,
    {signal}
  );
  const data = await res.json();
  return data.objects.map((entry): Reactodia.ElementModel => ({
    id: `https://registry.npmjs.org/${entry.package.name}`,
    types: [`urn:npmjs:Package`],
    label: [],
    properties: {},
  }));
}

function SearchWithNpm() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);
  const sections = React.useMemo(() => [
    {
      key: 'npmPackages',
      label: 'NPM packages',
      component: <NpmPackagesSearchSection />
    },
  ], []);

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace defaultLayout={defaultLayout}>
        <Reactodia.DefaultWorkspace
          search={{sections}}
        />
      </Reactodia.Workspace>
    </div>
  );
}

render(<SearchWithNpm />);
```
