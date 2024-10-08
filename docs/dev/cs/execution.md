---
title: Plug-in Execution Flow
---

## Job Management

When a user registers a plug-in job (hereafter "job" for short), it will be inserted in an internal queue. Since plug-in execution is usually costly, CIRCUS CS does not execute plug-ins in parallel.

When a job is started, the CIRCUS CS system will create a Docker container and runs the main process (specified in your Dockerfile). The main application in your container will read and process the input image, and write the processed results into a file. The container will be automatically deleted after the execution regardless of whether it succeeded or failed.

:::note
It is possible to execute plug-ins on multiple separate machines, but this is not documented yet. Please contact the authors if you need support for this.
:::

Each job has one of the following status:

`in_queue`
: Waiting for other jobs to finish.

`processing`
: The job is running.

`finished`
: The job has finished successfully and users can view its results.

`failed`
: The job did not finish successfully.

`invalidated`
: A user manually marked this job as "invalid". One possible reason is that the input file was corrupted.

## Input of Your Plug-in

Your plug-in (Docker container) will be invoked with an external directory mounted to `/circus`. This directory contains the following directories and files.

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

The numbers are volume IDs starting from 0. Volume IDs are specified when you register a job.

### RAW volume data (`${volId}.raw`) and MHD file (`${volId}.mhd`)

The `*.raw` files contain the RAW data of the volume extracted by the DICOM series (i.e., only pixel values, no headers or metadata). The corresponding MHD files contain basic geometry information such as the size and the pixel format. You can preview the images using third-party MHD viewers.

:::note
Currently, only grayscale images are supported.
:::

### JSON tag dump data (`${volId}.json`)

This file contains an anonymized, JSON-serialized version of DICOM tags. The file looks similar to the following (note that this is heavily abbreviated):

```json
{
  "common": {
    "0002,0010": "1.2.840.10008.1.2",
    "0008,0005": "ISO_IR 6",
    "0008,0060": "MR",
    "0008,103e": "MRA Oblique",
    "0028,0004": "MONOCHROME2"
  },
  "unique": [
    {
      "0008,0018": "1.2.840.113619.2.176.3596.10292220.6726.1162856930.137",
      "0020,0013": "1",
      "0020,0032": "-119.671\\-150.354\\41.252"
    },
    {
      "0008,0018": "1.2.840.113619.2.176.3596.10292220.6726.1162856930.138",
      "0020,0013": "2",
      "0020,0032": "-119.671\\-150.417\\40.6553"
    }
  ]
}
```

To reduce file size, the file is divided into the `common` section and the `unique` section. The `common` section contains tag data that are shared across all the images of the series (e.g., study time or modality). The `unique` section is an array, whose items contain other tag data that are not common across images (e.g., slice location). The number of items in the array is the same as the Z-size of the input raw data.

:::important

The data related to patient information are not included. Currently, the following data are unavailable in this file.

<details>
<summary>List of tags unavailable in the tag dump JSON files</summary>

- (0008,0080): Institution name
- (0008,0081): Institution address
- (0008,0082): Institution Code Sequence
- (0008,1040): Institutional Department Name
- (0008,1048): Physician(s) of Record
- (0008,1049): Physician(s) of Record Identification Sequence
- (0008,1050): Performing Physician's Name
- (0008,1052): Performing Physician Identification Sequence
- (0008,1060): Name of Physician(s) ReadingStudy
- (0008,1062): Physician(s) Reading Study Identification Sequence
- (0008,1070): Operators' Name
- (0008,1072): Operator Identification Sequence
- (0010,0010): Patient's name
- (0010,0020): Patient's ID
- (0010,0030): Patient's birth date
- (0032,1031): Requesting Physician Identification Sequence
- (0032,1032): Requesting Physician
- (0032,1033): Requesting Service
- (0032,0030): Patient's birth date

</details>

:::

## Output of Your Plug-in

Here are the list of information your plug-in can output.

- **Main results JSON** (`/circus/out/results.json`): The main results file containing the JSON-serialized results of your plug-in. Text-based data should go here. The details will be explained later.
- **Optional files** (`/circus/out/*`): All the files your plug-in wrote into `/circus/out` will be stored in the results directory. For example, you can generate images, PDFs or any arbitrary binary file. Those data can be accessed or shown to users via "Displays" (described later). Each file should have an appropreate extension (e.g., `*.png`, `*.pdf`) because it will be served via HTTP.
- **Standard output**: All the data your plug-in printed to stdout will be saved to a log file in the results directory. Note that anything written to stderr will be ignored, so you may want to redirect stderr to stdout.
- **Status code**: Your plug-in must exit with a non-zero status code if it has not finished processing successfully. Then CIRCUS CS detects it and mark the job as "failed".

## `results.json`

The `results.json` file is the main output file containing the processing results from your plug-in except binary data. The file must be a UTF8-encoded valid JSON file. (No comments are allowed.) The content of this file will be stored in the database after your plug-in has finished execution. The data stored in the database will then be consumed by Displays when a user opens a results page using a browser. You can store arbitrary data in any format as long as the display understands how to render them into a webpage.

If you are planning to use CIRCUS CS built-in displays (such as `LesionCandidates`), you must store your processed data in the predefined format understood by those displays. For example, `LesionCandidates` expects your `results.json` will contain the data that look like this:

```json
{
  "results": {
    "lesionCandidates": []
  }
}
```

The [built-in display reference pages](./displays/index.md) explain how to prepare your `results.json` for each display.

If you are planning to build a custom Display using React, you can store any data in `results.json`. See: [Custom Result Display](./custom-display.md)

## Other Restrictions

- For security reasons, your plug-in will not have network access. All the data (e.g., trained parameter files) required to process the input image must be contained in the Docker image.
- The container will be deleted after the plug-in ends regardless of whether it succeeded or failed.
