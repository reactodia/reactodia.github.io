import * as React from 'react';
import cx from 'clsx';

import styles from './Icon.module.css';

export function Icon(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className={cx(styles.icon, props.className)} />
  );
}
