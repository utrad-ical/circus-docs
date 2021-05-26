---
title: DICOM Storage Server
---

CIRCUSシステムへの画像の転送方法として、DICOM Store SCPによるStorage Serverを使用することも可能です。

## 準備

1. Docker Hub よりDICOM Storage Server の Docker image を取得します。

        # docker pull circuscad/dicom_storage_server:1.0.0-beta

1. CIRCUSシステムのaccess token の取得

  - CIRCUS の Docker imageで /bin/bash を実行し、以下のコマンドを実行します。

            # /root/servicies.sh & (バックグラウンド実行)
            # cd /var/circus/circus-api
            # node circus add-permanent-token [ユーザ名(circus or 他ユーザ)]

1. CIRCUS コンテナの内部の IP アドレスを取得します。

        # docker inspect <container ID> | grep "IPAddress"

      - 起動中のDockerコンテナのIDを調べるためには "docker ps -a" を実行します。  

## DICOM storage server の起動方法

      # docker run --rm -d -e AE_TITLE=[AE title] -e COMPRESS_MODE=1 -e VERBOSE_MODE=0 -e IMPORTER_ADDRESS=[サーバコンテナの内部 IP アドレス] -e IMPORTER_TOKEN=[access token] -e IMPORTER_DOMAIN=[domain] -v /var/circus:/var/circus -p [ホスト側のポート]:4006 circuscad/dicom_storage_server:1.0.0-beta
