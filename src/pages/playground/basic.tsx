import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';
import { ViewSource } from '@site/src/components/ViewSource';

export default function Example(): JSX.Element {
  return (
    <Layout title='Playground: Basic'
      noFooter>
      <BrowserOnly>
        {() => {
          const {PlaygroundBasic} = require('@site/src/examples/PlaygroundBasic') as
            typeof import('@site/src/examples/PlaygroundBasic');
          return (
            <InlineReactodia fullSize>
              <PlaygroundBasic />
            </InlineReactodia>
          );
        }}
      </BrowserOnly>
      <ViewSource target='/docs/examples/basic' />
    </Layout>
  );
}
