---
title: Choice
---

`Choice` is a simple display to collect feedback by showing toggle buttons or a select input.

## Example

![Choice example](./choice.png)

## Synopsis

```json title=displayStrategy
[
  {
    "feedbackKey": "evaluation",
    "caption": "Evaluation",
    "type": "Choice",
    "options": {
      "personal": [
        { "caption": "known TP", "value": 1 },
        { "caption": "missed TP", "value": 2, "consensualMapsTo": 1 },
        { "caption": "FP", "value": -1 },
        { "caption": "pending", "value": 0 }
      ],
      "consensual": [
        { "caption": "TP", "value": 1 },
        { "caption": "FP", "value": -1 },
        { "caption": "pending", "value": 0 }
      ]
    }
  }
]
```

## Options

import { Required } from './label';

- `personal: Array`: <Required /> Defines the choices in the personal mode.
- `personal[].caption: string`: The human-friendly caption of the choice, which is displayed on the results screen.
- `personal[].value: string | number`: The machine-friendly value that is saved to the database.
- `personal[].consensualMapsTo: string | number`: Some
- `consensual: Array`: Defines the choices in the consensual mode. If omitted, the same set of choices as in the personal mode will be used.
- `consensual[].caption: string`: See above.
- `consensual[].value: string | number`: See above.
- `excludeFromActionLog: boolean`: (default: false) If set to true, nothing will be recorded to the action log regarding this display.

## Note

This can be used at the "root" level of `displayStrategy`, but it is also suitable as the `feedbackListener` of the [LesionCandidates](./lesion-candidates.md) display.
