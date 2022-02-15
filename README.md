# Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Installation

```console
npm ci
```

## Prebuild

```console
echo 'CIRCUS_DOCS_GH_TOKEN=$(Personal access token of Github)' > .env
npm run prebuild
```

## Local Development

```console
npm start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

We use [Netlify](https://www.netlify.com/) to build and deploy this documentation site.
