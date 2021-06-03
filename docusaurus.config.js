const deflist = require('remark-deflist');

module.exports = {
  title: 'CIRCUS',
  tagline: 'Platform for Computer-aided Diagnosis Research',
  url: 'https://circus-docs.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'utrad-ical', // Usually your GitHub org/user name.
  projectName: 'circus-docs', // Usually your repo name.
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
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        /* { to: 'blog', label: 'Blog', position: 'left' } , */
        { to: 'docs/admin/installation', label: 'Download', position: 'left' },
        /* { to: 'api-explorer', label: 'API Explorer', position: 'left' }, */
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
          remarkPlugins: [deflist],
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
