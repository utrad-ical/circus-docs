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

## Basics

:::important

- Do not try to `import` modules other than `react`, `@utrad-ical/circus-rs` and `@utrad-ical/circus-ui-kit`. It is not supported.
- Use function components. `useCsResults` do not work with React class components.

:::

## Accessing the CAD data

- The data from `results.json` has been already loaded by the CIRCUS CS system and passed to your presentation component. You can access the data via React context.
- Other arbitrary file data output by the plug-in (e.g., a PDF file) can be fetched via HTTP requests. You can use either the `loadAttachment` function (asynchronously returns HTTP Response Object) or `useAttachment` (custom hook wrapping `loadAttachment`).

## Display

`Display` is the main building block of CIRCUS CS results data. This is a React component that has the following signature:

```ts
type FeedbackListener<T> = React.FC<{
  feedbackKey: string;
  value: T;
  onChange: (value: T) => void;
  onValidate: (isValid: boolean) => void;
}>;
```

A display can not only display plug-in results but also collect feedback data from users.

## Declaratively Load Data Using `useJobResults`

`useJobResults` is a custom hook that allows you to load an arbitrary file from the CAD results directory in a declarative manner. This is the easiest approach when you only need to load a few files with known names.

```tsx
import { useJobResults } from '@utrad-ical/circus-cs-display';

const Results = () => {
  const csvDataStr = useJobResults('my-data.csv', 'string');

  if (!csvDataStr) return <div>Loading...</div>;
  if (csvDataStr instanceof Error) return <div>An error happened</div>;

  return <div>{csvDataStr}</div>;
};
```

Note that the data you requested will be fetched from the network and arrives asynchronously. The returned data from `useJobResults` can be one of the following types:

- `undefined`: When the data has not been loaded yet.
- `Error`: When an error has happened while the loading process.
- `string | ArrayBuffer`: When the data has been successfully loaded.

## Flexibly Load Data Using `useJobResultsLoader`

`useJobResultsLoader` returns an async function with which you can load arbitrary files from the plug-in result directory. It asynchronously returns a JavaScript Response object. `useJobResults` uses this under the hood, too. This requires a deeper knowledge of React, but enables more flexible loading strategy.

```tsx
import { useState, useEffect } from 'react';
import { useJobResultsLoader } from '@utrad-ical/circus-cs-display';

const Results = () => {
  const loader = useJobResultsLoader();
  const [csvDataStr, setCsvDataStr] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await loader('my-data.csv');
        setCsvDataStr(await response.text());
      } catch (err) {
        setError(err);
      }
    };
    load();
  }, []);

  if (!csvDataStr) return <div>Loading...</div>;
  if (error) return <div>An error happened</div>;
  return <div>{csvDataStr}</div>;
};
```
