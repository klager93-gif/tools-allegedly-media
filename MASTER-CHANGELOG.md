# Signal Labs Master Changelog

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
