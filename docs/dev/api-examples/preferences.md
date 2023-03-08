# API for Preferences

<ApiPreamble verb="get" path="/preferences" />

### Request

```bash title="Example"
GET /api/preferences HTTP/1.1
```

### Response

`theme`
: The background colour of each page (white or black). (stirng)

`personalInfoView`
: Whether patients' personal information (patient ID, name, sex, etc.) can be displayed. (boolean)

`caseSearchPresets`
: The presets of search criteria for cases. (array)

`seriesSearchPresets`
: The presets of search criteria for series. (array)

`pluginJobSearchPresets`
: The presets of search criteria for plugin-jobs. (array)

`referenceLine`
: Whether the reference line is visible. (boolean)

`initailAlphaForNewLabels`
: The initial alpha (opacity) value for newly created labels. (number)

`interpolationMode`
: The interpolation mode (nearest neighbor or trilinear). (string)

`windowPropagationScope`
: How window changes are applied to each viewer. (string)

`scrollBarsInfo`
: Scroll bar settings. (object)

`maintainAspectRatio`
: By default, the aspect ratio of 2D/3D labels is not preserved unless the Shift key is pressed. If this value is `true`, the aspect ratio is preserved by default. (boolean)

`fixCenterOfGravity`
: By default, 2D/3D label resizing is performed with respect to the opposite edge or vertex unless the Ctrl key is pressed. If this value is `true`, resizing is performed with respect to the center of the label by default. (boolean)

`dimmedOutlineFor2DLabels`
: How far 2D labels remain visible. (string)

`revisionMessageTemplates`
: The messages that appear in the revision save dialog box. (array)

`labelColors`
: The label color palette. (object)

```bash title="Example"
HTTP/1.1 200
Content-type: application/json

{
  "theme": "mode_white",
  "personalInfoView": false,
  "caseSearchPresets": [],
  "seriesSearchPresets": [],
  "pluginJobSearchPresets": [],
  "referenceLine": false,
  "initailAlphaForNewLabels": 1,
  "interpolationMode": "trilinear",
  "windowPropagationScope": "all",
  "scrollBars": "none",
  "scrollBarsInfo": {},
  "maintainAspectRatio": false,
  "fixCenterOfGravity": false,
  "dimmedOutlineFor2DLabels": "show",
  "revisionMessageTemplates": [],
  "labelColors": { "useDefault": true, "customColors": [] }
}
```

---

<ApiPreamble verb="patch" path="/preferences" />

### Request

`theme`
: The background color of each page (white or black). Choose between `"mode_white"` or `"mode_black"`. (stirng)

`personalInfoView`
: Whether patients' personal information (patient ID, name, sex, etc.) can be displayed. Set `false` when you want to temporarily hide personal information, e.g., for demonstrating purposes. (boolean)

`caseSearchPresets`
: The presets of search criteria for cases. (array)

`seriesSearchPresets`
: The presets of search criteria for series. (array)

`pluginJobSearchPresets`
: The presets of search criteria for plugin-jobs. (array)

`referenceLine`
: Whether the reference line is visible. (boolean)

`initailAlphaForNewLabels`
: The initial alpha (opacity) value for newly created labels. (number)

`interpolationMode`
: The interpolation mode, either `"nearestNeighbor"` or `"trilinear"`. (string)

`windowPropagationScope`
: How window changes are applied to each viewer, one of `"all"`, `"series"` and `"viewer"`. (string)

`scrollBarsInfo`
: Scroll bar settings. (object)

`maintainAspectRatio`
: By default, the aspect ratio of 2D/3D labels is not preserved unless the Shift key is pressed. If this value is `true`, the aspect ratio is preserved by default. (boolean)

`fixCenterOfGravity`
: By default, 2D/3D label resizing is performed with respect to the opposite edge or vertex unless the Ctrl key is pressed. If this value is `true`, resizing is performed with respect to the center of the label by default. (boolean)

`dimmedOutlineFor2DLabels`
: How far 2D labels remain visible, one of `"hide"`, `"show"` and `"infinity"`. (string)

`revisionMessageTemplates`
: The messages that appear in the revision save dialog box. (array)

`labelColors`
: The label color palette. `"useDefault"` indicates whether the default colour settings should be used. In `"customColors"`, you can set any colour combination. The colours use the hexadecimal CSS colour format (e.g., `"#ffff00"`). (object)

```bash title="Example"
PATCH /api/preferences HTTP/1.1
Content-Type: application/json

{
  "theme": "mode_black",
  "personalInfoView": true,
  "windowPropagationScope": "series",
  "labelColors": { "useDefault": false, "customColors": [ "#7a2424", "#5e2c9b", "#34115f", "#6633a3" ] }
}
```

### Response

```bash title="Example"
HTTP/1.1 204
```

---
