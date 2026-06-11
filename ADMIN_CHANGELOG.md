# Signal Labs Admin Changelog

## Home v0.9.2 + Paycheck v1.0.0

- Moved standards into `/standards/`.
- Moved install/restore/backup docs into `/docs/`.
- Moved root manifests/checksums into `/build/`.
- Added `/assets/icons/` favicon kit.
- Created unlinked `/pay-planner/` incubator.
- Removed Target Pay from `/paycheck/`.

## Home v0.9.3 — Footer Simplification

**Date:** 2026-06-10

- Updated `assets/components/footer.js` to render a single simplified bottom strip.
- Added global CSS override for the simplified footer bottom row.
- Confirmed change applies to shared-footer pages using `#sl-footer`.

## Paycheck v1.0.1 — Footer Simplification

**Date:** 2026-06-10

- Bumped Paycheck metadata to v1.0.1.
- Paycheck inherits the shared footer simplification through `footer.js`.

## Home v0.9.4 + Paycheck v1.0.2 — Footer Strip Cleanup

- Updated assets/components/footer.js shared footer renderer.
- Footer strip now omits theme, status, and duplicate links across shared-footer pages.

