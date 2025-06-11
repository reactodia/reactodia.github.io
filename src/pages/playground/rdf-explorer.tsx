import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia, InlineReactodiaHead } from '@site/src/components/InlineReactodia';
import { ViewSource } from '@site/src/components/ViewSource';

export default function Example() {
  return (
    <>
      <InlineReactodiaHead />
      <Layout title='Playground: RDF Explorer'
        noFooter>
        <BrowserOnly>
          {() => {
            const {PlaygroundRdfExplorer} = require('@site/src/examples/PlaygroundRdfExplorer') as
              typeof import('@site/src/examples/PlaygroundRdfExplorer');
            return (
              <InlineReactodia fullSize>
                <PlaygroundRdfExplorer />
              </InlineReactodia>
            );
          }}
        </BrowserOnly>
        <ViewSource target='/docs/examples/rdf-explorer' />
      </Layout>
    </>
  );
}
