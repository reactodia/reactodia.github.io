import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';
import { BasicExample } from '@site/src/examples/ReactodiaBasic';

export default function Example(): JSX.Element {
  return (
    <Layout title='Example: Basic'
      noFooter>
      <InlineReactodia fullSize>
        <BasicExample />
      </InlineReactodia>
    </Layout>
  );
}
