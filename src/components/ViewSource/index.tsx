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
      to={target}>
      <CodeIcon width={24} height={24} />
      View Source
    </Link>
  );
}
