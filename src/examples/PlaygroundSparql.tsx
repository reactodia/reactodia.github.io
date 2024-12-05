import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

import { ExampleToolbarMenu } from './ExampleCommon';
import { getHashQuery, setHashQueryParam } from './HashQuery';
import {
  SparqlConnectionAction, SparqlConnectionSettings, showConnectionDialog,
} from './SparqlConnection';

const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

export function PlaygroundSparql() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const [connectionSettings, setConnectionSettings] = React.useState(
    (): SparqlConnectionSettings | undefined => {
      const params = getHashQuery();
      const endpointUrl = params?.get('sparql-endpoint');
      return endpointUrl ? {endpointUrl} : undefined;
    }
  );
  const applyConnectionSettings = (settings: SparqlConnectionSettings) => {
    setHashQueryParam('sparql-endpoint', settings.endpointUrl);
    setConnectionSettings(settings);
  };

  const [searchCommands] = React.useState(() =>
    new Reactodia.EventSource<Reactodia.UnifiedSearchCommands>
  );

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model} = context;

    if (connectionSettings) {
      const dataProvider = new Reactodia.SparqlDataProvider({
        endpointUrl: connectionSettings.endpointUrl,
        imagePropertyUris: ['http://xmlns.com/foaf/0.1/img'],
      }, Reactodia.OwlStatsSettings);

      model.importLayout({
        dataProvider: dataProvider,
        validateLinks: true,
        signal,
      });

      searchCommands.trigger('focus', {sectionKey: 'elementTypes'});
    } else {
      showConnectionDialog(connectionSettings, applyConnectionSettings, context);
    }
  }, [connectionSettings]);

  return (
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}
      onIriClick={({iri}) => window.open(iri)}>
      <Reactodia.DefaultWorkspace
        menu={<ExampleToolbarMenu />}
        searchCommands={searchCommands}
        canvasWidgets={[
          <Reactodia.Toolbar key='sparql-settings'
            dock='sw'
            dockOffsetY={40}>
            <SparqlConnectionAction settings={connectionSettings}
                applySettings={applyConnectionSettings}
            />
          </Reactodia.Toolbar>
        ]}
        languages={[
          {code: 'de', label: 'Deutsch'},
          {code: 'en', label: 'english'},
          {code: 'es', label: 'español'},
          {code: 'fr', label: 'français'},
          {code: 'ja', label: '日本語'},
          {code: 'hi', label: 'हिन्दी'},
          {code: 'pt', label: 'português'},
          {code: 'ru', label: 'русский'},
          {code: 'zh', label: '汉语'},
        ]}
      />
    </Reactodia.Workspace>
  );
}
