import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia, InlineReactodiaHead } from '@site/src/components/InlineReactodia';
import { ViewSource } from '@site/src/components/ViewSource';

export default function Example() {
  return (
    <>
      <InlineReactodiaHead />
      <Layout title='Playground: Graph Authoring'
        noFooter>
        <BrowserOnly>
          {() => {
            const {PlaygroundGraphAuthoring} = require('@site/src/examples/PlaygroundGraphAuthoring') as
              typeof import('@site/src/examples/PlaygroundGraphAuthoring');
            return (
              <InlineReactodia fullSize>
                <PlaygroundGraphAuthoring />
              </InlineReactodia>
            );
          }}
        </BrowserOnly>
        <ViewSource target='/docs/examples/graph-authoring' />
      </Layout>
    </>
  );
}
