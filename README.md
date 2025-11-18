# Reactodia Docs

Reactodia documentation portal is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```shell
$ npm i
```

### Local Development

To build the docs on local machine, the project expects to have [Reactodia Workspace repository](https://github.com/reactodia/reactodia-workspace) to be checked out at `../reactodia-workspace` (i.e. in `reactodia-workspace` directory at the parent directory for the docs itself). This is necessary to generate API Reference for the library using [docusaurus-plugin-typedoc](https://typedoc-plugin-markdown.org/plugins/docusaurus).

```shell
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```shell
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

Run the following command to test the built assets locally:
```shell
$ npm run serve
```

### Deployment

The docs are deployed to the GitHub Pages using [Deploy to GitHub pages](https://github.com/reactodia/reactodia.github.io/actions/workflows/deploy-pages.yml) action workflow.
