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

## 注意事項

このAPIは、まだテスト中です。エンドポイントのURLが変更になる可能性があります。

## ライセンス

MIT
