export default {
  rootDir: './mocks',
  pages: [
    {
      uri: '/top/index.html',
      baseDir: '/top',
      baseFile: 'index.html',

      title: 'TOPページ',
      description: 'TOPページ',

      patterns: [
        {
          title: '0件パターン',
          manipulates: [
            {
              selector: '.list',
              file: 'zero.html',
            }
          ]
        }
      ]
    },
  ]
}