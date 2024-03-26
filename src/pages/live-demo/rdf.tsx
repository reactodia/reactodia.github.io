import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';
import { RdfExample } from '@site/src/examples/ReactodiaRdf';

export default function Example(): JSX.Element {
  return (
    <Layout title='Example: RDF'
      noFooter>
      <InlineReactodia fullSize>
        <RdfExample />
      </InlineReactodia>
    </Layout>
  );
}
