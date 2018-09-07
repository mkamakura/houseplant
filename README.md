# houseplant

`houseplant`はHTMLモックを管理するためのツールです。

## How to use

### 基本設定

1. `houseplant.json` の作成

```houseplant.json
{
  "port": 8180,
  "host": "localhost",
  "rootDir": "mocks",
  "configureName": "configure.js",
}
```

| key | type | default | 説明 |
| ---- | --- | --- | --- |
| port | number | 8080 | モックサーバーのポート番号 |
| host | string | 0.0.0.0 | モックサーバーのホスト名   |
| rootDir | string |  mocks | HTMLモックのディレクトリ |
| configureName | string | configure.js | HTMLモックの設定ファイル名 |


### HTMLモック設定

1. 設定ファイルの作成

ファイルは`houseplant.json`の`${rootDir}/${configureName}`となる
設定は `mocks/configure.js` を参照してください。

### 起動
```
$ npm install
$ npm run dev
```
