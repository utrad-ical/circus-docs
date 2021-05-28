---
title: Series Search
---

## Series Search 画面の表示方法

画面上部のメニューより[Series] - [Series Search]を選択するとSeries Search画面が表示されます。

![Menu - Series Search](menu-series-search.png)

:::tip

ホーム画面中央の[Series Search]ボタンをクリックしても表示されます。

:::

## 検索条件の設定

Series Search画面の上部の"Search Condition"にて検索条件を設定します。検索条件の設定方法として、BasicおよびAdvancedの2種類があります。 それぞれはタブによって切り替えることが出来ます。

:::note

検索条件設定画面が表示されていない場合は"Search Condition"上部の &#9660; をクリックします。

:::

### Basic

Basicでは基本的な検索条件により検索ができます。

![Search condition (Basic)](series-search-basic-condition.png)


### Advanced

Advancedでは検索条件をより詳細に設定することができます。Basicにはない検索項目(import date)を用いた検索も行うことができます。

![Search condition (Advanced)](series-search-advanced-condition.png)

### 検索条件の保存(preset)

よく使用する検索条件をpresetとして保存することができます。検索条件設定画面下部の[Save]ボタンをクリックすると、preset nameを設定するダイアログが表示されますので、名前を設定して[OK]ボタンをクリックします。

![Set preset name](search-preset-dialog.png)

保存したpresetはメニューの[Seres]より呼び出すことができます。

![Menu - Series preset](menu-series-search-preset.png)


## 検索結果のリスト表示

検索結果は画面下部に表示されます。

![Set preset name](series-search-list.png)

- リスト各行の"Uid"列にある虫眼鏡アイコンをクリックすると、そのseriesのStudy Instance UIDならびにSeries Instance UIDが表示されます。それぞれのUIDをクリップボードにコピーすることもできます。 

- リスト各行の[View]ボタンをクリックすると、Series Detail画面が表示されます。Series Detail画面では画像とSeriesの詳細情報が表示されます。

  ![Set detail](series-detail.png)

- リスト各行の[+ New]はプルダウンメニューとなっています。
  - "New Case"を選択すると、そのシリーズを含むCase(CIRCUS DB)新規登録画面が表示されます。
  - "New Job"を選択すると、そのシリーズを含むPlug-in job(CIRCUS CS)新規登録画面が表示されます。


