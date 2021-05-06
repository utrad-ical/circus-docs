---
title: Custom Result Display
---

## Custom Display

Authors of CIRCUS CS plug-ins can provide a fully custom display (view) to display plug-in results.

A custom display is essentially a [React](https://reactjs.org/) component (JavaScript file) that follows certain rules and is bundled using [Webpack](https://webpack.js.org/). The bundle files are then included in the plug-in Docker image file.

We use [Webpack Module Federation](https://module-federation.github.io/) to dynamically load your custom display from the main CIRCUS CS app.

:::note
Your custom display will be used only from a results page of the plug-in that provides the display. You cannot share custom displays across multiple plug-ins.
:::

### Building Your Custom Display

See the boilerplate in our GitHub repository.

1. Make a new Node project similar to the starter template.
2. Build your package: `npm run build`
3. Several files will be generated under a directory named `display`. The directory contains `remoteEntry.js` and several other files.
4. Copy this `display` directory into your plug-in image via `Dockerfile`.
