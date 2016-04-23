# 郵便番号API BETA

[![Build Status](https://travis-ci.org/miya0001/postal-code-api.svg?branch=master)](https://travis-ci.org/miya0001/postal-code-api)

このAPIはまだテスト中です。

## エンドポイント

```
https://miya0001.github.io/postal-code-api/api/v1/
```

## 使い方

郵便番号が`100-0014`(東京都千代田区永田町)の住所を取得したい場合。

https://miya0001.github.io/postal-code-api/api/v1/100/0014.json

```
{
  "zipcode": "1000014",
  "prefcode": "13",
  "ja": {
    "prefecture": "東京都",
    "address1": "千代田区",
    "address2": "永田町"
  },
  "en": {
    "prefecture": "TOKYO TO",
    "address1": "CHIYODA KU",
    "address2": "NAGATACHO"
  }
}
```

## 仕組み

* Gulpタスクで以下の処理を行っています。
  1. [日本郵便のウェブサイト](http://www.post.japanpost.jp/zipcode/)から[郵便番号データ](http://www.post.japanpost.jp/zipcode/dl/roman-zip.html)をダウンロード。
  2. ダウンロードしたファイルを解凍して、取り出したCSVをパース。
  3. 郵便番号の上3桁の名前を持つディレクトリを作り、その中に下4桁の名前を持つJSONを作成。
* 上述の処理をTravis CIで実行し、その結果をgh-pagesにpushしています。
  * 郵便番号データの最後の行にある沖縄県八重山郡与那国町のJSONがあるかどうかをチェックし、すべてのJSONが生成されたものとしています。いいテスト方法があればぜひプルリクエストをお願いします。

## ローカルでの実行

このリポジトリをcloneしてください。

```
$ git@github.com:miya0001/postal-code-api.git
```

必要なモジュールをインストールしてください。

```
$ cd postal-code-api
$ npm install
```

以下のコマンドでAPIを生成してください。

```
$ npm run build
```

## 注意事項

このAPIは、まだテスト中です。エンドポイントのURLが変更になる可能性があります。

## ライセンス

MIT
