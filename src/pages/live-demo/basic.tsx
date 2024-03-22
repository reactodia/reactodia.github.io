import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { InlineReactodia } from '@site/src/components/InlineReactodia';
import { BasicExample } from '@site/src/examples/ReactodiaBasic';

export default function Example(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title='Reactodia Example: Basic'
      description="Description will go into a meta tag in <head />"
      noFooter>
      <InlineReactodia fullSize>
        <BasicExample />
      </InlineReactodia>
    </Layout>
  );
}
