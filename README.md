# Reactodia Docs

Reactodia documentation portal is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```shell
$ npm i
```

### Local Development

```shell
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

To see embedded interactive examples at `/interactive-examples` create a symbolic link (or junction point on Windows) into compiled example bundles directory as `static/examples`.

For example, on Windows using `cmd`:
```shell
reactodia.github.io\static> mklink /j examples ../../reactodia-workspace/dist/examples
```

### Build

```shell
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
