import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia, InlineReactodiaHead } from '@site/src/components/InlineReactodia';
import { ViewSource } from '@site/src/components/ViewSource';

export default function Example(): JSX.Element {
  return (
    <>
      <InlineReactodiaHead />
      <Layout title='Playground: SPARQL'
        noFooter>
        <BrowserOnly>
          {() => {
            const {PlaygroundSparql} = require('@site/src/examples/PlaygroundSparql')
              typeof import('@site/src/examples/PlaygroundSparql');
            return (
              <InlineReactodia fullSize>
                <PlaygroundSparql />
              </InlineReactodia>
            );
          }}
        </BrowserOnly>
        <ViewSource target='/docs/examples/sparql' />
      </Layout>
    </>
  );
}
