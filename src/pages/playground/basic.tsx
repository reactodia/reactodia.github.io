import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';

export default function Example(): JSX.Element {
  return (
    <Layout title='Playground: Basic'
      noFooter>
      <BrowserOnly>
        {() => {
          const {ReactodiaBasic} = require('@site/src/examples/ReactodiaBasic');
          return (
            <InlineReactodia fullSize>
              <ReactodiaBasic />
            </InlineReactodia>
          );
        }}
      </BrowserOnly>
    </Layout>
  );
}
