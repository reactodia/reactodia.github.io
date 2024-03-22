import clsx from 'clsx';
import * as React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import styles from './styles.module.css';

export interface InlineReactodiaProps {
  fullSize?: boolean;
  height?: string;
  children: React.ReactNode;
}

export function InlineReactodia(props: InlineReactodiaProps) {
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
