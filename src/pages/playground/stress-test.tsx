import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia, InlineReactodiaHead } from '@site/src/components/InlineReactodia';
import { ViewSource } from '@site/src/components/ViewSource';

export default function Example(): JSX.Element {
  return (
    <>
      <InlineReactodiaHead />
      <Layout title='Playground: Stress Test'
        noFooter>
        <BrowserOnly>
          {() => {
            const {PlaygroundStressTest} = require('@site/src/examples/PlaygroundStressTest') as
              typeof import('@site/src/examples/PlaygroundStressTest');

            const params = new URLSearchParams(document.location.search);
            const nodeCount = params.has('node-count') ? Number(params.get('node-count')) : NaN;
            const edgedPerNode = params.has('edges-per-node') ? Number(params.get('edges-per-node')) : NaN;

            return (
              <InlineReactodia fullSize>
                <PlaygroundStressTest
                  nodeCount={Number.isFinite(nodeCount) ? nodeCount : undefined}
                  edgesPerNode={Number.isFinite(edgedPerNode) ? edgedPerNode : undefined}
                />
              </InlineReactodia>
            );
          }}
        </BrowserOnly>
        <ViewSource target='/docs/examples/stress-test' />
      </Layout>
    </>
  );
}
