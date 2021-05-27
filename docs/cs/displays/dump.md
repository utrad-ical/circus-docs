---
title: Dump
---

The `Dump` display shows all data from the plug-in. This is mainly for debugging purposes. You should enable this only during plug-in development.

## Synopsis

```json title=displayStrategy
[
  {
    "type": "Dump",
    "options": {
      "maxHeight": 300
    }
  }
]
```

## Options

- `maxHeight: number`: (default = 300) The maximum height of the text box. If the height of the content exceeds this, a scroll bar will appear.
