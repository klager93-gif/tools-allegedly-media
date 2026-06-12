## Signal Schedule v0.16.0 — Notifications Foundation

- Built from `signal-schedule-v0.15.0-analytics-foundation.zip`.
- Added notificationTriggers, notificationChannels, notificationSubscriptions, and notificationAuditExamples state arrays.
- Added defaults, normalization, sample-state loading, render functions, registry entries, safeRender calls, text export counts, and data-model counts.
- Added Schedule notification preview sections and CSS.
- Updated Schedule docs, roadmap, changelog, database plan, and rule-engine notes.
- Preserved v0.15 Analytics Foundation and v0.14.1 render registry repair.

## Signal Schedule v0.15.0 — Analytics Foundation

- Added analytics arrays to Schedule state and sample data.
- Added default analytics metric, report, trend, and forecast models.
- Added analytics preview renderers and registered them in the guarded render registry.
- Updated Schedule UI copy, version references, documentation, and roadmap.
- No persistence/database layer added.

# Signal Labs Admin Changelog

## v0.9.9.5 / Signal Schedule v0.1.1 — Logic Sandbox

**Date:** 2026-06-11

### Added

- Added employee roles in `/schedule/`.
- Added minimum staff per shift.
- Added schedule rules for max weekly hours and minimum rest gap.
- Added rule warning panel.
- Added text output panel and copy action.
- Added rough month planning preview.
- Added `schedule/DATABASE-PLAN.md`.

### Changed

- Updated `schedule/index.html`, `schedule/style.css`, and `schedule/script.js` for logic sandbox behavior.
- Updated `schedule/README.md`, `schedule/HOWTO.md`, `schedule/CHANGELOG.md`, and `schedule/ROADMAP.md`.
- Updated root README, ROADMAP, MASTER-CHANGELOG, ADMIN_CHANGELOG, and HOWTO for the v0.1.1 Schedule release.
- Kept global navigation, footer, and home page unchanged because Schedule was already added in v0.1.0.

### Fixed

- Clarified temporary local-storage behavior.
- Clarified that PHP/database work should wait until schedule logic is proven.
- Clarified that future employees and login users should be separate data models.

### Affected Pages

- Schedule
- Root documentation

### Not Modified

- Home layout
- Shared navigation
- Shared footer
- Overtime
- Time Off
- Paycheck calculator logic
- Pay Planner tool logic

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

## Home v0.9.9.6 — Release Archive Standard

- Added release archive standards for Signal Labs project management.
- Updated Home/public version references and shared asset cache references.
- No user-facing calculator logic changed.

