# Signal Labs Admin Changelog

## Home v0.9.6 + Paycheck v1.0.2 — Footer Strip Cleanup

**Date:** 2026-06-10

### Changed

- Updated `assets/components/footer.js`.
- Removed bottom-strip rendering of:
  - Build label
  - Theme label
  - Status label
  - duplicate Changelog / Roadmap / How To links
- Bottom strip now renders:
  - `© 2026 Signal Labs · vX.X.X`

### Scope

Applies to pages using the shared footer component. Does not modify standalone legacy Overtime or Time Off pages yet.
