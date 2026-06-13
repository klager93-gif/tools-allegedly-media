# Signal Schedule v2.3.1 — Version Sync + API File Integrity Fix

## Release type

Cleanup / integrity release. No new workflow features.

## Changes

- Synced Schedule visible versions and metadata to v2.3.1.
- Updated `schedule/script.js` storage key to `signalSchedule.v2.3.1`.
- Added missing JSON seed files required by the UI/API:
  - `schedule/data/agencies.json`
  - `schedule/data/employees.json`
  - `schedule/data/assignment-templates.json`
  - `schedule/data/employee-assignments.json`
- Added missing optional Postgres adapter:
  - `schedule/api/coolify/db/postgres.js`
- Updated Schedule and root README files.
- Cleaned Schedule changelog order/formatting.
- Packaged without `.git`, macOS resource forks, or temporary files.

## Validation

- `node --check schedule/script.js`
- `node --check schedule/api/coolify/server.js`
- Verified referenced Schedule CSS/JS files exist.
- Verified key Schedule API seed files exist.
