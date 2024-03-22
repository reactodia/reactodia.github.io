import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import ReactodiaLogoSvg from '@site/static/img/reactodia-logo.svg';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--dark', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <div className={styles.title}>{siteConfig.title}</div>
        </Heading>
        <Heading as="h2" className={clsx('hero__title', styles.card)}>
          <ReactodiaLogoSvg className={styles.logo}
            role="img"
            width={200}
            height={200}
          />
          <p className={styles.tagline}>
            Visual <b>interaction</b><br />
            with <b>graph</b> data<br />
            in a form of a <b>diagram</b>
          </p>
        </Heading>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/">
            Get Started
          </Link>
          <Link
            className="button button--info button--lg"
            to="/live-demo/basic">
            Try a Demo
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
