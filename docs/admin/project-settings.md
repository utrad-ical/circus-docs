---
title: Managing Projects
---

## Creating and Modifying Projects

Select [Administration] - [Projects] from the menu at the top of the screen to display the user settings screen.

To create a new project, click the "Create new" button. After entering each item, click "Save".

![Create new project](create-new-project.png)

To make changes to an existing project, click on the line of the project whose settings you wish to change from the top list.

## Configurable Options

<dl>
<dt>Project Name</dt>
<dd>The name of the project. This can be changed later. For example, "XYZ Study 2020".</dd>

<dt>Description</dt>
<dd>The longer description of this project.</dd>

<dt>Icon</dt>
<dd>The icon of this project. You can choose the image, the foreground color and the background color.</dd>

<dt>Window Presets</dt>
<dd>The list of presets of DICOM windows (a pair of window level and window width).

![Window Presets](project-window-presets.png)

</dd>

<dt>Window Priority</dt>
<dd>Determines how to set the initial window level/width when displaying DICOM series on CIRCUS DB.

- `preset`: Uses the first entry of "Window Presets" (described above). If there is no preset, falls back to the next option.
- `dicom`: Uses the window value in the DICOM series (window center (0x0028, 0x0050) / window width (0x0028, 0x0051). If these DICOM tags are not present, falls back to the next option.
- `auto`: Automatically adjests the window based on the minimum/maximum pixel values of the DICOM series.

</dd>

<dt>Tags</dt>
<dd>The list of available tags a user can associate to each case.

![Tag](project-tags.png)

</dd>

<dt>Case/Label Attribute Schema</dt>
<dd>The list of attributes (additional information) a user can enter for each case or label. Those data will be stored key/value pairs.

- `Key`: The key to store this data with.
- `Required`: Determines if this data is required.
- `Type`: The data type of this attribute.
  - `Text`: The data is stored as a string.
  - `Number`: The data is stored as a number.
  - `Integer`: The data is stored as an integer.
  - `Checkbox`: The data is stored as a boolean (true/false value).
  - `Select`: The data will be one of the items specified in the Spec section.
- `Spec`: Additional constrains for each type. When the type is 'Select', you can specify the list of items.

![Attribute Schema](attribute-schema.png)

</dd>

</dl>
