export default {
  lang: 'en-US',
  title: 'vue-lightbox-advanced',
  description: 'Vue Lightbox Advanced Photo Grid component Vue.js 3',
  base: '/',
  editLinks: true,
  themeConfig: {
    repo: 'codeeshop-oc/vue-lightbox-advanced',
    docsRepo: 'codeeshop-oc/vue-lightbox-advanced',
    docsDir: 'docs',
    docsBranch: 'main',
    siteTitle: 'vue-lightbox-advanced',
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'Configs', link: '/configs' },
      { text: 'Examples', link: 'examples' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Configs', link: '/configs' },
          { text: 'Examples', link: '/examples' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'Props', link: '/api/props' },
          { text: 'Events', link: '/api/events' }
        ]
      }
    ]
  }
}
