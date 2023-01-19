---
title: CIRCUS Release Notes
sidebar_label: Release Notes
---

## v1.6.1 (2023-01-19)

### CIRCUS CS

- Reduced the number of WebGL contexts that slowed down PC (#347).

### Misc

- Added an environment variable to automatically start the Plug-in Job Manager when creating a Docker container (#345).
- The `/users/:userEmail` API now additionally returns the user's `loginId` (#342).
- Fixed a bug where search conditions using "Today" returned no results (#340).
- Deselect items' checkboxes after removing them from a mylist (#327, #336).

## v1.6.0 (2022-12-19)

### CIRCUS DB

- Added a new option to determine window propagetion scope (#331).
- Added a warning message before switching revisions before saving (#335).
- Fixed a crash when saving empty voxel data.
- Fixed a crash when trying to add series to a case (#333).

### CIRCUS CS

- Added an ability to search plug-in jobs based on the properties of the primary series (series date, etc).

## v1.5.0 (2022-11-21)

Introduced a new WebSocket-based volume loader. Now each slice of a DICOM series will be loaded incrementally, enabling partial display of MPR images (#261).

### CIRCUS CS

- Added a new `crop` option in LesionCandidate's display option.
- Changed the default radius for candidates shown in LesionCandidates.
- Introduced a new URL query parameter to determine the initial feedback mode (personal or consensual) (#330).

### CIRCUS DB

- Added keyboard shortcuts to change window presets (<kbd>1</kbd>-(<kbd>9</kbd>)) (#320).

### Misc

- `create-circus-cad-plugin` is not integrated to the monorepo (#326).

## v1.4.0 (2022-10-01)

### CIRCUS DB

- Added a data integrity check to ensure voxel label data have been saved before adding a revision (#306).
- Added more configuration option for scroll bars (#309).
- Changed the keyboard shortcuts for changing the viewer layout (<kbd>A</kbd> to <kbd>Ctrl + A</kbd>, etc)
- Added new keyboard shortcuts to increase (<kbd>Q</kbd>) or decrease (<kbd>A</kbd>) the width of brush/eraser.
- You can now use arrow keys (<kbd>Up</kbd>/<kbd>Down</kbd>) for paging a viewer.
- Added `doodHostWorkingDirectory` option for the plug-in to work correctly in DooD (Docker-out-of-Docker) environments (#316).

### CIRCUS CS

- Fixed a bug that caused a plug-in result directory not to be properly created for some cases.

### Misc

- Added a stricter format check for series instance UIDs when uploading DICOM series (#307).
- Added stricter security check for series search.
- Fixed a bug that caused age-based searches to work incorrectly (#313).

## v1.3.0 (2022-08-15)

### Web UI

- Added UI to delete an uploaded series.

### Misc

- Fixed excessive memory usage when exporting volume data in MHD format.
- TaskManager will delete download files when the associated tasks were dismissed or when they become old (#299).
- Added a new API endpoint to upload a single DICOM file without generating a task. Use this endpoint to upload DICOM files one by one (#300).
- The series editor dialog now can add another series from a different study from the same patient.

## v1.2.0 (2022-08-04)

### Web UI

- Added a button to swap the start and end of a partial volume descriptor.
- Changed to "toaster" style message boxes which do not shift page layout and are visible regardless of the current scroll position.

### CIRCUS DB

- The new alogorithm for interslice interpolation (see below) is avalble as an option.

### CIRCUS RS

- Added a new algorithm for interslice interpolation ("single" mode). This may work better e.g., when painting a tubular structure. (#289)

## v1.1.0 (2022-07-06)

### Web UI

- Added one-time URL mechanism which allows users to log-in to the web UI without IDs and passwords. Only administrative users with the `issueOneTime` priviledge can issue one-time URLs. Issued URLs are valid for one minute.

### CIRCUS DB

- You can now define a custom palette for label colors. (#286)
- You can now duplicate labels and perform boolean operations against voxel labels. (#281)
- You can now specify initial alpha values (opacity) for newly created labels. Note that existing labels will not be affected. (#284)
- Fixed memory leaks around history management and web workers. (#285)

### CIRCUS CS

- You can now use custom Display to show plug-in results. (#161)

### CIRCUS RS

- Annotation drawing algorithm have been improved. The viewer now strictly distinguishes on-screen view state and on-render view state. (#282)

### Misc

- Login sessions are now shared across multiple browser tabs. (#226)
- Fix: `checkQueueInterval` option was not used. (#275)
- Added an API endpoint for determining series orientation. (#272)
- Fixed several bugs regarding session management. (#269)
- Internally, CIRCUS now uses MongoDB's transactions to keep stored data consistent.

## [v1.1.0-experimental.1](https://hub.docker.com/layers/circuscad/circus/1.1.0-experimental.1/images/sha256-f34b1a30eb6c951851d8e356b6f16583a13f8201fe8a1fd91f75eaf341a7ddea?context=explore) (7 Feb 2022)

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

### CIRCUS RS

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
