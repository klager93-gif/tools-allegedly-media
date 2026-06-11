# Signal Labs Admin Changelog

## Home v0.9.7 — Footer Component Hotfix

**Date:** 2026-06-10

### Fixed

- Updated `assets/components/footer.js`.
- Removed duplicate bottom-strip metadata from shared-footer pages.
- Removed bottom-strip output for:
  - Build
  - Theme
  - Status
  - duplicate Changelog / Roadmap / How To links

### Result

The shared footer bottom strip now renders only:

```text
© 2026 Signal Labs · vX.X.X
```

### Scope

This hotfix only changes the shared footer component and internal changelogs. No public changelog entry was added.
