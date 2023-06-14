module.exports = {
  title: 'Z-K',
  description: 'z-k ui',
  themeConfig: {
    lastUpdated: '最后更新时间',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑此网站',
    repo: 'https://gitee.com/login',
    footer: {
      message: ' Released under the MIT License.',
      copyRigtht: 'Copyright @ 2022-present Z K'
    },
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      {
        text: '快速开始',
        link: '/components/icon',
        activeMatch: '/components/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quieStart' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [{ text: 'Icon', link: '/components/icon' }]
        }
      ]
    }
  }
}
