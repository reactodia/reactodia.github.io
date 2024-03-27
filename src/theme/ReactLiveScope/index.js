import React from 'react';

// This component was swizzled to add additional imports
// to @docusaurus/theme-live-codeblock plugin, see:
// https://docusaurus.io/docs/markdown-features/code-blocks#imports
const ReactLiveScope = {
  React,
  ...React,
  get Reactodia() {
    const {Reactodia} = require('./_reactodia');
    return Reactodia;
  },
  get N3() {
    const {N3} = require('./_n3');
    return N3;
  },
  get Layouts() {
    const {Reactodia} = require('./_reactodia');
    return Reactodia.defineLayoutWorker(() => new Worker(
      new URL('@reactodia/workspace/layout.worker', import.meta.url)
    ));
  },
};

export default ReactLiveScope;
