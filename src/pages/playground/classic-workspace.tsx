import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';
import { ViewSource } from '@site/src/components/ViewSource';

export default function Example(): JSX.Element {
  return (
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
  );
}
