---
title: Numeric
---

The `Numeric` shows an input box to collect a numer feedback.

## Example

## Synopsis

```json title=displayStrategy
[
  {
    "feedbackKey": "sizeOfSomething",
    "caption": "Size",
    "type": "Numeric",
    "options": {
      "label": "Enter a positive integer",
      "minimum": 1,
      "multipleOf": 1
    }
  }
]
```

## Options

All options are optional.

- `label: string`: If set, shows a caption above the input control.
- `minimum: number`: Ensures input &gt;= minimum.
- `exclusiveMinimum: number`: Ensures input &gt; minimum.
- `maximum: number`: Ensures input &lt;= maximum.
- `exclusiveMaximum: number`: Ensures input &lt; maximum.
- `multipleOf: number`: Ensures the input is a multiple of this. Internally, we just check "input % multipleOf === 0", so this does not work correctly with floating-point numbers due to rounding errors.

:::tip
Use `multipleOf: 1` if you want to ensure the input value is an integer.
:::

## Note

This can be used at the "root" level of `displayStrategy`, but it is also suitable as the `feedbackListener` of the [LesionCandidates](./lesion-candidates.md) display.
