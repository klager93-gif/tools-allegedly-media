## Version 0.4.1

**Date:** 2026-06-07  
**Theme:** Master Documentation

### Changes

- Backfilled MASTER-CHANGELOG.md through Time Off v0.9.6.2.
- Updated MASTER-ROADMAP.md current versions and near-term roadmap.
- Added Rule 23 — Master Documentation.
- Added MASTER-CHANGELOG.md and MASTER-ROADMAP.md as required files for every build.
- Added release checklist requirements for master documentation updates.
- Updated Home documentation and manifests.
- No calculator changes.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---


## Version 0.4

**Date:** 2026-06-07  
**Theme:** Release Standards Update

### Changes

- Officially renamed the top-level site from Root to Signal Labs Home in release terminology.
- Updated footer/site label to `Signal Labs · Home · v0.4`.
- Added release metadata rules to STANDARDS.md.
- Added backup folder naming rules to STANDARDS.md.
- Added release package order rules to STANDARDS.md.
- Added restore compatibility rules to STANDARDS.md.
- Updated build validation checks for release responses.
- Updated master release documentation.
- Updated cache-busting references to v0.4.
- No calculator changes.
- No shared asset logic changes.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---


## Version 0.3

**Date:** 2026-06-07  
**Theme:** UI Density Refactor

### Changes

- Added shared compact spacing rules.
- Reduced card padding, result row height, form spacing, and section title spacing.
- Preserved mobile-first behavior while improving desktop information density.
- Updated root cache-busting references to v0.3.
- Updated root documentation and release management files.
- No calculator logic changes.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

# Signal Labs Root Site

# CHANGELOG

---

## Version 0.2.7

**Date:** 2026-06-07  
**Theme:** Release Management System

### Changes

- Added MASTER-CHANGELOG.md.
- Added MASTER-ROADMAP.md.
- Added RELEASE-HISTORY.md.
- Added release management procedures to STANDARDS.md.
- Updated root manifests with release management files.
- Updated root cache-busting references to v0.2.7.
- No calculator changes.
- No shared asset logic changes.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

## Version 0.2.6

**Date:** 2026-06-07  
**Theme:** Backup & Recovery System

### Changes

- Added RESTORE.md.
- Added backups/README.md.
- Added backups/BACKUP-LOG.md.
- Added backups/RESTORE-GUIDE.md.
- Added backup and recovery procedures to STANDARDS.md.
- Added release backup reminder requirement.
- Updated root manifests with backup and restore files.
- Updated root cache-busting references to v0.2.6.
- No calculator changes.
- No shared asset logic changes.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

## Version 0.2.5

**Date:** 2026-06-07  
**Theme:** Versioning Guidance

### Changes

- Added versioning philosophy guidance to STANDARDS.md.
- Clarified that version numbers should reflect scope of change, not artificial synchronization.
- Updated root cache-busting references to v0.2.5.
- Updated root documentation and manifests.
- No calculator logic changes.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

## Version 0.2.4

**Date:** 2026-06-07  
**Theme:** Modal UX Polish

### Changes

- Added click-outside-to-close behavior for shared text modals.
- Added Escape key close behavior for shared text modals.
- Preserved close button behavior.
- Prevented clicks inside the modal box from closing the modal.
- Updated shared global asset cache-busting references to v0.2.4.
- Updated root documentation and manifests.
- No calculator logic changes.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

## Version 0.2.3

**Date:** 2026-06-07  
**Theme:** Standards Manifest Adoption

### Changes

- Added version-string sanity checks to the project standards.
- Fixed malformed root footer version behavior from the previous standards preservation release.
- Added/updated root identity headers.
- Added tool identity headers for Overtime and Time Off files.
- Added FILEMANIFEST.md and BUILDMANIFEST.md to Overtime.
- Added FILEMANIFEST.md and BUILDMANIFEST.md to Time Off.
- Updated root cache-busting references to v0.2.3.
- No calculator logic changes.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

## Version 0.2.2.2

**Date:** 2026-06-07  
**Theme:** Standards Preservation

### Changes

- Added STANDARDS.md as the authoritative project copy of Signal Labs Development Standards v1.1.
- Added FILEMANIFEST.md for required-file and identity tracking.
- Added BUILDMANIFEST.md for pre-ZIP build validation.
- Added identity headers to root index and shared asset files.
- Updated root documentation to reference STANDARDS.md.
- Updated root cache-busting references to v0.2.2.2.
- No app logic changes.
- No calculator changes.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

## Version 0.2.2.1

**Date:** 2026-06-07  
**Theme:** Disabled Ad Slot Fix

### Changes

- Fixed disabled ad slots showing visible placeholder text.
- Added stronger global CSS rules so disabled ad slots do not display text, spacing, borders, or reserved height.
- Updated `initializeAdSlots()` so disabled ad slots are also hidden with the HTML `hidden` property.
- Updated root cache-busting references to v0.2.2.1.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

## Version 0.2.2

**Date:** 2026-06-07  
**Theme:** Ad Slot Framework

### Changes

- Added global ad slot framework support.
- Added disabled ad slot styling.
- Added placeholder ad slot styling.
- Added top, inline, sidebar, footer, and card ad slot classes.
- Added `initializeAdSlots()` helper in global.js.
- Added support for `data-ad-slot` attributes.
- Added support for `data-ad-status="disabled"`.
- Added support for `data-ad-status="placeholder"`.
- Added a disabled root top ad slot for future placement.
- Updated root cache-busting references to v0.2.2.
- Updated root build labels to v0.2.2.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

## Version 0.2.1

**Date:** 2026-06-07  
**Theme:** Navigation Version Label Fix

### Changes

- Updated root site version labels from v0.1.1 to v0.2.1.
- Updated root build summary to v0.2.1.
- Updated root theme label to Navigation Version Label Fix.
- Updated root shared asset cache-busting references to v0.2.1.
- Added root ROADMAP.md.
- Added root HOWTO.md.
- Rebuilt the root release package with the correct folder structure.
- Confirmed no calculator logic changes are included in this release.

---

## Version 0.2

**Date:** 2026-06-07  
**Theme:** Navigation

### Changes

- Added shared Signal Labs navigation.
- Added Home, Overtime, and Time Off navigation links.
- Added active page highlighting.
- Added responsive mobile navigation styling.
- Added shared navigation injection through global.js.
- Preserved shared modal helpers.
- Preserved UTC timestamp helper.
- Added root README.md documentation.
- Added root CHANGELOG.md documentation.

---

## Version 0.1.1

**Theme:** Root Cleanup

### Changes

- Cleaned up root landing page.
- Prepared root site for multiple tools.
- Added basic tool links.

---

## Version 0.1

**Theme:** Initial Root Prototype

### Changes

- Added initial Signal Labs root page.
