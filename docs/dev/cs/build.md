---
title: Building a Plug-in
---

This page explains how to build your CIRCUS CS Plug-in. We assume the basic understanding of Docker.

:::note

You can find example plug-in examples in the following repository:

https://github.com/utrad-ical/circus-cs-plugin-samples

:::

## 1. Build Your Main Executable

As described in the previous page, a program written in any language can work as a CIRCUS plug-in. Ensure the following:

- Your executable (and sub-processes) does not have network access. Your image must be self-contained.
- Your executable must be able to read input data from `/circus/in/` and output results to `/circus/out/`.
- Your executable must end with a status code of `0` if it has finished processing successfully.
- (Optional) Your executable can print log text into the standard output (stdout), which will help troubleshooting when something went wrong.

:::tip
`/circus/in` and `/circus/out` do not have to be hardcoded. We recommend making these paths configurable via command-line arguments. You can then specify these paths via the `CMD` line in the Dockerfile.

```bash title="During the development..."
$ my-detector --in=./test-images --out=./out
```

```docker title="Dockerfile"
COPY ./my-detector /
CMD /my-detector --in=/circus/in --out=/circus/out
```

:::

## 2. Write the `plugin.json` Manifest File

Create a JSON file called `plugin.json`. This is a manifest file that contains the plug-in name, version, author, etc.

```json title="plugin.json"
{
  "type": "CAD",
  "pluginName": "My-Detector",
  "version": "1.0.0",
  "description": "Detects something",
  "icon": {
    "glyph": "calc",
    "color": "#ffffff",
    "backgroundColor": "#000000"
  },
  "displayStrategy": [
    {
      "caption": "Results",
      "type": "VolumeOverlay"
    },
    {
      "feedbackKey": "evaluation",
      "caption": "Score",
      "type": "Numeric",
      "options": {
        "minimum": 1,
        "maximum": 5,
        "multipleOf": 1
      }
    }
  ]
}
```

Note that you **cannot write comments** in the real JSON file.

- `type`: This must be the string literal "CAD".
- `pluginName`: The name of this plug-in. It is not used internally to distinguish plugins, but please choose one that is as unique as possible.
- `version`: The version of this plug-in. Must be [semvar](https://semver.org/)-compatible.
- `icon`: The icon of this plug-in.
- `icon.glyph`: The icon of this plug-in. See `packages/circus-icons` for available glyphs.
- `icon.color` and `icon.backgroundColor`: Must be in the 6-digit hex format.
- `displayStrategy`: An array of objects that describes how to display the plug-in results by default. For details of how this works, read [Presenting CAD Results](./result-display.md). If you want examples, refer to [Built-in Displays](./displays/index.md) reference pages.

:::note
`icon` and `displayStrategy` values can be overwritten after the installation via the administration screen of CIRCUS. Think of them as the default values.
:::

## 3. Write the Dockerfile

There is little that's special here, but make sure:

- `plugin.json` is located at the root directory (`/plugin.json`).
- There is a `CMD` line that locates to your main executable along with the desired arguments.

```dockerfile
FROM ubuntu:20.04
COPY ./my-cad
CMD /my-cad --input=/circus/in --output=/circus/out
```

## 4. Build the Image

```bash
$ docker build
```

## 5. Test Your Plug-in

1. Make a directory similar to this:

   ```
   📂test-dir/
       📂in/
           0.raw
           0.mhd
           0.json
       📂out/
   ```

   The contents of the `in` file can be downloaded via CIRCUS web UI (You need a `downloadVolume` global privilege).

2. Run the following.

   ```bash
   $ docker run --rm my-cad:1.0.0 -v /test-dir:/circus
   ```

   The `--rm` option auto-deletes the container after the container's main process has finished.

3. Investigate the `test-dir/out` directory and see `results.json` and other output files are correctly generated.

## 6. Pack and Distribute

To pack your docker image into a gar.gz archive, do:

```bash
$ docker save my-detector | gzip > my-detector-1.0.0.tar.gz
```

Then this archive can be loaded into another machine like so (\*.gz files are automatically unzpped):

```bash
$ cat my-detector-1.0.0.tar.gz | docker load
```

Alternatively, your image can be hosted in Docker Hub or any other container registries.

## 7. Install the plug-in

Refer to the admin page: [Registration of CS Plug-ins](../../admin/registration-cs-plugin.mdx)

:::caution
Plug-ins are identified using the SHA-256 image hash. Thus you cannot change the content of the plug-in after installing it. When you have modified the content, rebuild the image and re-install it with a different version.
:::
