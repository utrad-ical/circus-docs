---
title: Access token
---

## Parmanent access token の作成

CIRCUS の API を使用する場合や、DICOM Storage Server の Docker image を使用するためには、使用するユーザの parmanent access token を作成する必要があります。

### Web 画面にて作成

画面上部のメニューより[Tool] - [Access Tokens]を選択すると永続接続トークンの作成画面が表示されます。

1. トークンを作成するためには、画面下部の"Add new token"のテキストボックスにを短い説明文を入力し、[Create]ボタンをクリックします。

![Add new token](add-new-token.png)

2. すると token が生成されますので、token をコピーして、適切に保管してください（token 右側のアイコンをクリックするとクリップボードにコピーされます）。

![Token created](token-created.png)

:::caution

上記画面で表示されている token は再度表示されません。access token はユーザログインの代わりとなるものですので、厳重に保管してください。

:::

### コマンドラインにて作成 (Docker 版 CIRCUS の場合)

CIRCUS の Docker image で /bin/bash を実行し、以下のコマンドを実行します。

    # /root/servicies.sh & (バックグラウンド実行)
    # cd /var/circus/circus-api
    # node circus add-permanent-token [ユーザ名(circus or 他ユーザ)]
