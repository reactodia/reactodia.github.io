import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia, InlineReactodiaHead } from '@site/src/components/InlineReactodia';

export default function Example() {
  return (
    <>
      <InlineReactodiaHead />
      <Layout title='Genealogical Tree Editor'
        noFooter>
        <BrowserOnly>
          {() => {
            const {PlaygroundGenealogicalTree} = require(
              '@site/src/tools/GenealogicalTree/GenealogicalTree'
            ) as typeof import('@site/src/tools/GenealogicalTree/GenealogicalTree');
            return (
              <InlineReactodia fullSize>
                <PlaygroundGenealogicalTree />
              </InlineReactodia>
            );
          }}
        </BrowserOnly>
      </Layout>
    </>
  );
}
