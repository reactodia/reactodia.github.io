import clsx from 'clsx';
import * as React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Head from '@docusaurus/Head';

import styles from './styles.module.css';

export function InlineReactodiaHead() {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1, interactive-widget=resizes-content" />
    </Head>
  );
}

export function InlineReactodia(props: {
  fullSize?: boolean;
  height?: string;
  children: React.ReactNode;
}) {
  const {fullSize, height, children} = props;
  const css = {
    ['--inline-reactodia-height']: fullSize ? 'auto' : height,
  } as React.CSSProperties;

  return (
    <div className={clsx(fullSize ? styles.fullSize : styles.inline)}
      style={css}>
      <BrowserOnly>
          {() => <>{children}</>}
      </BrowserOnly>
    </div>
  );
}
