export default {
  subRoots: {
    pages: 'pages',
    api: 'api',
    parts: 'parts',
  },
  siteGroup: {
    g1: 'Group1',
    g2: 'Group2',
  },
  pages: [
    {
      uri: '/sample/templates/index.html',
      description: 'テンプレート機能を使ったサンプルページです',
      variations:
        {
          pc: [
            {
              group: 'g1',
              label: 'default',
              baseFile: 'index.html',
              description: 'デフォルト'
            },
            {
              group: 'g1',
              label: 'extend',
              baseFile: 'index.html',
              description: 'manipulateを使った置換',
              manipulate: {
                '.extend': 'extend.html'
              }
            },
            {
              group: 'g1',
              label: 'nested',
              baseFile: 'index.html',
              description: 'manipulateを使った入れ子置換',
              manipulate: {
                '.extend': 'extend.html',
                'li:last-child': 'nested.html'
              }
            },
            {
              group: 'g1',
              label: 'ssi',
              baseFile: 'index-ssi.html',
              description: 'SSI形式のカスタムタグによる置換'
            }
          ],
          sp: [
            {
              group: 'g1',
              label: 'ssi',
              baseFile: 'index-ssi.html',
              description: 'SSI形式のカスタムタグによる置換'
            }
          ]
        }
    },
    {
      uri: '/sample/switch/index.html',
      description: '同一のURIに対してグループ別に異なるリソースを返す例です',
      device: 'sp',
      variations: [
        {
          group: 'g1',
          label: 'index',
          baseFile: 'index-g1.html',
          description: 'index-g1.htmlを返します'
        },
        {
          group: 'g2',
          label: 'index',
          baseFile: 'index-g2.html',
          description: 'index-g2.htmlを返します'
        }
      ]
    },
    {
      uri: '/sample/changeBaseDir/index.html',
      description: 'ページ固有のbaseDirを設定した時の例です',
      baseDir: 'alternative/pages',
      variations: [
        {
          label: 'basePath',
          baseFile: 'index.html',
          description: 'このファイルは alternative/pages に配置されています'
        },
        {
          label: 'manipulated',
          baseFile: 'customPartsDir.html',
          description: 'HTMLテンプレートも alternative/pages 配下に置く必要があります',
          manipulate: {
            '.extend': '_extend.html'
          }
        }
      ]
    },
    {
      uri: '/sample/changePartsDir/index.html',
      description: 'ページ固有のpartsDirを設定した時の例です',
      partsDir: 'alternative/parts',
      variations: [
        {
          label: 'default',
          baseFile: 'index.html',
          description: 'HTMLテンプレートは alternative/parts から取得されます',
          manipulate: {
            '.extend': '_extend.html'
          }
        }
      ]
    },
    {
      uri: '/sample/hash/index.html',
      description: 'URLハッシュを付与した状態の画面遷移の例です',
      variations: [
        {
          'label': 'hash',
          'hash': 'anchor',
          'description': '#anchorに遷移します',
          'baseFile': 'index.html'
        }
      ]
    }
  ]
}