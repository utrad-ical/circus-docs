---
title: Introduction of CIRCUS RS
sidebar_label: Introduction
---

CIRCUS DB/CS is powered by CIRCUS RS, a lightweight medical image server and a viewer component.

RS Server has the following capabilities:

- **Extensible image repository**: Out of the box, the server can host DICOM files stored on a plain filesystem (local disk, NAS, etc). This can be customized by creating a small accessor called a DICOM file repository. You can store your DICOM files in Amazon S3 or directly connect to traditional PACS.
- **Server-side multiplanar reconstruction (MPR)**
- **Limited support for compressed images**

RS Client is a framework-agnostic image viewer component. In addition to basic displaying functions (paging, zoom, pan, windowing), it has the following key features suitable for researches:

- **Volume-based viewer**: Fully supports multiplanar reconstruction (MPR)
- **Hybrid rendering**: MPR can be performed both on server-side and client-side using the same algorithm.
- **Extensible annotations**: Supports common ones (point, circle, ruler) and uncommon ones used for research (3D ROI, voxel painting)
- **Extensible image source**: Out of the box, the viewer communicates with a CIRCUS RS server to fetch volume data. This can be customized, and it is possible to load local DICOM files or create a completely new volume programmatically.
- **GPU-accerelated volume rendering (VR)**
- MIT Licensed

You can use CIRCUS RS to develop new software that requires DICOM image viewing.

## Limitation

Currnetly, CIRCUS RS does **NOT** support the following:

- Colored images
- Uncommon file types (movie)

## Quickstart

Install CIRCUS RS.
