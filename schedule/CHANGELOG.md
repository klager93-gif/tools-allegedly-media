# Signal Schedule Changelog

## 2026-06-12 — Schedule v2.1.1 Full Root Deployment Cleanup

- Rebuilt the release as a clean full-root replacement package.
- Preserved `schedule/index.html` and `schedule/schedule.html` together to prevent directory index/403 deployment issues.
- Added a Calendar Preview link from the Schedule foundation overview.
- Removed macOS resource forks, Git internals, and deployment junk from the ZIP.


## v2.1.0 — Calendar Foundation

- Added separate user-facing calendar page at `schedule/schedule.html`.
- Added month-style June 2026 preview grid.
- Added selectable day detail panel for coverage and event placeholders.
- Added calendar preview JSON data and event placeholder data.
- Added Calendar JSON adapter, repository, and service boundaries.
- Added read-only calendar API contract.
- Added read-only Coolify calendar route planning.
- Added future Postgres calendar schema planning.
- Preserved `schedule/index.html` as the foundation/admin overview page.

## v2.0.0 — Minimum Staffing Foundation

- Added minimum staffing templates and preview data.
- Added minimum staffing adapter, repository, service, API contract, and Coolify route planning.
