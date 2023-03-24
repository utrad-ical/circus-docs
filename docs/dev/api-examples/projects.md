# API for Projects

<ApiPreamble verb="get" path="/projects/:projectId" />

Required setting: [**Readable Projects**](../../../docs/admin/group-settings#project-settings)

### Request

`projectId` (path parameter)
: ID of the project.

```bash title="Example"
GET /api/projects/4hn1qd8vr9rzq2yjjez4q4p20m HTTP/1.1
```

### Response

`projectId`
: ID of the project. (string)

`projectName`
: The name of the project. (string)

`icon`
: Represents an icon for the plug-in. The setting items are `"glyph"`, `"color"` and `"backgroundColor"`. `"glyph"` is one of [available icon glyphs](./plugins#AvailableIconGlyphs), and `"color"` and `"backgroundColor"` are in the hexadecimal CSS color format (e.g., `"#ffff00"`). (object)

`description`
: Optional text to explain the project. (string)

`windowPriority`
: String specifying which value to use for the initial window of CIRCUS RS viewer. (string)

`windowPresets`
: List of window presets for use in CIRCUS RS viewer. (array)

`tags`
: List of tags available in the project. (array)

`caseAttributesSchema`
: The schema of case attributes defined as a subset of JSON Schema. (object)

`labelAttributesSchema`
: The schema of label attributes defined as a subset of JSON Schema. (object)

`createdAt`
: The date the project information was registered, in ISO date format. (date)

`updatedAt`
: The date the project information was updated, in ISO date format. (date)

```bash title="Example"
HTTP/1.1 200
Content-Type: application/json

{
  "projectId": "4hn1qd8vr9rzq2yjjez4q4p20m",
  "projectName": "Example Project",
  "icon": { "glyph": "lung", "color": "#ffff00", "backgroundColor": "#00ffff" },
  "description": "Description of example project",
  "windowPriority": "dicom,auto",
  "windowPresets": [],
  "tags": [
    { "caption": "example1", "color": "#ff0000" },
    { "caption": "example2", "color": "#00ff00" }
  ],
  "caseAttributesSchema": {},
  "labelAttributesSchema": {},
  "createdAt": "2023-01-10T00:00:00.000Z",
  "updatedAt": "2023-02-20T00:00:00.000Z"
}
```

---
