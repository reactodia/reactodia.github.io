import BrowserOnly from '@docusaurus/BrowserOnly';
import type * as Reactodia from '@reactodia/workspace';

export function WithReactodiaStyles(props: Reactodia.WorkspaceRootProps) {
  return (
    <BrowserOnly>
      {() => {
        const {ReactodiaStyleRoot} = require('./style-root') as typeof import('./style-root');
        return <ReactodiaStyleRoot {...props} />;
      }}
    </BrowserOnly>
  );
}
