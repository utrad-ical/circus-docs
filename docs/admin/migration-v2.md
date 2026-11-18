---
title: Migrating from 1.x to 2.0
sidebar_label: Migrating to 2.0
---

This page describes what changes when you upgrade an existing CIRCUS 1.x installation to CIRCUS 2.0, and how to migrate.

<Warning>

CIRCUS 2.0 is currently in alpha. This guide will be updated as 2.0 develops.

</Warning>

## Overview

| Item                                 | 1.x                                                                     | 2.0                                                                                          |
| ------------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Containers                           | One `circuscad/circus` container with MongoDB, nginx and the API inside | Docker Compose with separate containers (mongo, api, web, etc.)                              |
| Images                               | `circuscad/circus`                                                      | `circus-api` and `circus-web`                                                                |
| MongoDB                              | 5.0 (inside the CIRCUS container)                                       | **9.0** (the official image, in its own container)                                           |
| Node.js (inside the `api` container) | 22                                                                      | 26                                                                                           |
| Configuration                        | Copied into the image                                                   | Built-in defaults with an optional configuration file mounted into the `api` container       |
| Administration commands              | `node circus.js <command>`                                              | `docker compose exec api circus <command>`                                                   |
| Web server                           | nginx inside the container                                              | `circus-web` (Caddy), which serves the web UI and proxies `/api` and `/rs` to the API server |
| Task list                            | Exports and imports ran as tasks                                        | **Removed**. Downloads and uploads stream directly                                           |
| Supported browsers                   | Most browsers                                                           | Chrome / Edge 147, Firefox 147, Safari 26 or later                                           |

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
- **HTTPS is not set up by default.** `circus-web` serves CIRCUS over plain HTTP on port 80. We recommend hosting CIRCUS behind a reverse proxy that serves HTTPS, such as Caddy. The proxy should send `X-Forwarded-Proto: https`, which makes the session cookie `Secure`.
- MongoDB is not published on the host in `compose.yaml`, and is reachable only from the other containers. The 1.x installation guide published it to all network interfaces (`-p 27017:27017`), and MongoDB has no authentication. If you need to connect to MongoDB from outside, publish the port yourself (preferably to `127.0.0.1` only, used through an SSH tunnel), and use `directConnection=true` in your client.
- The CS job manager runs inside the `api` container. Set `AUTO_BOOT_JOB_MANAGER=1` to start it together with the API server. PM2 captures its output in `/var/circus/data/logs/daemon-pm2-output.log` and `daemon-pm2-error.log`.

## Configuration files

1.x used [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) to read the config file. In the new Docker Compose setup, the config should be located at `/var/circus/circus.config.{js,mjs,cjs,mts}`, or specified via `CIRCUS_CONFIG`. YAML and JSON configs are no longer supported.

In many cases, the standard Compose setup works without a configuration file. If you used a custom Dockerfile to copy your own `circus.config.js` into a 1.x image, first consider if it is still necessary at all. If you do have the settings you want to carry over, mount a minimum config file read-only at `/var/circus/circus.config.js` in the `api` service:

```yaml
services:
  api:
    volumes:
      - ./circus.config.js:/var/circus/circus.config.js:ro
```

Read the following section carefully for the changed settings. Especially, make sure the timezone setting is set correctly.

<Note>

The API container detects a Docker environment automatically using `/.dockerenv` and changes its default behavior. For example, the MongoDB connection URL is set to `mongodb://mongo/circus-api` in Docker (localhost otherwise). If the automatic detection fails, you can set `CIRCUS_CONTAINER_MODE=0` to force the local defaults (such as when in a dev container), or `CIRCUS_CONTAINER_MODE=1` to force the container defaults (such as when in a non-Docker container environment).

</Note>

### Changed Config Settings

In the 1.x official Docker release, the default `dicomTagReader.options.defaultTzOffset` was set to `540`, meaning DICOM timestamps without a recorded UTC offset were interpreted as UTC+09:00. From 2.0, CIRCUS uses the API process's time zone, which can be set in `compose.yaml`:

```yaml
services:
  api:
    environment:
      TZ: Asia/Tokyo # The old default of 540
```

Alternatively, you can explicitly set `dicomTagReader.options.defaultTzOffset` in the config file.

Other configuration-related changes include:

