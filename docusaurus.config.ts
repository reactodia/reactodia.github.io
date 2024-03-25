import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Reactodia',
  tagline: 'Visual interaction with graph data in a form of a diagram.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://reactodia.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'reactodia', // Usually your GitHub org/user name.
  projectName: 'reactodia.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/reactodia/reactodia.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/reactodia/reactodia.github.io/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    './src/plugins/import-raw-source',
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: [
          '../reactodia-workspace/src/workspace.ts',
          '../reactodia-workspace/src/worker-protocol.ts',
          '../reactodia-workspace/src/layout.worker.ts',
        ],
        tsconfig: '../reactodia-workspace/tsconfig.json',
        excludePrivate: true,
        excludeProtected: true,
        excludeInternal: true,
        // propertiesFormat: 'Table',
        readme: 'none',
      },
    ],
  ],

  themes: [
    '@docusaurus/theme-live-codeblock',
  ],

  themeConfig: {
    image: 'img/reactodia-social-card.jpg',
    navbar: {
      title: 'Reactodia',
      logo: {
        alt: 'Reactodia Logo',
        src: 'img/reactodia-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'api',
          position: 'left',
          label: 'API',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          label: 'Demo',
          position: 'left',
          items: [
            {to: '/live-demo/basic', label: 'Basic'},
            {to: '/live-demo/bundle', label: 'Bundle (obsolete)'},
          ]
        },
        {
          href: 'https://github.com/reactodia/reactodia-workspace',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Intro',
              to: '/docs',
            },
            {
              label: 'Concepts',
              to: '/docs/category/concepts',
            },
            {
              label: 'Components',
              to: '/docs/category/components',
            },
            {
              label: 'Examples',
              to: '/docs/category/examples',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/reactodia/reactodia-workspace/blob/master/CHANGELOG.md',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/reactodia/reactodia-workspace',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AlexeyMz. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
