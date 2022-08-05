---
title: Introduction of CIRCUS RS
sidebar_label: Introduction
---

CIRCUS DB/CS is powered by **CIRCUS RS**, a lightweight medical image server and a viewer component, written in TypeScript. You can develop a custom viewer application on top of CIRCUS RS.

CIRCUS RS consists of the server part and the viewer (brower) part. RS Server is basically a small HTTP server that hosts DICOM images in the form of volumes, and RS Client is a framework-agnostic image viewer component that can display volume data obtained from an arbitrary resource, including RS Server.

:::caution

CIRCUS RS is intended to be used for research purposes, and it comes with absolutely no warranty.

:::

RS Server has the following capabilities:

- **Extensible image repository**: Out of the box, the server can host DICOM files stored on a plain filesystem (local disk, NAS, etc). This can be customized by creating a small accessor called a DICOM file repository. You can store your DICOM files in Amazon S3 or directly connect to traditional PACS.
- **Server-side multiplanar reconstruction (MPR)**
- **Limited support for compressed images**

RS Client is a framework-agnostic image viewer component. In addition to basic displaying functions (paging, zoom, pan, windowing), it has the following key features suitable for researches:

- **Volume-based viewer**: Fully supports GPU-accelerated, clieent-side multiplanar reconstruction (MPR) and volume-rendering (VR)
- **Hybrid rendering**: MPR can be performed both on server-side and client-side using the same algorithm.
- **Extensible annotations**: Supports common ones (point, circle, ruler) and uncommon ones used for research (3D ROI, voxel painting)
- **Extensible image source**: Out of the box, the viewer communicates with a CIRCUS RS server to fetch volume data. This can be customized, and it is possible to load local DICOM files or create a completely new volume programmatically.
- Common **morphological operations** including erosion, dilatation, etc.

All modern desktop browsers are supported. Currently, mobile browser support is limited. We do not support Internet Explorer.

## Limitation

Currnetly, CIRCUS RS does **NOT** support the following:

- Movies (typically from ultrasound)

## See the Interactive Demo

CIRCUS RS has an interactive demo, which is available online here. You can run the demo on your local machine by \*\*\*.

```bash
$ npm install @utrad-ical/circus-rs-demo
```

:::note

The demo is using React, but CIRCUS RS itself does not depend on React (or jQuery, Angular, etc.). The demo uses a small wrapper component around CIRCUS RS's `Viewer` to use it seemlessly in a React component tree.

:::

## Quickstart

Install Node.JS (>= 12.0) if it has not been installed yet on your system. If you are on Linux, NVM is the easiest.

Start a new Node project and install CIRCUS RS via NPM.

```bash
$ mkdir my-first-rs-app
$ cd my-first-rs-app
$ npm init -y
$ npm install @utrad-ical/circus-rs
```

Optionally, install the following TypeScript-related packages. This is not strictly required, but we highly recommend using TypeScript for better developer experiences.

```bash
$ npm install typescript ts-node
```
