# Master Changelog

## 2026-06-11 — Signal Schedule v0.1.4 Version Consistency Update

### Added

- Added Rule 23: Version Consistency to release standards.
- Added a formal requirement that user-facing version references must be updated during each release.

### Changed

- Updated Signal Schedule page metadata, footer version, status text, cache-busting, and text output version to v0.1.4.
- Updated root and Schedule documentation to identify v0.1.4 as the current release.
- Moved the previously planned local sandbox cleanup milestone to v0.1.5.

### Fixed

- Fixed stale visible Schedule version references that still showed v0.1.1 after later documentation releases.
- Preserved older local sandbox data by adding old localStorage key fallback support.

## 2026-06-11 — Signal Schedule v0.1.3 Rule Engine and Agency Policy Planning

### Added

- Added Schedule rule-engine planning so future schedule logic can support multiple agency types and explain why decisions were made.
- Added `schedule/RULE-ENGINE.md`.
- Expanded Schedule database planning for agency policies, benefit accrual, mandate rotation, mandate exceptions, bidding, fairness metrics, qualifications, and decision explanations.

### Changed

- Reframed Schedule as a policy-aware staffing engine with calendar views instead of a calendar-first or dispatch-only tool.
- Updated root roadmap and Schedule docs to preserve the rule-engine direction before the next coding pass.

# Signal Labs Master Changelog

## v0.9.9.6 / Signal Schedule v0.1.2 — Roadmap and Architecture Planning

**Date:** 2026-06-11  
**Type:** Documentation / planning release

### Added

- Expanded Signal Schedule roadmap around local sandbox cleanup, date-based scheduling, month view, schedule patterns, rotations, time off conflicts, publishing, and future backend work.
- Expanded `schedule/DATABASE-PLAN.md` with pattern, override, schedule period, shift swap, notification, and audit log planning.
- Added the architecture rule that future schedules should be generated from pattern + start date + overrides instead of storing every future day forever.

### Changed

- Reframed Signal Schedule as a small scheduling application rather than a single-page spreadsheet replacement.
- Updated `schedule/README.md`, `schedule/ROADMAP.md`, `schedule/DATABASE-PLAN.md`, `schedule/HOWTO.md`, root `ROADMAP.md`, and Schedule changelog.

### Fixed

- Confirmed `/schedule/` already had documentation files and avoided creating duplicates.

## v0.9.9.5 / Signal Schedule v0.1.1 — Logic Sandbox

**Date:** 2026-06-11  
**Type:** Feature refinement

### Added

- Added employee role selection to Signal Schedule.
- Added minimum staffing requirement per shift.
- Added sandbox rules for max weekly hours and minimum rest gap between shifts.
- Added coverage, weekly-hour, and rest-gap warnings.
- Added plain-text schedule output with copy support.
- Added rough month planning preview.
- Added `schedule/DATABASE-PLAN.md` for future PHP/database planning.

### Changed

- Reframed Signal Schedule as a logic-first sandbox before full UI/backend expansion.
- Updated Schedule documentation to clarify temporary local-storage status.
- Updated Schedule roadmap around month view, date-based assignments, and later PHP/backend work.

### Fixed

- Reduced risk of overbuilding temporary UI before schedule rules are proven.
- Clarified that future employees and login users should be modeled separately.

## v0.9.9.4 / Signal Schedule v0.1.0 — Schedule Tool MVP

**Date:** 2026-06-11  
**Type:** Feature release

### Added

- Added `/schedule/` as Signal Schedule v0.1.0.
- Added employee, shift, assignment, weekly board, local save, coverage summary, sample data, clear, and print actions.
- Added schedule-specific README, HOWTO, CHANGELOG, and ROADMAP docs.
- Added missing shared `assets/components/header.js` and `assets/global.js`.

### Changed

- Added Signal Schedule to the home tool grid.
- Added Schedule to shared navigation.
- Updated shared footer route handling for `/schedule/`.
- Synced shared asset cache references to `v0.9.9.4`.

### Fixed

- Restored missing shared global assets from the baseline.
- Updated stale `assets/global.css` version header.
- Fixed mixed cache-busting versions introduced during the Schedule build.


## Home v0.9.9.3 + Paycheck v1.0.3 — Global Footer Recovery

**Date:** 2026-06-11  
**Type:** Corrective release

### Changes

- Recovered styled footer for all migrated shared-footer pages.
- Updated Home/public pages to `v0.9.9.3`.
- Updated Paycheck to `v1.0.3` for footer recovery sync.
- Updated Pay Planner to `v0.1.1` for footer recovery sync.
- Added Global Change Rule to Standards v2.0.
- Preserved Overtime and Time Off unchanged.

### Notes

No calculator logic changes.
