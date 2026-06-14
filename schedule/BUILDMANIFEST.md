# Signal Schedule Build Manifest — v4.7.0

Build: Signal Schedule v4.7.0 — Schedule History & Snapshot Engine

Package type: Full replacement.

Source: Signal Schedule v4.6.1 full replacement package.

## Included release work

- Replaced the user-facing saved-schedule page with `schedule/history.html`.
- Renamed navigation and dashboard wording to Schedule History.
- Added one-agency / one-living-schedule / many-snapshots product principle.
- Added Schedule History & Snapshot Engine documentation.
- Kept migration 044 and `/api/saved-schedules` API as the internal compatibility layer.
- Updated builder action wording to Save Snapshot and Schedule History.
- Updated app shell version/cache strings to v4.7.0.

## Validation

- JavaScript syntax checks passed.
- HTML asset reference check passed.
- No SQL migration required.
- No `.git`, `__MACOSX`, AppleDouble, or `.DS_Store` package junk included.
