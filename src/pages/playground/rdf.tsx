import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia, InlineReactodiaHead } from '@site/src/components/InlineReactodia';
import { ViewSource } from '@site/src/components/ViewSource';

export default function Example(): JSX.Element {
  return (
    <>
      <InlineReactodiaHead />
      <Layout title='Playground: RDF'
        noFooter>
        <BrowserOnly>
          {() => {
            const {PlaygroundRdf} = require('@site/src/examples/PlaygroundRdf') as
              typeof import('@site/src/examples/PlaygroundRdf');
            return (
              <InlineReactodia fullSize>
                <PlaygroundRdf />
              </InlineReactodia>
            );
          }}
        </BrowserOnly>
        <ViewSource target='/docs/examples/rdf' />
      </Layout>
    </>
  );
}
