---
title: Series Import
---

DICOMファイルをCIRCUSシステムに転送する方法の1つとして、Series Import画面によるDICOMファイルのアップロードがあります。

## Series Import 画面の表示方法

画面上部のメニューより[Series] - [Series Import]を選択するとSeries Import画面が表示されます。

![Menu - Series Import](menu-series-import.png)

:::tip

ホーム画面中央の[Series Import]ボタンをクリックしても表示されます。

:::

## 同時アップロードが可能なファイル数・サイズ

Series Import画面で同時アップロードが可能なファイル数・サイズは以下の通りです。DICOMファイルのほかに、複数のDICOMファイルがまとめられたZIPファイルも対応しています。

- 最大ファイル数：30
- 最大ファイルサイズ（合計）：200 MB

:::important

Series Import画面を使ったDICOMファイルのアップロードでは、DICOMファイルの圧縮／非圧縮はそのまま維持されます（可逆圧縮や圧縮なしへの変換は行われません）。

:::

## アップロード手順

1. 画面中央の[Select File]ボタンをクリックしてアップロードファイルを選択するか、アップロードしたいファイルを灰色の領域へドラッグ＆ドロップします。

    ![Series Import: initial](series-import-initial.png)

1. アップロードするファイルの所属ドメインを選択してから、[Upload]ボタンをクリックします。確認ダイアログが表示されますので、問題が無ければ[OK]ボタンをクリックしてアップロードを開始します。

    ![Series Import: file added](series-import-file-added.png)

1. アップロード処理を開始すると、画面上部に"Import process has been started. See tasks page."と表示されます。
    - アップロードはタスクによるバックグラウンド処理にて行われます。

    ![Series Import: task started](series-import-task-started.png)  

1. 画面上部の鐘アイコンをクリックすると、ファイルのアップロード処理（バックグラウンド処理）の状況が確認できます。

    ![Series Import: task status](series-import-task-status.png)