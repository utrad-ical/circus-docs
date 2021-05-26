---
title: LesionCandidates
---

## Synopsis

## Requirements

Plug-in results must contain an array data containing the locations of points in the following format:

```json
[]
```

## Options

- `maxCandidates`: The maximum number of candidates that can be displayed.
- `sortBy`: Sorts the displays according to the key.
- `confidenceThreshold`: Candidates with confidence below this value will not be displayed.
- `feedbackListener`: Can be used to collect feedback data for each displayed methods.

## Nested Dispaly to Collect Feedback