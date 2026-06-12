# Build Manifest

Build: Signal Schedule v0.15.0 — Analytics Foundation
Source: signal-schedule-v0.14.1-render-registry-repair.zip

## Changes
- Added Analytics Foundation preview sections to Schedule.
- Added analytics metric, report family, trend signal, and forecast planning models.
- Registered analytics render functions in the guarded render registry.
- Updated Schedule sample data and data-model preview for analytics objects.
- Updated Schedule documentation, changelogs, roadmap, and visible version references.

## Validation
- Verified Schedule script syntax with `node --check schedule/script.js`.
- Verified all guarded render registry function references exist.
- Verified DOM IDs used by Schedule renderers exist in `schedule/index.html`.
- Rebuilt file manifest and SHA256 checksums.

## Not Changed
- No database storage.
- No real reports or dashboards.
- No notification workflow yet.
- No approval workflow.
- No final schedule generation.
