---
title: DICOM Storage Server
---

CIRCUS システムへの画像の転送方法として、DICOM Store SCP による Storage Server を使用することもできます。

## 準備

1.  Docker Hub より DICOM Storage Server の Docker image を取得します。

    ```
    $ sudo docker pull circuscad/dicom_storage_server:latest
    ```

    :::tip

    - latest は取得時点での推奨版です。対応するバージョンは予告なく変更されます。
    - 長期運用時には `latest` の代わりにバージョンを指定して取得されることをお勧めします。
    - Docker Hub 上にある CIRCUS の最新版は以下のサイトでご確認ください。
      - https://hub.docker.com/u/circuscad

    :::

1.  [Parmanent access token の作成](access-token.md)の手順で管理権限を持つユーザの parmanent access token を取得します。

1.  CIRCUS コンテナの内部の IP アドレスを取得します。

    ```
    $ sudo docker inspect <container ID> | grep "IPAddress"
    ```

    - 起動中の Docker コンテナの ID を調べるためには "docker ps -a" を実行します。

## DICOM storage server の起動方法

    # docker run --rm -d -e AE_TITLE=[AE title] -e COMPRESS_MODE=1 -e VERBOSE_MODE=0 -e IMPORTER_ADDRESS=[サーバコンテナの内部 IP アドレス] -e IMPORTER_TOKEN=[access token] -e IMPORTER_DOMAIN=[domain] -v /var/circus:/var/circus -p [ホスト側のポート]:4006 circuscad/dicom_storage_server:letest
