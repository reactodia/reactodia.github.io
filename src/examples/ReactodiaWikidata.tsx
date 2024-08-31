import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

import { ExampleToolbarMenu } from './ExampleCommon';

const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

export function WikidataExample() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

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
  }, []);

  return (
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}
      onIriClick={({ iri }) => window.open(iri)}>
      <Reactodia.DefaultWorkspace
        toolbar={{
          menu: <>
            <ExampleToolbarMenu />
            <ClearWikidataCacheAction />
          </>,
          languages: [
            { code: 'de', label: 'Deutsch' },
            { code: 'en', label: 'english' },
            { code: 'es', label: 'español' },
            { code: 'ru', label: 'русский' },
            { code: 'zh', label: '汉语' },
          ],
        }}
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
