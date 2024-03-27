import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';

export default function Example(): JSX.Element {
  return (
    <Layout title='Example: RDF'
      noFooter>
      <BrowserOnly>
        {() => {
          const {RdfExample} = require('@site/src/examples/ReactodiaRdf');
          return (
            <InlineReactodia fullSize>
              <RdfExample />
            </InlineReactodia>
          );
        }}
      </BrowserOnly>
    </Layout>
  );
}
