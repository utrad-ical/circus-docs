---
title: CIRCUS Release Notes
sidebar_label: Release Notes
---

## v1.1.0

6 July 2022

### Web UI

- Added one-time URL mechanism which allows users to log-in to the web UI without IDs and passwords. Only administrative users with the `issueOneTime` priviledge can issue one-time URLs. Issued URLs are valid for one minute.

### CIRCUS DB

- You can now define a custom palette for label colors. (#286)
- You can now duplicate labels and perform boolean operations against voxel labels. (#281)
- You can now specify initial alpha values (opacity) for newly created labels. Note that existing labels will not be affected. (#284)
- Fixed memory leaks around history management and web workers. (#285)

### CIRCUS RS

- Annotation drawing algorithm have been improved. The viewer now strictly distinguishes on-screen view state and on-render view state. (#282)

### CIRCUS CS

- You can now use custom Display to show plug-in results. (#161)

### Misc

- Login sessions are now shared across multiple browser tabs. (#226)
- Fix: `checkQueueInterval` option was not used. (#275)
- Added an API endpoint for determining series orientation. (#272)
- Fixed several bugs regarding session management. (#269)
- Internally, CIRCUS now uses MongoDB's transactions to keep stored data consistent.

## [v1.1.0-experimental.1](https://hub.docker.com/layers/circuscad/circus/1.1.0-experimental.1/images/sha256-f34b1a30eb6c951851d8e356b6f16583a13f8201fe8a1fd91f75eaf341a7ddea?context=explore)

7 Feb 2022

### Web UI

- Fixed pagenation bugs in saerch pages (series search, case search, plugin job search). (#218)
- You can now navigate to the previous/next case or job without going back to the search results screen. (#195)
- Introduced external authentication provider (AuthProvider). Instead of using the internal password for authentication, CIRCUS now can load a AuthProvider which takes care of the authentication. (#159)
- Fixed some cosmetic bugs. (#210)

### CIRCUS DB

- Connected component labeling (CCL) and hole filling (HL) improvements:

  - They can now process more complexed voxel labels by making the number of intermediate labels variable. (#214)
  - They now use web workers, meaning they will no longer hurt browser responsiveness. (#172)
  - Fixed some bugs. (#189)

- Added erosion, dilatation, and interslice interpotation for voxel labels (#209) -> [Go Document](./users/case-detail#mathematical-morphology)
- Added support for displaying 2D images such as chest X-ray and mammograms. (#207)
- You can now change the visibility of multiple labels by dragging over the label color boxes. (#198)
- You can now use message history and saved message when saving a new revision. Saved messages can be configured in the preference page. (#196)
- Warnings will be shown when you are trying to leave the page without saving a revision. (#195)
- Fixed some bugs regarding CCL and hole filling. (#189)
- The WL/WW (window lavel/width) dialog now shows the current window value when opened (#187)
- Added "three points to section" functionality which allows the user to display oblique section (#174) -> [Go Document](./users/case-detail#oblique-断面の自動生成)
- Some settings which had been only configurable via the preference page are now configurable without leaving the main DB screen. (#202)

### CIRCUS RS 関連

- Multiplanar reconstruction (MPR) was reimplemented using WebGL and is now much faster. (#193)
- Improved MPR speec when pixel interpolation are enabled. (#179)
- Fixed RS devserver icons. (#183)

### Misc

- Add "job status" as a job search condition. (#205)
- Implemented deletion of cases. (#197)
- Internal repository now use NPM workspaces instead of Lerna. (#176)
- Export case with revision index. (#170)
- Updated pm2 (2.10.4 → 5.1.0). (#166)
- Series import now supports tar.gz archive files in addition to ZIP. (#158)
