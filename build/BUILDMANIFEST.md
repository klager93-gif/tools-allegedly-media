# Build Manifest — Signal Schedule v5.1.0 Full Replacement

Built from v4.8.1 full replacement.

## Release

Signal Schedule v5.1.0 — Request & Approval Engine

## Key changes

- Added central request engine hub at `schedule/requests.html`.
- Added request engine preview data, CSS, JS, and API contract.
- Added read-only `/api/request-approval-engine` preview route.
- Added migration `schedule/api/coolify/sql/046_request_approval_engine_schema.sql`.
- Updated navigation to route Requests to the central request engine.
- Updated docs/changelogs/roadmap/version/cache references.

## Validation

- JavaScript syntax checks passed.
- HTML asset reference check passed.
- Package junk check passed.
- SQL migration 046 included in existing Coolify SQL folder.
