import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia, InlineReactodiaHead } from '@site/src/components/InlineReactodia';
import { ViewSource } from '@site/src/components/ViewSource';

export default function Example() {
  return (
    <>
      <InlineReactodiaHead />
      <Layout title='Playground: Style Customization'
        noFooter>
        <BrowserOnly>
          {() => {
            const {PlaygroundStyleCustomization} = require('@site/src/examples/PlaygroundStyleCustomization') as
              typeof import('@site/src/examples/PlaygroundStyleCustomization');
            return (
              <InlineReactodia fullSize>
                <PlaygroundStyleCustomization />
              </InlineReactodia>
            );
          }}
        </BrowserOnly>
        <ViewSource target='/docs/examples/style-customization' />
      </Layout>
    </>
  );
}
