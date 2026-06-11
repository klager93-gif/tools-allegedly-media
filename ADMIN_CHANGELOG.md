# Signal Labs Admin Changelog

## Home v0.9.9 — Public Page Version Sync Hotfix

**Date:** 2026-06-10

### Fixed

- Replaced `assets/components/footer.js`.
- Home and public shared-footer pages now force the current Home version in the footer bottom strip.
- This avoids stale page-level `data-sl-version` values such as `v0.9.4`.

### Preserved

- Paycheck keeps its independent tool version.
- Pay Planner keeps its independent incubator version.
- Overtime and Time Off are untouched.
