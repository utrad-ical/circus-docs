---
title: Migrating from 1.x to 2.0
sidebar_label: Migrating to 2.0
---

This page describes what changes when you upgrade an existing CIRCUS 1.x installation to CIRCUS 2.0, and how to migrate.

<Warning>

CIRCUS 2.0 is currently in alpha. This guide will be updated as 2.0 develops.

</Warning>

## Overview

| Item                                 | 1.x                                                                     | 2.0                                                                                                    |
| ------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Containers                           | One `circuscad/circus` container with MongoDB, nginx and the API inside | Docker Compose with separate containers (mongo, api, web, etc.)                                        |
| Images                               | `circuscad/circus`                                                      | `circus-api` and `circus-web`                                                                          |
| MongoDB                              | 5.0 (inside the CIRCUS container)                                       | **9.0** (the official image, in its own container)                                                     |
| Node.js (inside the `api` container) | 22                                                                      | 26                                                                                                     |
| Configuration                        | Copied into the image                                                   | Your `circus.config.js` mounted into the `api` container                                               |
| Administration commands              | `node circus.js <command>`                                              | `docker compose exec api circus <command>`                                                             |
| Web server                           | nginx inside the container                                              | `circus-web` (Caddy), which serves the web UI and proxies `/api`, `/login` and `/rs` to the API server |
| Task list                            | Exports and imports ran as tasks                                        | **Removed**. Downloads and uploads stream directly                                                     |
| Supported browsers                   | Most browsers                                                           | Chrome / Edge 147, Firefox 147, Safari 26 or later                                                     |

## Docker Compose

