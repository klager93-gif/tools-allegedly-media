# Signal Labs Admin Changelog

## v0.9.9.4 / Signal Schedule v0.1.0 — Schedule Tool MVP

**Date:** 2026-06-11

### Added

- Added new `/schedule/` Signal Schedule tool.
- Added employee creation, shift creation, weekly assignment board, coverage summary, sample data, clear schedule, print support, and local browser saving.
- Added Schedule documentation: `schedule/README.md`, `schedule/HOWTO.md`, `schedule/ROADMAP.md`, and `schedule/CHANGELOG.md`.
- Added missing shared `assets/components/header.js`.
- Added missing shared `assets/global.js`.
- Added missing icon placeholder assets under `assets/icons/`.

### Changed

- Added Signal Schedule to the home page tool grid.
- Added Schedule to shared navigation.
- Updated shared footer routing for `/schedule/`.
- Synced public page cache-busting references to `v0.9.9.4` for shared CSS/JS assets.
- Updated root `README.md`, `HOWTO.md`, `ROADMAP.md`, `MASTER-CHANGELOG.md`, and `ADMIN_CHANGELOG.md` for the Schedule release.
- Updated build manifests and file checksums.

### Fixed

- Fixed missing shared global asset references from the previous baseline.
- Fixed mixed cache versions for `header.js` and `global.js`.
- Fixed footer version reporting so Home can report `v0.9.9.4`.

### Affected Pages

- Home
- About
- Changelog
- Contact
- How To
- Privacy
- Report Issue
- Request Feature
- Roadmap
- Status
- Terms
- Paycheck
- Pay Planner
- Schedule

### Not Modified

- Overtime
- Time Off
- Paycheck calculator logic
- Pay Planner tool logic

## Home v0.9.9.3 + Paycheck v1.0.3 — Global Footer Recovery

**Date:** 2026-06-11

### Fixed

- Recovered styled shared footer across all currently migrated shared-footer pages.
- Synced Paycheck footer/global asset references with the recovered shared footer system.
- Synced Pay Planner footer/global asset references with the recovered shared footer system.
- Preserved Home/public page footer version sync.
- Included matched `footer.js` and `global.css`.

### Root Cause

The previous shared footer recovery fixed Home/public pages but did not include all affected shared-footer pages, especially Paycheck and Pay Planner.

### Standards Updated

- Added Global Change Rule.
- Shared asset changes must include all affected pages and cache-busting updates.

### Affected Pages

- Home
- About
- Changelog
- Contact
- How To
- Privacy
- Report Issue
- Request Feature
- Roadmap
- Status
- Terms
- Paycheck
- Pay Planner

### Not Modified

- Overtime
- Time Off
