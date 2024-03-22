export default async function importRawSource(context, opts) {
  return {
    // A compulsory field used as the namespace for directories to cache
    // the intermediate data for each plugin.
    // If you're writing your own local plugin, you will want it to
    // be unique in order not to potentially conflict with imported plugins.
    // A good way will be to add your own project name within.
    name: 'docusaurus-reactodia-import-raw-source',

    configureWebpack(config, isServer, utils) {
      return {
        module: {
          rules: [
            {
              resourceQuery: /raw/,
              type: 'asset/source',
            }
          ]
        }
      };
    }
  }
}
