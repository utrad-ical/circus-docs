---
title: DICOM Storage Server
---

You can transfer DICOM images to CIRCUS via DICOM Store SCP protocol. To do so, you need to configure CIRCUS Dicom Storage Server.

## Preparation

1.  Fetch the Docker image of the latest DICOM Storage Server from Docker Hub. See the [Installation Guide](./installation.mdx) for details.

    ```shell-session
    $ sudo docker pull circuscad/dicom_storage_server:latest
    ```

1.  Prepare a permanent API access token associated with a user with sufficient privilege. See [this guide](./access-token.md).

1.  Inspect the internal IP address of the CIRCUS Docker container.

    ```
    $ sudo docker inspect <container ID> | grep "IPAddress"
    ```

    To inspect the container ID of a running containers, run `docker ps -a`.

## Start DICOM Storage Server

Run the following command on the host machine:

```shell-session
$ sudo docker run --rm -d \
  -e AE_TITLE=[AE title] \
  -e COMPRESS_MODE=1 \
  -e VERBOSE_MODE=0 \
  -e IMPORTER_ADDRESS=<CONTAINER IP ADDRESS> \
  -e IMPORTER_TOKEN=<ACCESS TOKEN> \
  -e IMPORTER_DOMAIN=<DOMAIN> \
  -v /var/circus:/var/circus \
  -p <HOST PORT>:4006 \
  circuscad/dicom_storage_server:letest
```