- `apiServer.options.dicomImageServerUrl`: Should be `/rs`, a path on the same origin as the web UI, so that the browser sends the session cookie to CIRCUS RS.
- `uploadFileSizeMaxBytes`: Now limits the size of each DICOM file, not of the uploaded archive. There is no limit on the size of an archive or the number of files.
- `oauthServer.options.fallbackToDefault`: Moved to `auth.options.fallbackToDefault`. CIRCUS still reads the old setting when the `auth` block is absent.
- **Custom service modules** (such as an authentication provider) are loaded with `import()`, and the default export is used. ESM is now the preferred module format.
- The `CIRCUS_MONGO_URL` environment variable: No longer used. Instead, use the `mongoUrl` option in your configuration file.

## Server logs

The API and its embedded CIRCUS RS now write JSON logs to standard output. Use Docker's standard logging mechanism to read and store them. Docker's logging driver controls where logs are collected and how long they are kept.

Remove legacy logger `type`, file options, and any `rsLogger` entry from `circus.config.js`. CIRCUS logs a warning for legacy `type` or `rsLogger` settings. Set `apiLogger.options.level` for both the API and embedded RS, and `csCoreDaemonLogger.options.level` for the job daemon. The default level is `info`.

The planned v2 installation guide will cover logging driver configuration, retention and daily archives alongside backup and restore.

## Checking the Data

CIRCUS 2.0 checks the documents in the database more strictly than 1.x, both when it reads them and when it writes them. Data written by old versions of CIRCUS or by API clients (such as hand-edited revisions submitted from the command line) may not pass the new checks. For example, cases may have labels without a name or attributes, unknown properties in label data, voxel labels without the position, or series without the image range. A case that does not pass cannot be opened.

