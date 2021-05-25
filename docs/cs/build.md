---
title: Building a Plug-in
---

This page explains how to build your CIRCUS CS Plug-in. We assume the basic understanding of Docker.

## 1. Build Your Main Executable

As described in the previous page, a program written in any language (C++, Java, Python or even shell script) can work as a CIRCUS plug-in. Ensure the following:

- Your executable must not access to network.
- Your executable must be able to read input data from `/circus/in/` and output results to `/circus/out/`.
- Your executable must end with a status code of `0` if it has finished processing successfully.
- (Optional) Your executable can print log text into stdout, which will help troubleshooting when something went wrong.

:::tip
`/circus/in` and `/circus/out` do not have to be hardcoded. We recommend making these paths configurable via command-line arguments. You can specify the `circus` paths via the `CMD` line in the Dockerfile.

```bash title="During the development..."
$ my-awesome-detector --in=./test-images --out=./out
```

```docker title="Dockerfile"
COPY ./my-awesome-detector /
CMD /my-awesome-detector --in=/circus/in --out=/circus/out
```
:::

## 2. Write the `plugin.json` Manifest File

## 3. Write the Dockerfile

```dockerfile
FROM **
COPY
CMD /my-cad --input=/circus/in --output=/circus/out
```

## 4. Build and Pack

