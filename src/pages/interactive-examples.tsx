import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './interactive-examples.module.css';

export default function WorkspaceExamples(): JSX.Element {
  return (
    <Layout
      title='Interactive Examples'
      description="Description will go into a meta tag in <head />"
      noFooter>
      <iframe className={styles.frame}
        src='/examples/basic.html'
      />
    </Layout>
  );
}
