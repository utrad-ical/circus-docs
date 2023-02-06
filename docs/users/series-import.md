---
title: Series Import
---

You can upload DICOM files or ZIP archive files containing DICOM files to import DICOM files to the CIRCUS system.

You can go to the Series Import screen in two ways:

- Select [Series] - [Series Import] in the top menu.
- Select [Series Import] on the home screen.

![Menu - Series Import](./menu-series-import.png)

## Upload Limitations

The following limitations apply when uploading DICOM data via a browser.

- Maximium number of files: 30
- Total file size: 200 MB

:::info

An administrator can increase these limitations via a configuration file.

:::

When uploading a DICOM file on the Series Import screen, the compression status of the DICOM files remains the same (no lossless compression or conversion to uncompressed is performed).

## Uploading DICOM files

1. Click the "Select File" button in the center of the screen to select the files to upload, or drag and drop the files into the box.

   ![Series Import: initial](series-import-initial.png)

1. Select the **domain** the uploaded series will belong to, and the click the [Upload] button.

   ![Series Import: file added](series-import-file-added.png)

   :::important

   You cannot change the domain of the series after they have been upload.

   :::

1. When the upload process is complete, a message appears at the top of the screen indicating that the import has started. Uploading is performed in the background.

   ![Series Import: task started](series-import-task-started.png)

1. Click the bell icon at the top of the screen to check the importing status.

   ![Series Import: task status](series-import-task-status.png)
