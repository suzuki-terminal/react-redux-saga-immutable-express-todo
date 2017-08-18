# React Todo Example

## 主要ライブラリ

- react
- redux
- redux-saga
- immutable

## セットアップ

```
npm install
npm start
```

open [http://localhost:8080](http://localhost:8080)


## Immutable.js 導入のメリット・デメリット

### メリット

- Containerのインターフェースの記述が楽になり、ViewとModelで2重定義のようにならない.
- 差分更新の判定が、参照の比較のみになるため、チューニングが割りと簡単に行える.
- ネストの深いデータの更新が、通常のデータより簡単に行える.


### デメリット

- Immutableなデータと通常のデータが混在するのが避けられない.
    - → propTypesを見れば一応判断はつく.

- 慣れていないと扱いづらい.
    - → Backendも関数型でイミュータブルなデータを扱っており, メソッド名もほぼ一緒のため割りと難なく使えそう.


## 規約的なもの

- reducerは一つの更新メソッド (update関数) のみにする.
- 状態変数および状態変更に関するロジックはmodelに記述する.
- 非同期処理や状態更新に関する一連の流れはsagaに記述する.
- updateアクションはsagaのみで利用する (viewで利用し始めると何でもできすぎるため).
- これらにより, 実行されたアクションは全てsagaで処理することになる.

機能を追加していくと, saga, modelが太ることになっていくが, sagaは単なる関数群であり, 処理の一連の流れを記述しているだけのため, 太ってもあまり影響がない.
modelが太るとクラス設計に影響が出るため, 太らないように分割していく必要がある.


## TODO

練習のため下記をやってみてください

- 削除時に, 確認のアラート・完了のアラートを表示する
- TODO名の変更機能を追加する
- フィルター (すべて, 完了, 未完了) を追加する
- ソート (作成日時の昇順, 降順) を追加する