CIRCUS 2.0 now relies on Docker Compose (`compose.yaml`). The minimum setup consists of the following containers. See [`compose.yaml`](https://github.com/utrad-ical/circus/blob/master/compose.yaml) of the CIRCUS repository as a starting point for your own compose file.

| Service | Image        | Description                                   |
| ------- | ------------ | --------------------------------------------- |
| `mongo` | `mongo:9.0`  | MongoDB (replica set `rs0`)                   |
| `api`   | `circus-api` | API server, CIRCUS RS, and the CS job manager |
| `web`   | `circus-web` | Web UI and the reverse proxy to `api`         |

<Note>

During the alpha, the images are published only to the GitHub Container Registry (`ghcr.io/utrad-ical/circus-api` and `ghcr.io/utrad-ical/circus-web`), and are not public. You can build your own image anyway from the source.

</Note>

- Set the version of the images with `CIRCUS_TAG` in `.env`. `compose.dev.yaml` in the repository is for development only; do not use it in production.
- The data directory (`/var/circus/data` by default, `CIRCUS_DATA_DIR`) keeps the same layout as 1.x: `dicom`, `labels`, `plugin-results`, `plugin-cache`, `cs-tmp`, `logs` and `mongodb`.
- The `api` container needs `/var/run/docker.sock` to run CAD plug-ins (Docker-outside-of-Docker), and `DOOD_HOST_WORKING_PATH` set to the data directory as seen from the host.
- To use your own configuration, mount it at `/var/circus/circus.config.js` in the `api` container. The default one is [`docker/api/circus.config.js`](https://github.com/utrad-ical/circus/blob/master/docker/api/circus.config.js).
- MongoDB is not published on the host in `compose.yaml`, and is reachable only from the other containers. The 1.x installation guide published it to all network interfaces (`-p 27017:27017`), and MongoDB has no authentication. If you need to connect to MongoDB from outside, publish the port yourself (preferably to `127.0.0.1` only, used through an SSH tunnel), and use `directConnection=true` in your client.
- The CS job manager runs inside the `api` container. Set `AUTO_BOOT_JOB_MANAGER=1` to start it together with the API server. Its logs are under `/var/circus/data/logs` as before. The API server's logs are shown by `docker compose logs api`.

## Moving the Database to MongoDB 9.0

MongoDB does not support in-place upgrade from 5.0 to 9.0. Instead, use `mongodump` and `mongorestore`.

1. Before stopping CIRCUS 1.x, check that the 2.0 API server can read your data. The `db-check` command only reads the database:

   ```shell-session
   $ docker run --rm --network container:circus \
     -e CIRCUS_MONGO_URL='mongodb://localhost:27017/circus-api?directConnection=true' \
     <circus-api image>:<version> circus db-check
   ```

   `--network container:circus` lets the command use the network of the CIRCUS 1.x container (replace `circus` with the name of your container), so `localhost:27017` is the MongoDB of 1.x. Replace `circus-api` if you use another database name. If it reports invalid items (`Found N invalid item(s).`), do not proceed, and report the problem.

1. Take a dump with the old MongoDB inside the CIRCUS 1.x container, stop MongoDB cleanly, and remove the container (replace `circus` with the name of your container):

   ```shell-session
   $ docker exec circus mkdir -p /var/circus/data/mongodb_dump
   $ docker exec circus mongodump --gzip --archive=/var/circus/data/mongodb_dump/before-2.0.gz
   $ docker exec circus mongosh admin --eval 'db.shutdownServer()'
   $ docker rm -f circus
   ```

1. Rename the old data directory and keep it for rollback. MongoDB 9.0 starts with an empty directory at the same path.

   ```shell-session
   $ sudo mv /var/circus/data/mongodb /var/circus/data/mongodb.old-1.x
   ```

1. Start only MongoDB 9.0, and restore the dump after it becomes healthy. The health check initializes the replica set on the first run.

   ```shell-session
   $ docker compose up -d mongo
   $ docker compose exec -T mongo mongorestore --gzip --archive < /var/circus/data/mongodb_dump/before-2.0.gz
   ```

1. Migrate the database, and start everything:

   ```shell-session
   $ docker compose run --rm api circus migrate
   $ docker compose up -d
   ```

To roll back, stop the new containers, put the old data directory back to `/var/circus/data/mongodb`, and start CIRCUS 1.x.

## Database Migrations

The API server checks the database revision at startup, and exits with "Please run DB migration script." if the database is not up to date. After every upgrade, run:

```shell-session
$ docker compose run --rm api circus migrate
```

Use `run --rm` rather than `exec`, because the `api` container does not keep running until the database is migrated.

<Note>

`circus migrate` currently exits with code 0 even when a migration fails. Check its output for `Error:`.

</Note>

## Removed Features and Settings

- **The task list.** The task list screen, the task notifications in the navigation bar, and the `/api/tasks` endpoints have been removed. Case exports, series imports and CS volume downloads now stream directly. A database migration drops the `tasks` collection.
- **The `downloads` directory.** `/var/circus/data/downloads` was where tasks saved files. It is no longer used, and you can delete it.
- **The `taskManager` configuration.** Remove it from your `circus.config.js` if you have it. It is ignored if left.

## Changed Settings

- **`apiServer.options.dicomImageServerUrl`** should be `/rs`, a path on the same origin as the web UI, so that the browser sends the session cookie to CIRCUS RS.
- **`uploadFileSizeMaxBytes`** now limits the size of each DICOM file, not of the uploaded archive. There is no limit on the size of an archive or the number of files.
- **Custom service modules** (such as an authentication provider specified in `circus.config.js`) are loaded with `import()`, and the default export is used.

## Users and Browsers

- All users need to log in again after the upgrade. The session ends when the browser is closed.
- The web UI requires Chrome / Edge 147, Firefox 147, Safari 26 or later. On older browsers, colors and menus may be broken.
- Fonts and icons are bundled in the image, so the web UI works without access to the Internet.
- If you put a reverse proxy that terminates HTTPS in front of `circus-web`, send `X-Forwarded-Proto: https`, which makes the session cookie `Secure`.

## Command-Line Tools

- CIRCUS 2.0 comes with `circus-cli`, an official command-line tool that uses CIRCUS through the API from your computer (importing and exporting series and cases, and so on). It _requires_ Node.js 24 (24.19 or later), or 26.4 or later (earlier versions had a bug around streaming).
- If you have used `circus-api-util`, note that `case-dl` is now `case-export`, and its `-p, --per-task` option is now `-b, --batch-size`.

## API Changes

For scripts that call the API directly:

| Endpoint                                 | 1.x                                                | 2.0                                                                                                                                  |
| ---------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/api/tasks/*`                           | Task list and downloads                            | Removed                                                                                                                              |
| Case export                              | `POST /api/cases/export-mhd` creates a task        | `GET /api/cases/export-mhd?caseIds=…` returns the archive                                                                            |
| CS volume download                       | `POST /api/series/export-cs-volume` creates a task | `GET /api/series/export-cs-volume?series=<uid>[:<start>:<end>:<delta>],…` returns the archive. The domains of the series are checked |
| Series upload                            | `POST /api/series/domain/:domain` creates a task   | Imports while receiving, and returns `{ imported, skipped, errors }` (201 if all files were imported, 422 if some failed)            |
| `POST /api/series/domain/:domain/single` | Imports synchronously                              | Works as before. The body is empty on success (201)                                                                                  |

Long-running requests take an optional `progressId` (issued by `POST /api/progress`) to report the progress through `GET /api/progress/:progressId` (server-sent events).

## Plug-in Compatibility

CAD plug-ins built for CIRCUS 1.x run on CIRCUS 2.0 without rebuilding.

- **Running plug-ins:** Plug-in containers receive the same input (`/circus/in`) and write the same output (`/circus/out`) as in 1.x.
- **Displays:** The built-in displays (`Choice`, `Dump`, `Gallery`, `LesionCandidates`, `Locator`, `Numeric`, `Tags`, `Text`, `VolumeOverlay`) work as before with the same options.
- **Custom displays** (Module Federation, `remoteEntry.js`, built with `@utrad-ical/circus-ui-kit`): Currently, they are loaded as before. CIRCUS passes its own React 17, ReactDOM and a ui-kit with the same API as 1.x to them. See below.

<Warning>

Custom displays of 1.x will stop working during the 2.0 development. CIRCUS 2.0 will move to React 19, and custom displays built for 1.x, which bundle the JSX runtime of React 17, do not work with React 19. They will need to be rebuilt in the new display format of 2.0 (planned), which will be based on plain ES modules. Plug-ins that use only the built-in displays are not affected.

</Warning>

### When an existing plug-in may not work

- **The display relies on Bootstrap 3.** CIRCUS 2.0 no longer includes Bootstrap. Only `.row`, `.table`, `.table-hover` and `.checkbox` are kept for compatibility. Other Bootstrap classes (such as `.btn`, `.form-control`, `.col-*`, `.panel` and `.glyphicon`) are no longer styled, and react-bootstrap components bundled in a display are shown without styles.
- **The display relies on the styles or fonts of the host.** The icon fonts and the styled-components of the web UI have been removed. A display that uses the CSS classes of the web UI, its icon font classes, or its global styles may look different. Use the styles bundled in the display, and the CSS variables of the host (such as `--theme`) for colors.
- **The display does not share React with the host.** If React or `@utrad-ical/circus-ui-kit` is not declared as a shared module in the Module Federation configuration, the display uses its own copy, and hooks such as `useCsResults()` fail.
- **The series cannot be read.** CS volumes are created in the same format as 1.x. A series with broken slices, which 1.x sometimes exported, now makes the job fail. When a series has neither the slice spacing tag nor slice locations, `ElementSpacing` of the z axis is now 1 instead of `NaN`.
