---
title: Case Detail
---

Case Search の検索結果のリスト各行にある [View] ボタンをクリックすると、Case Detail 画面が表示されます。Case Detail 画面ではラベルおよび属性情報の入力を行います。

## Case Detail 画面の構成

Case Detail 画面は以下の要素で構成されています。

![Case Detail](case-detail-all.png)

### Case Info

Case ID、患者情報（患者情報表示権限を有する場合）、プロジェクト名、タグが表示されます。

### Revision

現在表示しているリビジョンの情報が表示されています。プルダウンメニューになっているので表示するリビジョンを切り替えることも可能です。

### DICOM Viewer Component

DICOM シリーズより生成したボリュームデータが表示されます。初期状態では axial 断面のほかに MPR(coronal, sagittal, oblique)の 4 断面が表示されます。

### Series / Labels

ケースに属しているシリーズ、ならびに各シリーズに属しているラベルの情報が表示されるとともに、ラベルの属性情報の入力インターフェイスがあります。

### Case Attributes

ケースの属性情報の入力インターフェイスがあります。

## DICOM Viewer Component の操作

### 左ドラッグ時の操作

DICOM Viewer Component 左上のツールバーで、マウスの左ドラッグ時の操作を選択できます。下図のアイコンは左側より以下の通りです。

![Tool for left drag](case-detail-tool-for-left-drag.png)

- Paging（<kbd>P</kbd> キー）

  - 画像のスクロール（ページング）を行います。

- Zoom（<kbd>Z</kbd> キー）

  - 画像のズームを行います。アイコン右側のプルダウンメニューにより、現在の表示画像を一定の倍率でズームすることもできます (×8, ×4, ×2, ×1/2, ×1/4, ×1/8)。

- Hand（<kbd>H</kbd> キー）

  - 画像の表示位置を移動させることができます。

- Window（<kbd>W</kbd> キー）
  - 画像の表示条件 (Window Level, Window Width) を変えることができます。アイコン右側のプルダウンメニューで登録済のプリセット値への変更や、マニュアルでの設定が行えます。

### 画像のスクロール

DICOM Viewer Component の画像は以下の方法でスクロールすることができます。

- マウス左ドラッグ操作を Pager に設定（Pager アイコンをクリック、もしくは <kbd>P</kbd> キーを押す）した上で、スクロールしたい断面で左ドラッグをします。

- スクロールしたい断面でマウスカーソルを合わせて、マウスホイールでスクロールします。

- 設定ツールバーの [Scroll bars] で [Small] もしくは [Large] を選択し（左下図）、スクロールしたい断面の右端にマウスカーソルを合わせるとスクロールバーが表示されます（右下図）。

  | ![Scrollbar setting](case-detail-scrollbar-setting.png) | ![Scrollbar setting](case-detail-scrollbar-display.png) |
  | :-----------------------------------------------------: | :-----------------------------------------------------: |
  |                  スクロールバーの設定                   |                  スクロールバーの表示                   |

### 画面表示の切替

初期状態は axial 断面、coronal 断面、sagittal 断面、oblique 断面が 2 行 ×2 列で表示されていますが、ツールバーにて axial、coronal、sagittal のみの表示に切り替えることができます。

![Select view](case-detail-select-view.png)

### リファレンス線、補間

DICOM Viewer Component 上部の歯車アイコンより "Show reference line" を選択するとリファレンス線を表示されます。

Triliear filtering を選択すると表示画像に対して線形補間が行われます（選択しない場合は nearest neighbor 法による補間）。表示は滑らかになりますが、表示速度は遅くなります。

![Viewer settings](case-detail-viewer-settings.png)

## ラベルの新規入力

"Series/Labels" の [Add ●] の右側のプルダウンメニューよりラベルの種類を選択します。

![Add label](add-label.png)

CIRCUS DB で実装しているラベルは以下の通りです。

### voxel

ボクセル単位で塗りつぶすラベルです。

### ROI (2D/3D)

CIRCUS DB では 2D および 3D の関心領域 (ROI) をラベルとすることもできます。初期状態ではラベル追加時の画像の中心に設置されます。

#### cuboid (3D)

直方体 ROI です。初期状態では立方体です。

#### ellipsoid (3D)

楕円体 ROI です。初期状態では正球です。

#### rectangle (2D)

長方形 ROI です。初期状態では正方形です。

#### ellipse (2D)

楕円 ROI です。初期状態では正円です。

:::tip

2D ROI は設定したスライスの上下 3 スライスでは半透明で表示されます。

:::

### point

点状のラベルです。初期状態ではラベル追加時の画像の中心に設置されます。

### ruler

サイズ計測用ラベルです。初期状態ではラベル追加時の画像の中心に設置されます。

## ボクセルラベルに対する操作

DICOM Viewer Component 上部のツールバーで、ボクセルラベルに対する操作を選択します。下図のアイコンは左側より以下の通りです。

![Painting tools](case-detail-painting-tools.png)

