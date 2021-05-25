---
title: Built-in Displays
---

Built-in displays are

Currently, the following displays are available.

## `Dump` display

The `Dump` display shows all data from the plug-in. This is mainly for debugging purpose.

## `LesionCandidate` display

### Requirements

Plug-in results must contain an array data containing the locations of points in the following format:

```json
[]
```

### Options

- `maxCandidates`: The maximum number of candidates that can be displayed.
- `sortBy`: Sorts the displays according to the key.
- `confidenceThreshold`: Candidates with confidence below this value will not be displayed.
- `feedbackListener`: Can be used to collect feedback data for each displayed methods.

### Nested Dispaly to Collect Feedback

## `Locator` display

`Locator` is a display whose primary function is to collect feedback. It shows a volume viewer and let the user click on it to specify the location of a point of interest. Typically, this can be used to collect location data of lesions that were undected by CADe plug-ins (i.e., false negatives).

## `Choice` display

`Choice` is a simple display to collect feedback by showing toggle buttons or a select input.

## `VolumeOverlay` display

`VolumeOverlay` is a display that shows the original volume data and volume data overlaied on it. Typically, this can be used by plug-ins which perform volumetry and segmentation.
