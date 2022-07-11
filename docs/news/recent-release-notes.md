---
title: CIRCUS  release notes
---

## v1.1.0

6 July 2022

### CIRCUS-DB 関連

- label colors を修正し、label colors を default/customize から選択できるようにしました。(https://github.com/utrad-ical/circus/pull/286)
- ラベルの複製・voxel ラベルの論理演算が追加されました。(https://github.com/utrad-ical/circus/pull/281)
- preferences でラベルの初期 α 値の設定が可能になりました。(https://github.com/utrad-ical/circus/pull/284)
- Improve annotation draw (https://github.com/utrad-ical/circus/pull/282)

### CIRCUS-CS 関連

- CIRCUS CS プラグインの結果表示に自作の viewer を利用できるようになりました。(https://github.com/utrad-ical/circus/pull/161)

### その他

- セッション復元時のフラグを追加しました。(https://github.com/utrad-ical/circus/pull/269)
- 新しいタブで 2 つ以上 CIRCUS を開いたとき login 情報が共有されるようになりました。(https://github.com/utrad-ical/circus/pull/226)
- web worker を明示的に終了させました。(https://github.com/utrad-ical/circus/pull/285)
- Fix setting name mismatch for checkQueueInterval (https://github.com/utrad-ical/circus/pull/275)
- Create api for determining series orientation (https://github.com/utrad-ical/circus/pull/272)

#### MongoDB transaction 導入関連

- Dockerfile 修正 (https://github.com/utrad-ical/circus/pull/263, https://github.com/utrad-ical/circus/pull/274)
- Introduce transactionManager to DicomImporter (https://github.com/utrad-ical/circus/pull/271)
- Change dependency name (https://github.com/utrad-ical/circus/pull/250, https://github.com/utrad-ical/circus/pull/251)
- Enable MongoDB transaction (https://github.com/utrad-ical/circus/pull/204)

#### onetime URL 導入関連

- Implement login with onetime URL (https://github.com/utrad-ical/circus/pull/273)
- Add default auth provider to service loader (https://github.com/utrad-ical/circus/pull/262)
- Create endpoint to issue onetime URL (https://github.com/utrad-ical/circus/pull/246)

## [v1.1.0-experimental.1](https://hub.docker.com/layers/circuscad/circus/1.1.0-experimental.1/images/sha256-f34b1a30eb6c951851d8e356b6f16583a13f8201fe8a1fd91f75eaf341a7ddea?context=explore)

7 Feb 2022 (6 Jun 2021 以降の更新のみ)

### CIRCUS-DB 関連

- CCL(Connected component labeling)・Hole filling において計算時の仮ラベル数を可変にすることで、複雑な形状でも計算が可能になりました。(https://github.com/utrad-ical/circus/pull/214)
- ボクセルラベルに対する操作に Erosion・Dilation・Interslice interpolation を追加しました。(https://github.com/utrad-ical/circus/pull/209) -> [Document へ移動](../users/case-detail#mathematical-morphology)
- 2D 画像の表示とアノテーションに対応しました。(https://github.com/utrad-ical/circus/pull/207)
- Click & Drag で一度に複数ラベルの表示・非表示の変更が可能になりました。(https://github.com/utrad-ical/circus/pull/198)
- Revision を保存する時のメッセージを、定型文・履歴から選択できるようになりました。Revision の定型文は Tool > Preferences で保存可能です。(https://github.com/utrad-ical/circus/pull/196)
- 編集中にページを移動・更新する際にアラートにて警告を追加しました。(https://github.com/utrad-ical/circus/pull/195)
- CCL・Hole filling のバグを修正しました。(https://github.com/utrad-ical/circus/pull/189)
- WL(Window level) と WW(Windwon width) を manual で編集する際、現在の WL・WW が表示されるようになりました。(https://github.com/utrad-ical/circus/pull/187)
- 入力した 3 点から oblique を表示する(Three points to section)を実装しました。(https://github.com/utrad-ical/circus/pull/174) -> [Document へ移動](../users/case-detail#oblique-断面の自動生成)
- CCL・Hole filling を Web Worker で再実装しました。(https://github.com/utrad-ical/circus/pull/172)

### Web UI 関連

- 検索画面(Series Search / Case Search / Plugin Job Search)におけるページネーションのバグを修正しました。(https://github.com/utrad-ical/circus/pull/218)
- Tool > Preferences における Color theme が Black の時の表示を修正しました。(https://github.com/utrad-ical/circus/pull/210)
- Tool > Preferences で変更可能だった CIRCUS-DB の設定の一部が CIRCUS-DB の歯車からも可能になりました。(https://github.com/utrad-ical/circus/pull/202)
- CIRCUS-DB/CIRCUS-CS で検索画面から各 case/job を表示した時、前後の case/job に直接移動できるようになりました。(https://github.com/utrad-ical/circus/pull/195)
- Tool > Preferences に CIRCUS-DB の設定を追加しました。(https://github.com/utrad-ical/circus/pull/182/files)

### CIRCUS-RS 関連

- WebGL を用いた MPR の描画、VR を改良しました。(https://github.com/utrad-ical/circus/pull/193)
- RS devserver 起動時にアイコンが表示されないバグを修正しました。(https://github.com/utrad-ical/circus/pull/183)
- pixel 間の interpolation が有効になっている時の MPR 表示速度が改善しました。(https://github.com/utrad-ical/circus/pull/179)

### その他

- Add "job status" as a job search condition. (https://github.com/utrad-ical/circus/pull/205/files)
- Case の削除を実装しました。(https://github.com/utrad-ical/circus/pull/197/files)
- Lerna から NPM workspace に切り替えました。(https://github.com/utrad-ical/circus/pull/176)
- Export case with revision index. (https://github.com/utrad-ical/circus/pull/170/files)
- pm2(2.10.4 → 5.1.0) と pify(3.0.0 → 5.0.0) を update しました。(https://github.com/utrad-ical/circus/pull/166)
- PAM (pluggable authentication mechanism) を導入しました。(https://github.com/utrad-ical/circus/pull/159)
- Series import で tar.gz ファイルに対応しました。(https://github.com/utrad-ical/circus/pull/158/files)
