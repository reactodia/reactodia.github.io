import clsx from 'clsx';
import * as React from 'react';
import Link from '@docusaurus/Link';

import CodeIcon from '@vscode/codicons/src/icons/code.svg';

import styles from './styles.module.css';

export function ViewSource(props: {
  target: string;
}) {
  const {target} = props;
  return (
    <Link className={styles.viewSource}
      to={target}
      title='View source code for the playground page'>
      <CodeIcon width={24} height={24} />
      <span className={styles.label}>View Source</span>
    </Link>
  );
}
