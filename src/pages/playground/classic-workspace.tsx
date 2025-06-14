import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia, InlineReactodiaHead } from '@site/src/components/InlineReactodia';
import { ViewSource } from '@site/src/components/ViewSource';

export default function Example() {
  return (
    <>
      <InlineReactodiaHead />
      <Layout title='Playground: Classic Workspace'
        noFooter>
        <BrowserOnly>
          {() => {
            const {PlaygroundClassicWorkspace} = require('@site/src/examples/PlaygroundClassicWorkspace') as
              typeof import('@site/src/examples/PlaygroundClassicWorkspace');
            return (
              <InlineReactodia fullSize>
                <PlaygroundClassicWorkspace />
              </InlineReactodia>
            );
          }}
        </BrowserOnly>
        <ViewSource target='/docs/examples/classic-workspace' />
      </Layout>
    </>
  );
}
