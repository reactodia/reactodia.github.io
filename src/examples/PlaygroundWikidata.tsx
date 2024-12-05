import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

import { ExampleToolbarMenu } from './ExampleCommon';

const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

export function PlaygroundWikidata() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const [searchCommands] = React.useState(() =>
    new Reactodia.EventSource<Reactodia.UnifiedSearchCommands>
  );

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model} = context;

    const sparqlProvider = new Reactodia.SparqlDataProvider(
      {
        endpointUrl: 'https://query.wikidata.org/sparql',
        imagePropertyUris: [
          'http://www.wikidata.org/prop/direct/P18',
          'http://www.wikidata.org/prop/direct/P154',
        ]
      },
      {
        ...Reactodia.WikidataSettings,
        filterOnlyLanguages: ['de', 'en', 'es', 'ru', 'zh'],
        // Public Wikidata endpoint is too overloaded for the connection statistics
        linkTypesStatisticsQuery: '',
      });

    const dataProvider = new Reactodia.IndexedDbCachedProvider({
      baseProvider: sparqlProvider,
      dbName: 'reactodia-wikidata-cache',
      closeSignal: signal,
    });

    await model.importLayout({ dataProvider, signal });

    searchCommands.trigger('focus', {sectionKey: 'entities'});
  }, []);

  const suggestProperties = React.useCallback<Reactodia.PropertySuggestionHandler>(params => {
    const scores = params.properties.map((iri, index): Reactodia.PropertyScore => {
      // Assumption is smaller P-properties were created earlier and are more interesting
      const match = /P([0-9]+)$/.exec(iri);
      return {
        propertyIri: iri,
        score: match ? -Number(match[1]) : (params.properties.length - index),
      };
    });
    return Promise.resolve(scores);
  }, []);

  return (
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}
      onIriClick={({ iri }) => window.open(iri)}>
      <Reactodia.DefaultWorkspace
        menu={
          <>
            <ExampleToolbarMenu />
            <ClearWikidataCacheAction />
          </>
        }
        searchCommands={searchCommands}
        connectionsMenu={{suggestProperties}}
        languages={[
          { code: 'de', label: 'Deutsch' },
          { code: 'en', label: 'english' },
          { code: 'es', label: 'español' },
          { code: 'ru', label: 'русский' },
          { code: 'zh', label: '汉语' },
        ]}
      />
    </Reactodia.Workspace>
  );
}

function ClearWikidataCacheAction() {
  return (
    <Reactodia.ToolbarAction
      title='Clear locally-cached data previously fetched from Wikidata'
      onSelect={() => {
        const {model: {dataProvider}} = Reactodia.useWorkspace();
        if (dataProvider instanceof Reactodia.IndexedDbCachedProvider) {
          dataProvider.clearCache();
        }
      }}>
      Clear Wikidata cache
    </Reactodia.ToolbarAction>
  );
}
