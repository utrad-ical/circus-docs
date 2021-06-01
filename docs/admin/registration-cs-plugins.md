---
title: Registration of CS Plug-ins
---

## CIRCUS CSプラグインの登録手順

エクスポートされたDocker image (xxx_ver.1.0.0.tar) をCIRCUS CSのプラグインとして登録するためには以下で行います。

1. docker load コマンドで Docker image を読み込みます。

        # docker load -i xxx_ver.1.0.0.tar

1. 読み込んだプラグインの Docker image ID を取得します。

        # docker images --no-trunc

1. CIRCUS の Docker image で /bin/bash を実行した上で、以下のコマンドを実行してCIRCUS CS プラグインの情報を登録します。

        # /root/servicies.sh & 
        # cd /var/circus/packages/circus-api
        # node circus register-cad-plugin [取得したDocker imageのfull ID]


## CIRCUS CS の プラグインで GPU を使用する場合(Linux のみ、オプション)

CUDA ドライバをインストール後、nvidia-container-runtime のインストール、ならびにホスト側のDockerの設定を行います。

1. nvidia-container-runtime の リポジトリを追加します。

        # curl -s -L https://nvidia.github.io/nvidia-container-runtime/gpgkey | sudo apt-key add -
        # distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
        # curl -s -L https://nvidia.github.io/nvidia-container-runtime/$distribution/nvidia-container-runtime.list | sudo tee /etc/apt/sources.list.d/nvidia-container-runtime.list
        # sudo apt update

1. nvidia-container-runtime をインストールします。

        # sudo apt install nvidia-container-runtime
        # sudo reboot

1. /etc/docker/daemon.json に以下の内容を記載します（要：sudo）。

    ```
    {
        "default-runtime": "nvidia",   
        "runtimes": {
            "nvidia": {
                "path": "/usr/bin/nvidia-container-runtime",
                "runtimeArgs": []
            }
        }
    }
    ```

