import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';
import { WikidataExample } from '@site/src/examples/ReactodiaWikidata';

export default function Example(): JSX.Element {
  return (
    <Layout title='Example: Wikidata'
      noFooter>
      <InlineReactodia fullSize>
        <WikidataExample />
      </InlineReactodia>
    </Layout>
  );
}
