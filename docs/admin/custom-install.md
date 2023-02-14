---
title: Custom Installation
---

While the [official Docker image](./installation.mdx) is the easiest way to deploy CIRCUS with its default configuration, sometimes a custom installation directly from the GitHub respository may necessary to enable extended capabilities. For example, you may need a custom installation to achieve the following:

- Customize DICOM file repository (e.g., use Amazon S3 as DICOM storage)
- Customize authentication mechanism (e.g., connect to an in-hospital medical recording system to authenticate users)
- Customize logging (e.g., use a cloud logging service)
- Configure database access (e.g., connect to an external/cloud MongoDB server)

:::note

Generally, it is recommended to use a Docker-based workflow for your deployment process. Consider maintaining your custom Dockerfile and configuration file based on the one used to build the official Docker image of CIRCUS.

:::

## Installation Steps

We use [NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) to manage monorepo, so NPM 7.x or higher is required. Node.js 16 or higher is recommended.

The following is a brief overview. If you ran into trouble, check out [this Dockerfile](https://github.com/utrad-ical/circus/tree/master/docker-build) to build official image.

1. Clone the repository and install the dependencies with NPM.

   ```shell-session
   git clone https://github.com/utrad-ical/circus.git
   cd circus
   npm ci
   ```

   If `npm ci` fails, check the versions of Node.js and NPM.

2. Build the front UI and libraries. This takes a few minutes.

   ```shell-session
   npm run build
   ```

3. Create a configuration file. See below for details.

4. Create a data directory where all CIRCUS-related data will be stored. The directory is configurable, but the default location is `/var/circus`.

   ```shell-session
   mkdir /var/circus
   ```

5. Try starting the backend API server from a terminal and check its functionality.

6. After successfully launching the API server, set up a mechanism to keep it running (PM2 is recommended).

7. Configure an HTTP server to host the frontend code and API server (Nginx is the easiest and recommended).

## Configuration

`circus.config.js` is the shared configuration file used across all CIRCUS subsystems. It can be placed anywhere recognized by [cosmiconfig](https://github.com/davidtheclark/cosmiconfig), but the most straightforward location is next to the `circus` repository directory.

The configuration file must export an object, and its keys are "service" names used in CIRCUS.

```js
module.exports = {
  serviceName1: {
    type: 'serviceNameType',
    options: { foo: 'bar' },
  },
  serviceName2: {
    type: 'path/to/your/custom/script',
    optoins: { dataDir: '/home/data.txt' },
  },
};
```

Configurations specified here are deep-merged to the default configuration and used to start each components of CIRCUS. That is, the default value will be used unless you specify it explicity.

The `type` field under the service name defines the service to be used. When an identifier without a slash is used, it will invoke the corresponding service from the service-specific directory. For example, there are several available `Logger`s located under `packages/circus-lib/src/logger`, and loggers here can be referred to simply using their names.

Alternatively, you can also write a custom logger from scratch to suit your needs. For example, a custom logger script may be stored in `/home/circus/my-logger.ts` and be used like so:

```js
module.exports = {
  apiLogger: {
    type: '/home/circus/my-logger.ts',
    options: { anyData: 'passedToMyLogger' },
  },
};
```

:::caution

Currently, no detailed documentation is available for each service, and the interface of each services are subject to change without notice.

:::
