import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';
import { ViewSource } from '@site/src/components/ViewSource';

export default function Example(): JSX.Element {
  return (
    <Layout title='Playground: Wikidata'
      noFooter>
      <BrowserOnly>
        {() => {
          const {PlaygroundWikidata} = require('@site/src/examples/PlaygroundWikidata') as
            typeof import('@site/src/examples/PlaygroundWikidata');
          return (
            <InlineReactodia fullSize>
              <PlaygroundWikidata />
            </InlineReactodia>
          );
        }}
      </BrowserOnly>
      <ViewSource target='/docs/examples/wikidata' />
    </Layout>
  );
}
