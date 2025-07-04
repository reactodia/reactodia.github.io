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

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, getCommandBus} = context;

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

      getCommandBus(Reactodia.UnifiedSearchTopic)
        .trigger('focus', {sectionKey: 'elementTypes'});
    } else {
      showConnectionDialog(connectionSettings, applyConnectionSettings, context);
    }
  }, [connectionSettings]);

  return (
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}>
      <Reactodia.DefaultWorkspace
        menu={<ExampleToolbarMenu />}
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
          {code: 'en', label: 'English'},
          {code: 'es', label: 'Español'},
          {code: 'fr', label: 'Français'},
          {code: 'hi', label: 'हिन्दी'},
          {code: 'it', label: 'Italiano'},
          {code: 'ja', label: '日本語'},
          {code: 'pt', label: 'português'},
          {code: 'ru', label: 'Русский'},
          {code: 'zh', label: '汉语'},
        ]}
      />
    </Reactodia.Workspace>
  );
}
