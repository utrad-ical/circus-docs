# API for Plugins

<ApiPreamble verb="get" path="/plugins/:pluginId" />

### Request

`pluginId`
: ID of the plug-in. This is Docker image ID. (string)

```bash title="Example"
GET /api/plugins/:pluginId HTTP/1.1
```

### Response

`pluginId`
: ID of the plug-in. This is Docker image ID. (string)

`version`
: Semver-compatible plug-in version. (string)

`pluginName`
: The name of the plug-in. (string)

`description`
: Short text that describes what this plug-in does. (string)

`icon`
: Represents an icon for projects and apps. The setting items are `"glyph"`, `"color"` and `"backgroundColor"`. `"glyph"` is selected from **_[The values of glyph](./plugins#the-values-of-glyph)_** to represent the plug-in to be adapted. `"color"` and `"backgroundColor"` are the foreground and background colours of the icon. They are represented by a colour code in the form #rrggbb. (object)

`type`
: Plug-in type. Currently the only supported value is `"CAD"`. (string)

`runConfiguration`
: Installation-specific configurations. (object)

`displayStrategy`
: Determines how plug-in results are displayed and how feedback is collected. (array)

`createdAt`
: The date the plugin was created, in ISO format. (date)

`updatedAt`
: The date the plugin was updated, in ISO format. (date)

#### The values of glyph

<details><div>

`"stomach"`,
`"brain"`,
`"lung"`,
`"liver"`,
`"bone"`,
`"breast"`,
`"heart"`,
`"colon"`,
`"face"`,
`"abdomen"`,
`"joint"`,
`"kidney"`,
`"artery"`,
`"pancreas"`,
`"calc"`,
`"visualize"`,
`"measure"`,
`"cpu"`,
`"scanner"`,
`"atom"`,
`"person"`

</div></details>

```bash title="Example"
HTTP/1.1 200
Content-type: application/json

{
  "pluginId": "85w1yc7xbzqjr7daf8mu6p2qj7f6a6vegzy4k9nf3vewv7sy32kvjrar49k70h3n",
  "version": "1.0.0",
  "pluginName": "Example-Plugin",
  "description": "Example-Plugin",
  "icon": { "glyph": "brain", "color": "#ffffff", "backgroundColor": "#666666" },
  "type": "CAD",
  "runConfiguration": { "timeout": 900, gpus: "" },
  "displayStrategy": [
    {
      "feedbackKey": "exampleCad",
      "caption": "Example Cad",
      "type": "Example Cad",
      "options": {}
    },
    {
      "feedbackKey": "exampleCad2",
      "caption": "Example Cad 2",
      "type": "Example Cad 2",
      "options": {}
    }
  ],
  "createdAt": "2023-01-10T00:00:00.000Z",
  "updatedAt": "2023-02-20T00:00:00.000Z"
}
```

---

<ApiPreamble verb="get" path="/plugins" />

### Request

```bash title="Example"
GET /api/plugins HTTP/1.1
```

### Response

Returns an array of objects with the following properties.

`pluginId`
: ID of the plug-in. This is Docker image ID. (string)

`version`
: Semver-compatible plug-in version. (string)

`pluginName`
: The name of the plug-in. (string)

`description`
: Short text that describes what this plug-in does. (string)

`icon`
: Represents an icon for projects and apps. The setting items are `"glyph"`, `"color"` and `"backgroundColor"`. `"glyph"` is selected from **_[The values of glyph](./plugins#the-values-of-glyph)_** to represent the plug-in to be adapted. `"color"` and `"backgroundColor"` are the foreground and background colours of the icon. They are represented by a colour code in the form #rrggbb. (object)

`type`
: Plug-in type. Currently the only supported value is `"CAD"`. (string)

`runConfiguration`
: Installation-specific configurations. (object)

`displayStrategy`
: Determines how plug-in results are displayed and how feedback is collected. (array)

`createdAt`
: The date the plugin was created, in ISO format. (date)

`updatedAt`
: The date the plugin was updated, in ISO format. (date)

```bash title="Example"
HTTP/1.1 200
Content-type: application/json

[
  {
    "pluginId": "85w1yc7xbzqjr7daf8mu6p2qj7f6a6vegzy4k9nf3vewv7sy32kvjrar49k70h3n",
    "version": "1.0.0",
    "pluginName": "Example-Plugin",
    "description": "Example-Plugin",
    "icon": { "glyph": "brain", "color": "#ffffff", "backgroundColor": "#666666" },
    "type": "CAD",
    "runConfiguration": { "timeout": 900, gpus: "" },
    "displayStrategy": [
      {
        "feedbackKey": "exampleCad",
        "caption": "Example Cad",
        "type": "Example Cad",
        "options": {}
      },
      {
        "feedbackKey": "exampleCad2",
        "caption": "Example Cad 2",
        "type": "Example Cad 2",
        "options": {}
      }
    ],
    "createdAt": "2023-01-10T00:00:00.000Z",
    "updatedAt": "2023-02-20T00:00:00.000Z"
  },
  {
    "pluginId": "9kg1h5pmy32v1ydd70n50tjzvjn4rb8ft95yc7x0yk5x1dgkfxpht2znc5a1tyfe",
    "version": "1.2.3",
    "pluginName": "Example-Plugin2",
    "description": "Example-Plugin2",
    "icon": { "glyph": "lung", "color": "#ffffff", "backgroundColor": "#666666" },
    "type": "CAD",
    "runConfiguration": { "timeout": 900, gpus: "" },
    "displayStrategy": [
      {
        "feedbackKey": "exampleCad3",
        "caption": "Example Cad 3",
        "type": "Example Cad 3",
        "options": {}
      }
    ],
    "createdAt": "2023-03-30T00:00:00.000Z",
    "updatedAt": "2023-03-30T00:00:00.000Z"
  }
]
```

---
