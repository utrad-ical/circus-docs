---
title: Locator
---

`Locator` is a display whose primary function is to collect feedback. It shows a volume viewer and let the user click on it to specify the location of a point of interest. Typically, this can be used to collect location data of lesions that were undetected by CADe plug-ins (i.e., false negatives).

## Example

![Locator example](./locator.png)

## Synopsis

```json title=displayStrategy
[
  {
    "feedbackKey": "falseNegatives",
    "caption": "FN Input",
    "type": "Locator",
    "options": {}
  }
]
```

## Data Preparation

If `snapThresholdMm` is used, the `results.json` file must contain lesion candidate locations as described in [LesionCandidates](./lesion-candidates.md).

## Options

```ts
type IntegrationOptions = 'off' | 'snapped';

interface LocatorOptions {
  volumeId?: number;
  excludeFromActionLog?: boolean;
  snapThresholdMm?: number | false;
  snapDataPath?: string;
  consensualIntegration?: IntegrationOptions;
}
```

- `volumeId`: (default: 0) Which series to display.
- `excludeFromActionLog: boolean`: (default: false) If set to true, nothing will be recorded to the action log regarding this display.
- `snapThresholdMm: number | false`: If a number (&gt; 0) is set, when there is a (hidden or displayed) lesion candidate near the clicked location, the clicked point snaps to the nearest candidate.
- `snapDataPath: string`: (default: "results.lesionCandidates") Changes where to read the location data from. Used only when `snapThresholdMm` is set.
- `consensualIntegration: IntegrationOptions`: (default: 'none') If this is set to 'snapped' and two or more user entered locations that snapped to the same lesion in the personal mode, they are integrated to one location.
