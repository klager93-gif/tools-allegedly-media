# Signal Labs Admin Changelog

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
