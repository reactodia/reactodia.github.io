import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';

export default function Example(): JSX.Element {
  return (
    <Layout title='Playground: Wikidata'
      noFooter>
      <BrowserOnly>
        {() => {
          const {ReactodiaWikidata} = require('@site/src/examples/ReactodiaWikidata');
          return (
            <InlineReactodia fullSize>
              <ReactodiaWikidata />
            </InlineReactodia>
          );
        }}
      </BrowserOnly>
    </Layout>
  );
}
