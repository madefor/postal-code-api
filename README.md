# 郵便番号API v1-beta

[![Build Status](https://travis-ci.org/miya0001/postal-code-api.svg?branch=master)](https://travis-ci.org/miya0001/postal-code-api)

## エンドポイント

```
http://miya0001.github.io/postal-code-api/api/v1/
```

## 使い方

郵便番号が`100-0014`(東京都千代田区永田町)の住所を取得したい場合。

http://miya0001.github.io/postal-code-api/api/v1/100/0014.json

```
{
  "zipcode": "1000014",
  "prefcode": "13",
  "prefecture": "東京都",
  "address1": "千代田区",
  "address2": "永田町　"
}
```

## 注意事項

このAPIは、まだテスト中です。エンドポイントのURLが変更になる可能性があります。

## ライセンス

MIT
