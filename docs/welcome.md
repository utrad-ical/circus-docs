---
title: Welcome to CIRCUS Docs
sidebar_label: Welcome
slug: /
---

:::note

We welcome your pull requests on our [documentation repository](https://github.com/utrad-ical/circus-docs).

:::

With advances in CT, MRI and other medical imaging devices, the number of images used for diagnosis has increased dramatically. Modern radiologists are required to interpret an enormous number of images. The development of computer-aided diagnosis/detection (CAD) software is expected to improve the efficiency and accuracy of diagnosis.

**CIRCUS** (Clinical Infrastructure for Radiologic Computation of United Solutions) is an integrated, web-based CAD development platform designed to accelerate development cycles for CAD development and clinical application.

CIRCUS is an open-source project released under the MIT license.

## CIRCUS Applications

CIRCUS consists of two top-level applications.

### CIRCUS DB (Database)

CIRCUS DB is an image database system that includes a 3D, web-based lesion shape painting input interface. With CIRCUS DB, researchers can efficiently construct a clinical database used in researches related to machine learning algorithms.

#### Features of CIRCUS DB

- Constructs clinical image database for multiple targete diseases, organs, etc.
- Supports multiple DICOM series in one clinical case.
- Flexible metadata registration per project (smoking history, etc)
- Data are downloadable with several formats

### CIRCUS CS (Clinical Server)

Evaluating a newly developed CAD algorithm in a routine clinical environment is not easy. Images in the DICOM format, which is not widely used outside of medicine, must be transferred from imaging devices or PACS and parsed to extract pixel values. After processing images, researchers need to display the results and collect feedback data for each case in a timely manner. CIRCUS CS is a platform that facilitates the clinical use and evaluation of CAD software.

#### Features of CIRCUS CS

- Receives image files directly from imaging devices or PACS installed in medical facilities
- Run image processing applications and display results on the browser
- All applications can be easilly installed as an Docker image
- Flexible feedback collection algorithm, which can be used to improve the algorithm as well as analyzing or improving human's reading performance

## About This Documentation

The docs consists of the following 3 main sections.

[User Guide](./users/login.md)
: Explains how to use the CIRCUS web app as an end user.

[Administrator Guide](./admin/installation.mdx)
: Explains how to install, update or maintain CIRCUS as an administrator.

[Developer Guide](./dev/index.md)
: Contains docs for developers who wish to access CIRCUS data using our web API, or create a new CIRCUS CS plug-in using a programming language you choose.

## License

CIRCUS is an open-source project released under the MIT License. Plug-ins that work on CIRCUS CS can have a difference license (including a commercial license).

The official CIRCUS runtime (Docker image) contains other open-source software programs. Notable ones include:

- Node.js
- nginx
- MongoDB

## Publications

The details of CIRCUS has been published in the following article. If you wish to present the results of your research using CIRCUS, please clearly state that you used CIRCUS and cite the following references.

<div class="panel">
Nomura Y, Miki S, Hayashi N, Hanaoka S, Sato I, Yoshikawa T, Masutani Y, Abe O<br />
<b>Novel platform for development, training, and validation of computer-assisted detection/diagnosis software</b><br />
International Journal of Computer Assisted Radiology and Surgery, vol.15, no.4, 661-672, 2020
</div>

- [**Journal's site** (open access)](https://rdcu.be/b2OLL)
