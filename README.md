# 郵便番号API v1-beta

[![Build Status](https://travis-ci.org/miya0001/postal-code-api.svg?branch=master)](https://travis-ci.org/miya0001/postal-code-api)

## エンドポイント

```
http://miya0001.github.io/postal-code-api/api/v1/
```

## 使い方

郵便番号が`649-3511`の住所を取得したい場合。

http://miya0001.github.io/postal-code-api/api/v1/649/3511.json

```
{
  "zipcode": "6493511",
  "prefcode": "30",
  "prefecture": "和歌山県",
  "address1": "東牟婁郡串本町",
  "address2": "鬮野川"
}
```

## 注意事項

このAPIは、まだテスト中です。エンドポイントのURLが変更になる可能性があります。

## ライセンス

MIT