Run `db-check` against your data **before** upgrading, using the image of the new version. It only reads the database, and reports every invalid document. When upgrading from 1.x, run it as shown in [Moving the Database to MongoDB 9.0](#moving-the-database-to-mongodb-90); on 2.0 and later:

```shell-session
$ docker compose run --rm api circus db-check
```

Options:

- `-t <collection>`: checks only the collection, e.g., `-t clinicalCase` for the cases. Can be repeated.
- `--documents-only`: checks only the documents, and not the attributes (see below).
- `--attributes-only`: checks only the attributes of the cases.

For each invalid document, it shows its ID (e.g., the case ID) and where the problems are. At the end, it shows a summary of the problems and how many documents have each of them, with the array indexes merged:

```text
Summary (the number of items with each issue):
  3   clinicalCase revisions[*].series[*].labels[*].attributes: Invalid input: expected record, received undefined
Found 3 invalid item(s).
```

If it reports invalid documents, fix the data _before upgrading_.

`db-check` also checks the attributes of the latest revision of each case, and of its labels, with the current attribute schemas of the project, because CIRCUS 2.0 checks attributes with them when a revision is saved. These are reported as warnings, which do not stop the upgrade: the values may be ones saved before the schema was changed. Such a case can still be opened, but cannot be saved until its attributes are fixed in the case detail screen. When you change the attribute schemas of a project in the administrator screen, it suggests running `db-check` afterwards.

## Moving the Database to MongoDB 9.0

MongoDB does not support in-place upgrade from 5.0 to 9.0. Instead, use `mongodump` and `mongorestore`.

1. Before stopping CIRCUS 1.x, check that the 2.0 API server can read your data. Create a temporary file named `circus-migration.config.mjs` in the current directory.

   ```js
   export default {
     database: {
       options: {
         mongoUrl: 'mongodb://localhost:27017/circus-api?directConnection=true'
       }
     }
   };
   ```

   Run the read-only `db-check` command with that configuration.

   ```shell-session
   $ docker run --rm --network container:circus \
     -v "$PWD/circus-migration.config.mjs:/var/circus/circus-migration.config.mjs:ro" \
     -e CIRCUS_CONFIG=/var/circus/circus-migration.config.mjs \
     <circus-api image>:<version> circus db-check
   ```

   `--network container:circus` lets the command use the network of the CIRCUS 1.x container (replace `circus` with the name of your container), so `localhost:27017` is the MongoDB of 1.x. Replace `circus-api` if you use another database name. If it reports invalid items (`Found N invalid item(s).`), do not proceed; see [Checking the Data](#checking-the-data).

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

The migrations of 2.0 include:

- **My lists** are moved from the `myLists` array of each user into the `myLists` collection, so that each my list is one document with its items. Items whose list is not found in any user are deleted.

## Removed Features and Settings

- **The task list.** The task list screen, the task notifications in the navigation bar, and the `/api/tasks` endpoints have been removed. Case exports, series imports and CS volume downloads now stream directly. A database migration drops the `tasks` collection.
- **The `downloads` directory.** `/var/circus/data/downloads` was where tasks saved files. It is no longer used, and you can delete it.
- **The `taskManager` configuration.** Remove it from your `circus.config.js` if you have it. It is ignored if left.
- **Remote plug-ins (`CAD+remote`).** The plug-in type that runs on an external server through an adapter has been removed from the API and the administrator screen. If your database has plug-in definitions of this type, delete them before upgrading, as shown below.

If you have registered remote plug-ins, delete their definitions and remove their IDs from the privileges of the groups, using `mongosh` on the database of CIRCUS. Otherwise, the users in such groups cannot log in, and the plug-in administrator screen fails.

```js
const ids = db.pluginDefinitions
  .find({ type: 'CAD+remote' })
  .map(p => p.pluginId)
  .toArray();
const roles = [
  'readPlugin',
  'executePlugin',
  'manageJobs',
  'inputPersonalFeedback',
  'inputConsensualFeedback',
  'manageFeedback',
  'viewPersonalInfo'
];
db.groups.updateMany(
  {},
  { $pull: Object.fromEntries(roles.map(r => [r, { $in: ids }])) }
);
db.pluginDefinitions.deleteMany({ pluginId: { $in: ids } });
```

The jobs of the deleted plug-ins remain in the database, but cannot be opened.

## Users and Browsers

- All users need to log in again after the upgrade. The session ends when the browser is closed.
- The web UI requires Chrome / Edge 147, Firefox 147, Safari 26 or later. On older browsers, colors and menus may be broken.
- Fonts and icons are bundled in the image, so the web UI works without access to the Internet.

## Command-Line Tools

- CIRCUS 2.0 comes with `circus-cli`, an official command-line tool that uses CIRCUS through the API from your computer (importing and exporting series and cases, and so on). It _requires_ Node.js 24 (24.19 or later), or 26.4 or later (earlier versions had a bug around streaming).
- If you have used `circus-api-util`, note that `case-dl` is now `case-export`, and its `-p, --per-task` option is now `-b, --batch-size`.

## API Changes

For scripts that call the API directly:

Paths under `/api` are now case-sensitive. Use the spelling shown in the API reference, for example `/api/mylists` in place of `/api/myLists`.

CORS is disabled by default. If a browser-based tool on a different origin needs access, set `apiServer.options.corsOrigin` in `circus.config.js` to its origin, for example `https://tools.example.org`.

| Endpoint                                                                           | 1.x                                                                                 | 2.0                                                                                                                                  |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `POST /login`                                                                      | Exchanges credentials or a refresh token for API tokens                             | Removed. Use an API key issued in the web UI. Previously issued API keys continue to work.                                           |
| `/api/tasks/*`                                                                     | Task list and downloads                                                             | Removed                                                                                                                              |
| Case export                                                                        | `POST /api/cases/export-mhd` creates a task                                         | `GET /api/cases/export-mhd?caseIds=…` returns the archive                                                                            |
| CS volume download                                                                 | `POST /api/series/export-cs-volume` creates a task                                  | `GET /api/series/export-cs-volume?series=<uid>[:<start>:<end>:<delta>],…` returns the archive. The domains of the series are checked |
| Series upload                                                                      | `POST /api/series/domain/:domain` creates a task                                    | Imports while receiving, and returns `{ imported, skipped, errors }` (201 if all files were imported, 422 if some failed)            |
| `POST /api/series/domain/:domain/single`                                           | Imports synchronously                                                               | Works as before. The body is empty on success (201)                                                                                  |
| `POST /api/plugin-jobs`                                                            | Registers a job without checking the privilege                                      | Requires the `executePlugin` privilege of the plug-in (401 otherwise)                                                                |
| `GET /api/admin/plugins`                                                           | Available to any user                                                               | Requires the `manageServer` privilege                                                                                                |
| `PATCH /api/admin/plugins/:pluginId`                                               | Can change any property                                                             | Returns 400 if `pluginId` or `type` is included                                                                                      |
| `GET /api/admin/users`, `GET /api/admin/users/:userEmail`                          | Includes `myLists`                                                                  | Does not include `myLists` (use `GET /api/mylists` as the user)                                                                      |
| `GET /api/mylists/:myListId`, `GET /api/{series,cases,plugin-jobs}/list/:myListId` | The editors of a private list cannot read it, and only the owner can search with it | The owner, the editors and anyone for a public list can read it and search with it                                                   |

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
