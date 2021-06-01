---
title: Introduction
---

This section explains how a developer can build your CIRCUS CS plug-in and how its results are displayed on a browser.

A CIRCUS CS plug-in is a **Docker image** that follows a certain set of contracts. This means you can use any programming language (C++, Java, Python or even shell script) or runtime to develop your plug-in.

When a CS job is started, the CIRCUS CS system will create a container and runs the main process specified in your Dockerfile. The main application in your container will read and process the input image, and write the processed results into a file.

- **[Plug-in Execution Flow](./execution.md)**: Explains how plug-ins are executed in detail.
- **[Building a Plug-in](./build.md)**: Explains how to build a plug-in image using docker CLI.
- **[Presenting CAD Results](./result-display.md)**: Explains how plug-in results are displayed on a browser.
- **[Built-in Displays](./displays/index.md)**: Explains how to use and costomize built-in displays of CIRCUS CS.
- **[Custom Result Display](./custom-display.md)**: Explains how to fully customize the result screen using your custom React component.
