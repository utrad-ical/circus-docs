---
title: Core Concepts
---

CIRCUS RS is a set of classes and functions that work together to achieve the image viewing/annotationg capabilities. Each piece can be extended or replaced to change the behavior of CIRCUS RS. This page briefly explains the core concepts of CIRCUS RS with a "top-down" approach.

:::note

TypeScript interfaces shown below are **heavily abbreviated** to describe the most essential role of each concept. Refer to the code for the complete interfaces.

:::

## List of Client-Side Concepts

### Viewer

The `Viewer` class is the top-level component visible to the user. It creates and manages an HTML `<canvas>` element in a given HTML `<div>` element. It displays images calculated from two main fields: 1) a `Composition`, which describes **_what_** to display, and 2) a `ViewState`, which describes **_how_** to displaly the composition.

It also handles all the mouse events and passes them to an active `Tool` or an `Annotation`.

```ts
interface Viewer {
  constructor(div: HTMLDivElement);
  setComposition(comp: Composition);
  setState(state: ViewState);
  setActiveTool(tool: Tool);
}
```

### Composition

A `Composition` is a thin container that holds one `ImageSource` and multiple `Annotation`s. These members define **_what_** to display on the viewers it is registered to. One composition can be registered to multiple viewers.

```ts
interface Composition {
  setImageSource(imgSource: ImageSource);
  addAnnotation(annotation: Annotation);
  clearAnnotations();
}
```

### ImageSource

An `ImageSource` represents the "main" image that is to be displayed on the corresponding viewers. For example, it can represent one DICOM series transferred from a RS Server. The most important role of an `ImageSource` is to render 2D images directly displayed on the viewer according to a given `ViewState`:

```ts
interface ImageSource {
  draw: (viewState: ViewState) => Promise<ImageData>;
}
```

The most important implementation of `ImageSource` is `MprImageSource`. As its name suggests, it renderes one MPR image (which is 2D) from a DICOM volume (which is 3D) according to the section defined by the passed view state.

### Annotation

An `Annotation` represents everything that is displayed in a `Viewer` in addition to the `ImageSource`. A text annotation, an arrow, a scroll bar, a reference line are example of annotations.

```ts
interface Annotation {
  draw: (viewState: ViewState) => void;
}
```

ImageSource can be asynchronous, but all annotations must render synchronously after the main image from the image source has been rendered.

In addition, an `Annotation` also has an ability to respond to mouse events and update itself (e.g., move by dragging) or change the current view state. Many built-in annotations has the `.editable` property to turn on the self-updating feature.

### ViewState

A `ViewState` is a plain JavaScript object that determines **_how_** to display a composition. It can hold arbitrary members which will be consumed by the corresponding image source and annotations. For example, `MprImageSource` and its subclasses take a view state with the following shape:

```ts
interface MprViewState {
  readonly section: Section;
  readonly window: ViewWindow;
  readonly interpolationMode: InterpolationMode;
}

const exampleViewState: MprViewState = {
  section: {
    origin: [0, 0, 0],
    xAxis: [250, 0, 0],
    yAxis: [0, 250, 0],
  },
  window: {
    level: 150,
    width: 100,
  },
  interpolationMode: 'trilinear',
};
```

User interactions (paging, zooing, panning, windowing) typically affect some part of the current view state. You can programmatically change a view state to animate a certain property of the displayed image, such as a window.

You must treat each view state as an **immutable** object, i.e., its members and all sub-members must not change once it has been created. Instead of doing `viewState.window.level = 0`, you must do the following:

```tsx
const newViewState: MprViewState = {
  ...oldViewState,
  window: { ...oldViewState.window, level: 10 },
};
```

This is because the `Viewer` uses reference-based equality to see whether a view state has been changed between re-renders.

:::important

A `ViewState` is used on a per-viewer basis, whereas a `Composition` can be shared among multiple viewers. It is possible to make three viewers have the same composition and make them have three different view states. This way, you can make three viewers that display the same volume from three different orientations (e.g, axial, sagittal, coronal) or different interpolation modes, window levels, etc.
:::

### VolumeLoader

### RsHttpClient

### RawData

`RawData` is the main 3D volume container of CIRCUS RS. It holds a large `ArrayBuffer` and exposes an accessor methods like `.setPixelAt()`. It supports the following grayscale format:

- `uint8`
- `int8`
- `uint16`
- `int16`
- `binary` (black-and-white, 1 bit per voxel)

Interpolations and MPR calculations also happen within this class.

### Tool

A `Tool` in CIRCUS RS is essentially a set of mouse handlers. A tool typically performs one of the following operations in response to the user's operation:

- Change the current view state (e.g., change view window)
- Add an annotation or modify an existing annotation (e.g., create a rectangle annotation)

CIRCUS RS has the following built-in tools:

- Tools that mainly affects `ViewState`
  - `Pager`
  - `Pan`
  - `Zoom`
  - `Window`
  - `CelestialRotate`
- Tools that mainly affects `Annotation`
  - `Brush` / `Eraser`
  - `Wand`
  - `Ruler`
  - 2D figure
  - 3D figure

Each viewer can have a different `activeTool`. Only one tool can be activated per viewer at a time.

Note that an `Annotation` has a hit test function and can take over mouse events before they are passed to the active tool. For example, a draggable `ReferenceLine` annotation can respond to a mouse drag regardless of the current active tool.

CIRCUS RS has a minimum set of icons and a "tool bar" implementation, as seen in the demo, but you don't have to use them. How to switch the active tool is up to the developer who uses CIRCUS RS.

## List of Server-Side Concepts

### DicomImageRepository

A `DicomImageRepository` represents a data source from which DICOM files are loaded. The default implementation of this is `StaticFileDicomFileRepository`, which accesses DICOM files stored in the server's local file system. This should be enough for most research types, but in case you need scalability, you can write a custom implementation that connects to AWS S3, a PACS system, etc.

```ts
default interface DicomFileRepository {
  getSeries(seriesUid: string): Promise<SeriesAccessor>;
  deleteSeries(seriesUid: string): Promise<void>;
}

interface SeriesAccessor {
  load: (image: number) => Promise<ArrayBuffer>;
  save: (image: number, buffer: ArrayBuffer) => Promise<void>;
  readonly images: string;
}
```

CIRCUS RS tries to load images in parallel. If you want to restrict the max number of concurrent loading in your custom implementation, use `ConcurrencyGate` available in @utrad-ical/circus-lib.

## Extension Summary

CIRCUS RS can be customized in the following ways.

- Make your own `VolumeLoader` if you have volume data in custom data format (e.g., `*.mhd`) and want to display them as MPR or VR images. Also do this if your volume data come from sources other than a RS Server or if you want to preprocess the obtained volume.
- Make your own `Annotation` if you want to draw something on a viewer using the Canvas API. It has access to the current view state and can respond to mouse events.
- Make your own `Tool` if you want to make something happen when the user clicks or drags on the viewer.
- Make your own `DicomFileRepository` if you have a lot of DICOM images stored somewhere (e.g., AWS S3) and want to serve them via CIRCUS RS Server.
- Make your own `ImageSource` and design the corresponding `ViewState` if you want to display images using a new algorithm other than MPR or VR. Also, do this if your image is not based on 3D volumes.

:::caution
Do **not** extend or modify the `Viewer` and `Compositioin` classes.
:::
