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
};

export default ReactLiveScope;
