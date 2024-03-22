import Layout from '@theme/Layout';

import styles from './bundle.module.css';

export default function WorkspaceExamples(): JSX.Element {
  return (
    <Layout
      title='Examples (obsolete)'
      noFooter>
      <iframe className={styles.frame}
        src='/examples/basic.html'
      />
    </Layout>
  );
}
