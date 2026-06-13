# Schedule v2.1.1 — Full Root Deployment Cleanup

Backup title:

```text
2026-06-12 Schedule Backup Before v2.1.1
```

## Purpose

This patch cleans the full-root deploy package after the v2.1 Calendar Foundation release. It preserves the Schedule foundation overview and user-facing calendar preview while removing macOS resource forks, Git internals, and other deployment junk from the replacement ZIP.

## Added / Changed

- Added Calendar Preview entry link from `schedule/index.html` to `schedule/schedule.html`.
- Updated Schedule metadata to v2.1.1.
- Added package cleanup documentation.
- Rebuilt as a full-root replacement package.

## Removed From Package

- `__MACOSX/`
- `.git/`
- `._*` AppleDouble files
- `.DS_Store` files

## Not Changed

- No Paycheck functionality changes.
- No Overtime functionality changes.
- No Time Off functionality changes.
- No Schedule engine behavior changes.
