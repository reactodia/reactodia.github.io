import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';

export default function Example(): JSX.Element {
  return (
    <Layout title='Playground: SPARQL'
      noFooter>
      <BrowserOnly>
        {() => {
          const {ReactodiaSparql} = require('@site/src/examples/ReactodiaSparql');
          return (
            <InlineReactodia fullSize>
              <ReactodiaSparql />
            </InlineReactodia>
          );
        }}
      </BrowserOnly>
    </Layout>
  );
}
