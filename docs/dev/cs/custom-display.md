---
title: Custom Result Display
---

Authors of CIRCUS CS plug-ins can provide a fully custom display (view) to display plug-in results.

A custom display is essentially a [React](https://reactjs.org/) component (JavaScript file) that follows certain rules and is bundled using [Webpack](https://webpack.js.org/). The bundled files are then included in the plug-in Docker image file.

We use [Webpack's Module Federation](https://module-federation.github.io/) mechanism to dynamically load your custom display from the main CIRCUS CS app.

:::note
Your custom display will be used only from a results page of the plug-in that provides the display. You cannot share custom displays across multiple plug-ins.
:::

## Creating a Sample Plug-in Using Our Starter Template

The easiest way to get started is to use our starter kit hosted on GitHub.

```bash
mkdir my-circus-plugin
cd my-circus-plugin
npx @utrad-ical/create-circus-cad-plugin -i
```

::: note
`npx` is a script runner that downloads and executes a package directly from the NPM registry.
:::

This will generate the following files along with dependencies:

```text
📂my-circus-plugin
├── README.md
├── node_modules
├── package.json
├── package-lock.json
├── postbuild.sh
├── server.js
├── tsconfig.json
├── webpack.config.js
├── 📂data
│   ├── results.json
│   └── sample.png
├── 📂docker
│   ├── Dockerfile
│   ├── plugin.json
│   └── apps
│       ├── cad.js
│       └── sample.png
├── 📂public
│   └── index.html
└── 📂src
    ├── App.tsx
    ├── bootstrap.tsx
    ├── index.ts
    ├── sampleJob.json
    └── components
        └── SampleViewer.tsx
```

- `docker` contains ...
- `public` contains ...
- `src` contains source code for building a custom display.

### Place Your Main Executable at `docker/apps`

Under `docker/apps/`, you will see `cad.js`, which is a sample program that only outputs dummy results. Replace it with your main executable (written in any language you like). Read [this page](./build.md) for the details.

### Edit Dockerfile and Manifest File at `docker`

- Edit the plug-in manifest file: `./docker/plugin.json`
- Modify Dockerfile to specify your executable file: `./docker/Dockerfile`
- Modify veiwer component: `./webpack.config.js`, `src/components/SampleViewer.tsx`
- Add sample result files to check your viewer in the local environment: `./data`, `src/sampleJob.json`

### Edit `./webpack.config.js` and `./docker/plugin.json`

Your custom display will be stored in a Docker image and has to be consumed by a running CIRCUS web app. To achieve this, you need to specify which module (React component) to expose to CIRCUS CS.

For example, if your module name is named as "MyXyzVisualizer" and stored in `パス`, declare it `webpack.config.js`:

```js title="webpack.config.js"
exposes: {
  "./MyXyzVisualizer": "[the path to the module]",
},
```

Note that the module name must be prefixed with `./`. You can specify as many modules as you want here. Your React component must be exported as an **default export** using the `export default` ES5 syntax.

To use the exposed module in your result screen, use the following syntax in the `plugin.json` manifest file:

```json title="docker/plugin.json"
{
  ...,
  "displayStrategy": [
    {
      "type": "@MyXyzVisualizer",
      ...,
    }
  ]
}
```

Your custom display name must be prefixed with `@`. This prefix tells CIRCUS that you want to use a custom component stored in a plug-in image file instead of one of our built-in displays.

:::important
Do not touch these ModuleFederationPlugin options: `name`, `library`, and `filename`.

```js title="webpack.config.js"
name: "CircusCsModule",
library: {
  name: "CircusCsModule",
  type: "window",
},
filename: "remoteEntry.js",
```
:::

## Shared Modules

The following modules are shared among the webpack containers; you can `import` these directly without worrying bundle size bloating or duplicate instances.

- `react`
- `react-dom`
- `styled-components`
- `@utrad-ical/circus-rs`
- `@utrad-ical/circus-ui-kit`

Other modules are not shared. You can still pack them into your bundle.

## Accessing the CAD data

Most of the important data are provided via `useCsResults()` custom hook, which returns an object like this:

```ts
interface CsResultsContextType {
  job: Job;
  plugin: Plugin;
  consensual: boolean;
  editable: boolean;
  loadAttachment: PluginAttachmentLoader;
  eventLogger: EventLogger;
  rsHttpClient: RsHttpClient;
  getVolumeLoader: (series: SeriesDefinition) => DicomVolumeLoader;
  loadDisplay: <O extends object, F>(name: string) => Promise<Display<O, F>>;
}

export interface Job {
  jobId: string;
  userEmail: string;
  pluginId: string;
  series: SeriesDefinition[];
  feedbacks: FeedbackEntry<any>[];
  createdAt: string;
  finishedAt: string;
  results: any; // The data in results.json
}
```

- The data the plug-in wrote to `results.json` is located at `job.results`. This is always available when this display is invoked.
- Other arbitrary files output by the plug-in (e.g., PDF) can be asynchronously fetched via authorized HTTP requests. You can use either the `loadAttachment` function or the `useAttachment` custom hook (which is a wrapper around `loadAttachment`).

:::important
Use only function components. The `useCsResults()` hook does not work in React class components.
:::

## Declaratively Load Data Using `usePluginAttachment`

`usePluginAttachment` (obtained via '@utrad-ical/circus-ui-kit') is a React custom hook that allows you to load an arbitrary file from the CAD results directory in a declarative manner. This is the easiest approach when you only need to load a few files with known names.

```tsx
import { usePluginAttachment } from '@utrad-ical/circus-ui-kit';

// Function component
const Results = () => {
  const csvDataStr = usePluginAttachment('my-data.csv', 'text');

  if (!csvDataStr) return <div>Loading...</div>;
  if (csvDataStr instanceof Error) return <div>An error happened</div>;

  return <div>{csvDataStr}</div>;
};

export default Results;
```

Note that the data you requested will be fetched from the network and arrives asynchronously. The returned data from `usePluginAttachment` can be one of the following types:

- `undefined`: When the data has not been loaded yet.
- `Error`: When an error has happened while the loading process (e.g., a wrong file name was passed).
- `string | object | ArrayBuffer`: When the data has been successfully loaded.

If you want to load more than one file, simply use `usePluginAttachment` multiple times.

```tsx
const DisplayLoadingTwoFiles = () => {
  const data1 = usePluginAttachment('data1.txt', 'text');
  const data2 = usePluginAttachment('data2.txt', 'text');

  if (!data1 || !data2) return <div>Loading...</div>;
  if (data1 instanceof Error || data2 instanceof Error) return <div>Error</div>;

  return (
    <ul>
      <li>{data1}</li>
      <li>{data2}</li>
    </ul>
  );
};

export default DisplayLoadingTwoFiles;
```

## Flexibly Load Data Using `loadAttachment`

`loadAttachment` (can be obtained via `useCsResults`) is an async function with which you can load arbitrary files from the plug-in result directory. It asynchronously returns a [JavaScript `Response` object](https://developer.mozilla.org/en-US/docs/Web/API/Response). `usePluginAttachment` uses this under the hood, too. This requires a deeper knowledge of React and the DOM, but enables more flexible loading approaches.

The following example does the same thing as the previous example.

```tsx
import { useState, useEffect } from 'react';
import { useCsResults } from '@utrad-ical/circus-ui-kit';

const Results = () => {
  const { loadAttachment } = useCsResults();
  const [csvDataStr, setCsvDataStr] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await loadAttachment('my-data.csv');
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

## Collecting User Feedback

When you want to make your display support feedback collection, use `initialFeedbackValue`, `onFeedbackChange` and `personalOpinions` coming from the props.

```ts
interface DisplayProps<O extends object, F extends unknown> {
  initialFeedbackValue: F | undefined;
  personalOpinions: readonly FeedbackEntry<F>[];
  options: O;
  onFeedbackChange: (status: FeedbackReport<F>) => void;
  children?: React.ReactNode;
}

interface ValidFeedbackReport<T> {
  valid: true;
  value: T;
}

interface InvalidFeedbackReport {
  valid: false;
  error?: any;
}

type FeedbackReport<T> = ValidFeedbackReport<T> | InvalidFeedbackReport;
```

The mechanism is similar to the plain [controlled component pattern](https://reactjs.org/docs/forms.html) in that you have to report data changes using a passed callback, but `initialValue` will not be updated between re-renders. That is, you have to manage the current feedback data inside your display's state.

Make sure to **call `onFeedbackChange` on initial render**. It tells the CIRCUS system that your display wants to collect user feedback. And report the validation status whenever your current feedback data inside your display changes, which can be done using `useEffect(..., [currentFeedback])`. On the other hand, if your display doesn't need to collect feedback, simply avoid calling `onFeedbackChange`.

You can return any data as feedback as long as they are JSON-serializable. Do not return non-serializable data such as `Date`, `Map` or `symbol`.

This is a sample display which collects numerical feedback (greater than 3) from the user.

```jsx
const NumberInputDisplay = props => {
  const { initialFeedbackValue, onFeedbackChange, personalOpinions } = props;
  // editable will be false when a feedback entry has been already registered.
  const { editable, consensual } = useCsResults();

  // Use function-style initializer
  const [currendFeedback, setCurrentFeedback] = useState(() => {
    // If initialFeedback is set, use it
    if (typeof initialFeedbackValue === 'number') return initialFeedbackValue;
    // Perform personal feedback integration when the user enters consensual mode.
    // Here, we calculate the mean of the values entered in personal mode.
    if (consensual && editable) {
      const sum = personalOpinions.map(o => o.data).reduce((a, b) => a + b, 0);
      return sum / personalOpinions.length;
    }
    // Otherwise, just return the default value used when a user
    // first enters this display.
    return 0;
  });

  // Report whether the current status is valid every time it changes.
  useEffect(() => {
    if (currentFeedback > 3) {
      onFeedbackChange({ valid: true, value: currentFeedback });
    } else {
      onFeedbackChange({
        valid: false,
        error: 'The value must be greater than 3',
      });
    }
  }, [currentFeedback]);

  return (
    <label>
      Number larger than 3:{' '}
      <input
        type="number"
        disabled={!editable}
        value={currentFeedback}
        onChange={ev => setCurrentFeedback(Number(ev.target.value))}
      />
    </label>
  );
};
```

:::important

When you integrate personal feedback entries, use `props.personalOpinions` rathern than `job.feedbacks` from `useCsResults()`. These seem similar, but the latter contains all the data from other displays, and you cannot determine which part of the data is relevant to your display.

:::
