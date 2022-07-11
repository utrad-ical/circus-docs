---
title: CIRCUS  Release Notes
---

## v1.1.0

6 July 2022

### Web UI

- Added one-time URL mechanism which allows users to log-in to the web UI without IDs and passwords. Only administrative users with the `issueOneTime` priviledge can issue one-time URLs. Issued URLs are valid for one minute.

### CIRCUS DB

- You can now define a custom palette for label colors. (#286)
- You can now duplicate labels and perform boolean operations against voxel labels. (#281)
- You can now specify initial alpha values (opacity) for newly created labels. Note that existing labels will not be affected. (#284)
- Fixed memory leaks around history management and web workers. (#285)

### CIRCUS RS

- Annotation drawing algorithm have been improved. The viewer now strictly distinguishes on-screen view state and on-render view state. (#282)

### CIRCUS CS

- You can now use custom Display to show plug-in results. (#161)

### Misc

- Login sessions are now shared across multiple browser tabs. (#226)
- Fix: `checkQueueInterval` option was not used. (#275)
- Added an API endpoint for determining series orientation. (#272)
- Fixed several bugs regarding session management. (#269)
- Internally, CIRCUS now uses MongoDB's transactions to keep stored data consistent.

## [v1.1.0-experimental.1](https://hub.docker.com/layers/circuscad/circus/1.1.0-experimental.1/images/sha256-f34b1a30eb6c951851d8e356b6f16583a13f8201fe8a1fd91f75eaf341a7ddea?context=explore)

7 Feb 2022 (6 Jun 2021 以降の更新のみ)

### CIRCUS DB

- CCL(Connected component labeling)・Hole filling において計算時の仮ラベル数を可変にすることで、複雑な形状でも計算が可能になりました。(#214)
- ボクセルラベルに対する操作に Erosion・Dilation・Interslice interpolation を追加しました。(#209) -> [Document へ移動](../users/case-detail#mathematical-morphology)
- 2D 画像の表示とアノテーションに対応しました。(#207)
- Click & Drag で一度に複数ラベルの表示・非表示の変更が可能になりました。(#198)
- Revision を保存する時のメッセージを、定型文・履歴から選択できるようになりました。Revision の定型文は Tool > Preferences で保存可能です。(#196)
- 編集中にページを移動・更新する際にアラートにて警告を追加しました。(#195)
- CCL・Hole filling のバグを修正しました。(#189)
- WL(Window level) と WW(Windwon width) を manual で編集する際、現在の WL・WW が表示されるようになりました。(#187)
- 入力した 3 点から oblique を表示する(Three points to section)を実装しました。(#174) -> [Document へ移動](../users/case-detail#oblique-断面の自動生成)
- CCL・Hole filling を Web Worker で再実装しました。(#172)

### Web UI

- 検索画面(Series Search / Case Search / Plugin Job Search)におけるページネーションのバグを修正しました。(#218)
- Tool > Preferences における Color theme が Black の時の表示を修正しました。(#210)
- Tool > Preferences で変更可能だった CIRCUS-DB の設定の一部が CIRCUS-DB の歯車からも可能になりました。(#202)
- CIRCUS-DB/CIRCUS-CS で検索画面から各 case/job を表示した時、前後の case/job に直接移動できるようになりました。(#195)
- Tool > Preferences に CIRCUS-DB の設定を追加しました。(#182)

### CIRCUS-RS 関連

- WebGL を用いた MPR の描画、VR を改良しました。(#193)
- RS devserver 起動時にアイコンが表示されないバグを修正しました。(#183)
- pixel 間の interpolation が有効になっている時の MPR 表示速度が改善しました。(#179)

### その他

- Add "job status" as a job search condition. (#205)
- Case の削除を実装しました。(#197)
- Lerna から NPM workspace に切り替えました。(#176)
- Export case with revision index. (#170)
- pm2(2.10.4 → 5.1.0) と pify(3.0.0 → 5.0.0) を update しました。(#166)
- PAM (pluggable authentication mechanism) を導入しました。(#159)
- Series import で tar.gz ファイルに対応しました。(#158)
