const deflist = require('remark-deflist');
const ghLinks = require('remark-github');

module.exports = {
  title: 'CIRCUS',
  tagline: 'Platform for Computer-aided Diagnosis Research',
  url: 'https://circus-project.net/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'utrad-ical', // Usually your GitHub org/user name.
  projectName: 'circus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'CIRCUS',
      logo: {
        alt: 'CIRCUS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBaseRegex: `(?!docs/(news|admin/installation))(docs)`,
          label: 'Docs',
          position: 'left',
        },
        /* { to: 'blog', label: 'Blog', position: 'left' } , */
        {
          to: 'docs/admin/installation',
          label: 'Install',
          position: 'left',
        },
        /* { to: 'api-explorer', label: 'API Explorer', position: 'left' }, */
        {
          to: 'docs/releases',
          label: 'Releases',
          position: 'left',
        },
        {
          href: 'https://github.com/utrad-ical/circus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'CIRCUS Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/utrad-ical/circus',
            },
            {
              label: 'Improve Docs',
              href: 'https://github.com/utrad-ical/circus-docs',
            },
          ],
        },
        {
          title: 'UT Radiology ICAL Team',
          items: [
            {
              label: 'ICAL',
              to: 'http://www.ut-radiology.umin.jp/ical/',
            },
            {
              label: 'UT Radiology',
              to: 'http://www.ut-radiology.umin.jp/',
            },
            {
              label: 'The University of Tokyo Hospital',
              to: 'https://www.h.u-tokyo.ac.jp/',
            },
          ],
        },
        {
          title: 'The University of Tokyo',
          items: [
            {
              label: 'The University of Tokyo',
              to: 'https://www.u-tokyo.ac.jp/',
            },
            {
              label: 'Code of Conduct',
              to: 'https://www.u-tokyo.ac.jp/ja/research/ethics/index.html',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CIRCUS Project.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/utrad-ical/circus-docs/edit/master',
          remarkPlugins: [
            deflist,
            [ghLinks, { repository: 'utrad-ical/circus' }],
          ],
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/utrad-ical/circus-docs/edit/master',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.scss'),
            require.resolve('./src/css/icons.scss'),
          ],
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
};
