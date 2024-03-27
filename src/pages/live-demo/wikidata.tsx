import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';

export default function Example(): JSX.Element {
  return (
    <Layout title='Example: Wikidata'
      noFooter>
      <BrowserOnly>
        {() => {
          const {WikidataExample} = require('@site/src/examples/ReactodiaWikidata');
          return (
            <InlineReactodia fullSize>
              <WikidataExample />
            </InlineReactodia>
          );
        }}
      </BrowserOnly>
    </Layout>
  );
}
