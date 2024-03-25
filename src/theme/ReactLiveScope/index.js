import React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as N3 from 'n3';

// This component was swizzled to add additional imports
// to @docusaurus/theme-live-codeblock plugin, see:
// https://docusaurus.io/docs/markdown-features/code-blocks#imports
const ReactLiveScope = {
  React,
  ...React,
  Reactodia,
  N3,
  Layouts: Reactodia.defineLayoutWorker(() => new Worker(
    new URL('@reactodia/workspace/layout.worker', import.meta.url)
  )),
};

export default ReactLiveScope;