- ブラシ (<kbd>B</kbd>)
  - クリックした位置を四角いペンで塗ります。
- 消しゴム (<kbd>E</kbd>)
  - クリックした位置のラベルを消去します。
- ブラシ・消しゴムの太さを設定
  - プルダウンメニューでブラシ・消しゴムの太さを設定します。
- バケツツール (<kbd>Shift</kbd>+<kbd>B</kbd>)
  - クリックした位置から連結している同じラベル値の領域を塗りつぶします。
- バケツ消去ツール (<kbd>Shift</kbd>+<kbd>E</kbd>)
  - クリックした位置から連結している同じラベル値の領域を消去します。
- ワンドツール (<kbd>M</kbd>)
  - 背景画像の画素値に対し、クリックした位置の画素値から一定範囲の画素値を持つ画素を塗ります。
    ![Setting of wand tool](wand-tool-setting.png)
- ワンド消去ツール (<kbd>Shift</kbd>+<kbd>M</kbd>)
  - ワンドツールの逆の操作を行います。

:::note

ボリュームデータの読込が完了するまでの間は、ワンドツールおよびワンド消去ツールは無効のままです。

:::

### Connected component analysis

"Series/Labels" の […] より、アクティブな voxel ラベルに対して Connected component labeling(CCL)、Hole filling を行うことができます。

![Connected component analysis menu](case-detail-connected-component-analysis-menu.png)

#### Connected component labeling (CCL)

アクティブな voxel ラベルを 3 次元で連結する voxel ごとに別のラベルに分割します。

| 設定オプション           | 範囲    | 詳細                                                                                                      |
| ------------------------ | ------- | --------------------------------------------------------------------------------------------------------- |
| 表示する最大連結要素数 N | 1 ～ 10 | 体積が大きい順に N 個の voxel ラベルを新たに作成し、それ以外の領域は一つの voxel ラベルにまとめて表示する |
| 近傍数                   | 6、26   | 連結判定に使用                                                                                            |

![CCL result](case-detail-CCL-result.png)

#### Hole filling

アクティブな voxel ラベルの穴埋めをします。

| 設定オプション | 範囲                    | 詳細               |
| -------------- | ----------------------- | ------------------ |
| 次元数         | 2、3                    |                    |
| Orientation    | Axial、Sagital、Colonal | 2 次元の時のみ選択 |
| 近傍数         | 6、26                   | 連結判定に使用     |

![Hole filling result](case-detail-hole-filling-result.png)

:::caution
CCL および Hole filling は計算途中で voxel ラベルの分割数が 255 を超える複雑な形状には対応していません。
:::

## ROI の移動・サイズ変更

### 移動

マウスカーソルを ROI の端に合わせると、マウスカーソルが十字矢印に変わります。マウスの左ボタンを押しながらドラッグすると ROI が移動します。

### サイズ変更

マウスカーソルを ROI の端にある &#9633; に合わせると、マウスカーソルが両矢印に変わります。マウスの左ボタンを押しながらドラッグをすることで ROI のサイズを変えられます。

- <kbd>Shift</kbd> キーを押しながらサイズを変えると各軸のアスペクト比が維持されます。
- <kbd>Ctrl</kbd> キーを押しながらサイズを変えると ROI の中心が固定された状態でサイズが変わります。

## Undo / Redo / Revert

- 画面右上 [Save] ボタンの左側にある &#x25C0;、&#x25B6; ボタンで操作の undo、redo が行えます(undo は Ctrl キー+Z キーでも行えます）。
- 画面右上 [Save] ボタンの右側にあるメニューボタンより [Revert] を選択すると、Revision の最初の状態まで戻すことができます。ただし、Revert した場合はこれまでの操作の記録が消去されます。

![Undo, redo, and menu button](case-detail-menu-button.png)

## エクスポート

ケースのデータ（元画像、voxel ラベルのボリュームデータ、属性情報）をダウンロードするためには、画面右上のメニューボタンから [Export as MHD] を選択します。以下のダイアログが表示されますので、条件を選択した上で、[Start download] ボタンをクリックします。

- Voxel labels
  - 現在はラベル毎に別々のボリュームで出力する (Isolated) か、全てのラベルを 1 つのボリュームで出力するかを選択します。
- MHD file line endings
  - mhd ファイルの改行コードを LF (Linux)、CR + LF (Windows) を選択します。
- Comression format
  - エクスポートデータの圧縮形式を選択します(tar.gz or ZIP)。

![Export one case](export-one-case-dialog.png)

### 生成されるデータ

#### vol[シリーズ番号].mhd (+.raw)

シリーズの元画像のボリュームデータです。

#### vol[シリーズ番号]\_label[ラベル番号].mhd (+.raw)

voxel ラベルデータです。

#### data.json

症例の属性情報 (JSON 形式) です。

:::tip

ROI、point、ruler の情報は data.json に含まれます。位置はボリュームの左上ボクセルを原点とした mm 単位で書かれています。

:::
