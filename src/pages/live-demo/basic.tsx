import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';

export default function Example(): JSX.Element {
  return (
    <Layout title='Example: Basic'
      noFooter>
      <BrowserOnly>
        {() => {
          const {BasicExample} = require('@site/src/examples/ReactodiaBasic');
          return (
            <InlineReactodia fullSize>
              <BasicExample />
            </InlineReactodia>
          );
        }}
      </BrowserOnly>
    </Layout>
  );
}
