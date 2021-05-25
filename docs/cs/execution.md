---
title: Plug-in Execution Flow
---

## Job Management

When a user registeres a plug-in job (hereafter "job" for short), it will be inserted in a queue. Since plug-in execution is usually costly, CIRCUS CS does not execute plug-ins in parallel.

:::note
It is possible to execute plug-ins on multiple separate machines, but this is not documented yet. Please contact the authors if you need support for this.
:::

Each job has one of the following status:

- `in_queue`: Waiting for other jobs to finish.
- `processing`: The job is running.
- `finished`: The job has finished successfully and users can view its results.
- `failed`: The job did not finish successfully.
- `invalidated`: A user manually marked this job as "invalid". One possible reason is that the input file was corrupted.

## Input of Your Plug-in

Your plug-in will be invoked with an external directory mounted to `/circus`. This directory contains the following directories and files.

```
📂/circus/ (mounted to container's root)
    📂in/
        0.mhd
        0.raw
        0.json
        1.mhd
        1.raw
        1.json
          :
    📂out/ (initially empty)
```

The numbers are volume IDs starting from 0.

### RAW volume data (`${volId}.raw`) and MHD file (`${volId}.mhd`)

The `*.raw` files contain the RAW data of the volume extracted by the DICOM series (i.e., only pixel values, no headers or metadata). The corresponding MHD file contains basic geometry information. You can preview the images using third-party MHD viewers.

:::note
Currently, only grayscale images are supported.
:::

### JSON tag dump data (`${volId}.json`)

This file contains anonymized, JSON-serialized version of DICOM tags. To reduce file size, the file is divided into the `common` section and the `unique` section. The `common` section contains tag data that are shared across all the images (or slices) of the series (e.g., study time or modality). The `unique` section contains other tag data that are not common across images (e.g., slice location).

The data related to patient information is not included.

```json
{
  "common": {},
  "unique": []
}
```

## Output of Your Plug-in

Here are the list of information your plug-in can output.

- **Main results JSON** (`/circus/out/results.json`): The main results file containing the JSON-serialized results of your plug-in. Text-based data should go here. The details will be explained later.
- **Optional files** (`/circus/out/*`): All the files your plug-in wrote into `/circus/out` will be stored in the results directory. For example, you can generate images, PDFs or any arbitrary binary file. Displays can access these files and show or let users download them. Each file should have an appropreate extension (e.g., `*.png`, `*.pdf`) because it will be served via HTTP.
- **Standard output**: All the data your plug-in printed to stdout will be saved to a log file in the results directory. Note that anything written to stderr will be ignored.
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
- The container will be deleted after the plug-in ends.
