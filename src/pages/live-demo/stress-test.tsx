import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';
import { StressTestExample } from '@site/src/examples/ReactodiaStressTest';

export default function Example(): JSX.Element {
  const params = new URLSearchParams(document.location.search);
  const nodeCount = params.has('node-count') ? Number(params.get('node-count')) : NaN;
  const edgedPerNode = params.has('edges-per-node') ? Number(params.get('edges-per-node')) : NaN;

  return (
    <Layout title='Example: Stress Test'
      noFooter>
      <InlineReactodia fullSize>
        <StressTestExample
          nodeCount={Number.isFinite(nodeCount) ? nodeCount : undefined}
          edgesPerNode={Number.isFinite(edgedPerNode) ? edgedPerNode : undefined}
        />
      </InlineReactodia>
    </Layout>
  );
}
