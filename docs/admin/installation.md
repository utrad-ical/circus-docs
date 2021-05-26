---
title: Installation
---

## CIRCUSシステムのインストール(Docker imageを使用)

Docker HubにてCIRCUSシステムのDocker imageを提供しています。こちらを使ってインストールするのが最も簡単です。

### CIRCUS のDocker image取得

Docker Hub より以下のDocker imageを pull します。

     # docker pull circuscad/circus:1.0.0-beta6
     # docker pull circuscad/dicom_utility:2.0.0-beta3


### 初期設定手順

CIRCUS システムの起動に必要なデータを作成するために以下の操作が必要となります。

1. ホスト側に /var/circus/data フォルダを作成します。

1. コンテナ内部でコマンドを実行するため、CIRCUS のDocker imageを使って /bin/bash を実行します。

        # sudo docker run --rm -v /var/circus/data:/var/circus/data -v /var/run/docker.sock:/var/run/docker.sock -p 80:80 -p 27017:27017 --add-host=hostmachine:[IP address for host] -it circuscad/circus:1.0.0-beta6 /bin/bash

:::tip

データベース(MongoDB)を外部から操作しない場合は "-p 27017:27017" は不要です。

:::

1. CIRCUSの Docker image内で以下のコマンドを実行し、データベースなどを構築します。

        # /root/data_initialize.sh

## 2 回目以降の起動手順

- デーモンとして起動させる場合(サーバ群が自動起動します)

      # sudo docker run -d --rm -v /var/circus/data:/var/circus/data -v /var/run/docker.sock:/var/run/docker.sock -p 80:80 -p 27017:27017 --add-host=hostmachine:[IP address for host] circuscad/circus:1.0.0-beta6

- コンテナ内部でコマンドを実行する場合(/bin/bash を起動)

      # sudo docker run --rm -v /var/circus/data:/var/circus/data -v/var/run/docker.sock:/var/run/docker.sock -p 80:80 -p 27017:27017 --add-host=hostmachine:[IP address for host] -it circuscad/circus:1.0.0-beta6/bin/bas

  - サーバ群を起動させるためにはコンテナ内で以下のスクリプトを実行する必要があります(バックグラウンドでの実行を推奨)。

        # /root/services.sh &

## 新バージョンのDocker imageを使用する場合

新バージョンのCIRCUSシステムのDocker imageを初めて使用する場合、CIRCUS の Docker image で /bin/bash を実行した上で、以下のコマンドを実行して内部データベースの情報の更新を行います。

    # /root/servicies.sh & 
    # cd /var/circus/circus-api
    # node circus migrate

:::warning

この操作でシステム内部データベースのrevisionが更新された場合、旧バージョンのDocker imageを使用することが出来ないため、事前にデータベース(MongoDB)のバックアップを取るなど、十分に注意してください。

:::