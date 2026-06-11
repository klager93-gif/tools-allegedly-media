# Signal Labs Admin Changelog

## Home v0.9.8 — Home Version Sync Hotfix

**Date:** 2026-06-10

### Fixed

- Updated `assets/components/footer.js`.
- Home/public shared-footer pages now display the current Home version from the shared footer component instead of stale page-level metadata.
- Preserves independent tool versions:
  - Paycheck keeps its own version.
  - Pay Planner keeps its own version.
  - Overtime and Time Off are not modified in this hotfix.

### Reason

Home/public pages were still showing `v0.9.4` because their individual page metadata had not been updated. The shared footer now treats Home/public pages as Home-versioned pages.
