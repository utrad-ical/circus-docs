---
title: Plug-in Execution Flow
---

A CIRCUS CS Plug-in is a Docker image. This means you can use any programming language or runtime to develop your plug-in.

When a CS job is started, the CIRCUS CS system will create a container and runs the process specified in your Dockerfile.

The main application in your container will read and process the input image, and write the processed results into a file.

## Input of Your Plug-in

Your plug-in will be invoked with an external directory mounted to `/circus/in`. This directory contains the following files.

```
📂/circus (mounted to container's root)
    📂/in
        0.mhd
        0.raw
        0.json
        1.mhd
        1.raw
        1.json
          :
    📂/out (initially empty)
```

The numbers are volume IDs starting from 0.

### RAW volume data (`${volId}.raw`) and MHD file (`${volId}.mhd`)

The RAW data of the volume extracted by the DICOM series, and the corresponding MHD file containing basic geometry information. You can preview the images using an MHD viewer.

:::note
Currently, only grayscale images are supported.
:::

### JSON tag dump data (`${volId}.json`)

This file contains anonymized, JSON-serialized version of DICOM tags. To reduce file size, the file is divided into the `common` section and the `unique` section. The `common` section contains tag data that are shared across all the images (or slices) of the series (e.g., study time). The `unique` section contains other tag data that are not common across images (e.g., slice location).

The data related to patient information is not included.

```json
{
    "common": {
        
    },
    "unique": [
    ]
}
```

## Output of Your Plug-in

Your plug-in must output those information.

- **Main results JSON** (`/circus/out/results.json`): The main results file containing the JSON-serialized results of your plug-in. Text-based data should go here. The details will be explained later.
- **Additional binaries** (`/circus/out/*`): All the files your plug-in wrote into `/circus/out` will be stored in the results directory. For example, you can generate images, PDFs or any arbitrary binary data. Displays can access these files and show or let users download them.
- **Standard output**: All the data your plug-in printed via stdout will be saved to a log file in the results directory. Note that anything written to stderr will be ignored.
- **Status code**: Your plug-in must exit with a non-zero status code if it has not finished processing successfully. Then CIRCUS CS detects it and mark the job as "failed".

## `results.json`

The `results.json` file is the main output file containing the processing results from your plug-in except binary data. The file must be a UTF8-encoded valid JSON file. (No comments are allowed.) The content of this file will be stored in the database after your plug-in has finished execution. The data stored in the database will then be consumed by Displays when a user opens a results page in a browser. You can store arbitrary data in any format as long as the display understands how to render them into a webpage.

If you are planning to use CIRCUS CS built-in displays (such as `LesionCandidates`), you must store yoru processed data in the format those displays understand. For example, `LesionCandidates` expects your `results.json` will contain the data that look like this:

```json
{
    "results": {
        "lesionCandidates": []
    }
}
```

See the display reference page.

## Other Restrictions

- For security reasons, your plug-in will not have network access. All the data required to process the input image must be contained in the Docker image.