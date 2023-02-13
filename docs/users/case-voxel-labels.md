---
title: Editing Voxel Labels
---

## ボクセルラベルに対する操作

DICOM Viewer Component 上部のツールバーで、ボクセルラベルに対する操作を選択します。下図のアイコンは左側より以下の通りです。

![Painting tools](case-detail-painting-tools.png)

<dl>
<dt><Icon icon="rs-icon-brush" /> ブラシ (<kbd>B</kbd>)</dt>
<dd>クリックした位置を四角いペンで塗ります。</dd>
<dt><Icon icon="rs-icon-eraser" /> 消しゴム (<kbd>E</kbd>)</dt>
<dd>クリックした位置のラベルを消去します。</dd>
<dt>ブラシ・消しゴムの太さ設定</dt>
<dd>プルダウンメニューでブラシ・消しゴムの太さを設定します。</dd>
<dt><Icon icon="rs-icon-bucket" /> バケツツール (<kbd>Shift</kbd>+<kbd>B</kbd>)</dt>
<dd>クリックした位置から連結している同じラベル値の領域を塗りつぶします。</dd>
<dt><Icon icon="rs-icon-bucket-erase" /> バケツ消去ツール (<kbd>Shift</kbd>+<kbd>E</kbd>)</dt>
<dd>クリックした位置から連結している同じラベル値の領域を消去します。</dd>
<dt><Icon icon="rs-icon-wand" /> ワンドツール (<kbd>M</kbd>)</dt>
<dd>背景画像の画素値に対し、クリックした位置の画素値から一定範囲の画素値を持つ画素を塗ります。スレッショルドと最大距離をオプションで設定できます。</dd>
<dt><Icon icon="rs-icon-wand-eraser" /> ワンド消去ツール (<kbd>Shift</kbd>+<kbd>M</kbd>)</dt>
<dd>背景画像の画素値に対し、クリックした位置の画素値から一定範囲の画素値を持つ画素を消去します。</dd>
</dl>

:::note

全ボリュームデータの読込が完了するまでの間（ローディングインジゲータが表示されている間）は、ワンドツールおよびワンド消去ツールは有効になりません。

:::

## 作成したラベルに対する処理

"Series/Labels" の […] より、アクティブな ラベルに対して Connected Component Analysis (Connected component labeling (CCL)、Hole filling)、Mathematical Morphology (erosion、dilation、interslice interpolation) 、oblique 断面の自動生成を行うことができます。

![Label processor menu](case-detail-label-processor-menu.png)

### Connected Component Analysis

#### Connected Component Labeling (CCL)

アクティブな voxel ラベルを 3 次元で連結する voxel ごとに別のラベルに分割します。

最大連結要素数 N
: 体積が大きい順に N 個の voxel ラベルを新たに作成し、それ以外の領域はひとつの voxel ラベルにまとめて表示する

近傍数
: 連結判定モード（6 近傍または 26 近傍）

最大一時ラベル数
: 計算時の一時ラベル数

![CCL result](case-detail-CCL-result.png)

#### Hole Filling

アクティブな voxel ラベルの穴埋めをします。

次元数
: 2 次元ベース（断面ごとの処理）の処理か 3 次元ベースの処理かを選択

Orientation
: 2 次元の時のみ選択可能。ここで指定した方向のスライスごとに処理を行う

近傍数
: 連結判定モード（2 次元の場合は 4 または 8 近傍、3 次元の場合は 6 または 26 近傍）

最大一時ラベル数
: 計算時の一時ラベル数

![Hole filling result](case-detail-hole-filling-result.png)

:::note
複雑な形状の voxel ラベルで CCL および Hole filling を行う場合、最大一時ラベル数を増やすと計算可能となる場合があります。設定可能な最大一時ラベル数の上限は使用 PC のメモリに依存します。
:::

### Mathematical Morphology

#### erosion

アクティブな voxel ラベルの erosion をします。

Width
: 構造要素の横幅

Height
: 構造要素の縦幅

nSlices
: 構造要素の奥行

Structuring element
: 構造要素の形状

![Erosion result](case-detail-erosion-result.png)

#### dilation

アクティブな voxel ラベルの dilasion をします。

Width
: 構造要素の横幅

Height
: 構造要素の縦幅

nSlices
: 構造要素の奥行

Structuring element
: 構造要素の形状

![Dilation result](case-detail-dilation-result.png)

#### interslice interpolation

アクティブな voxel ラベルの スライス間補間 をします。

Orientation
: 補間するスライスの指定

![Dilation result](case-detail-interslice-interpolation-result.png)
