import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';

export default function Example(): JSX.Element {
  return (
    <Layout title='Example: Stress Test'
      noFooter>
      <BrowserOnly>
        {() => {
          const {StressTestExample} = require('@site/src/examples/ReactodiaStressTest');

          const params = new URLSearchParams(document.location.search);
          const nodeCount = params.has('node-count') ? Number(params.get('node-count')) : NaN;
          const edgedPerNode = params.has('edges-per-node') ? Number(params.get('edges-per-node')) : NaN;

          return (
            <InlineReactodia fullSize>
              <StressTestExample
                nodeCount={Number.isFinite(nodeCount) ? nodeCount : undefined}
                edgesPerNode={Number.isFinite(edgedPerNode) ? edgedPerNode : undefined}
              />
            </InlineReactodia>
          );
        }}
      </BrowserOnly>
    </Layout>
  );
}
