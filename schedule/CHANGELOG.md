## v2.2.1 — Request Hours & Admin Override Foundation

- Added request hour calculation planning for leave and future VOT/open shift workflows.
- Added full-day vs partial-day request mode.
- Added start/end time and calculated-hours preview.
- Added request type minimum increment settings.
- Added admin/scheduler override planning for exact time entries outside configured increments.
- Added future SQL planning for request type settings and leave request hour fields.

# Signal Schedule Changelog

## v2.1.3 — Employee Identity Cleanup

- Added employee identity architecture rule.
- Standardized hidden system ID vs admin-entered agency employee ID.
- Added optional badge number planning separate from employee ID.
- Added future users, roles, and user_roles table planning.
- Documented username-or-email login strategy.
- Added future SQL planning file for employee identity and authentication tables.


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

## v2.1.2 — Admin Navigation Foundation

- Added Schedule-specific admin navigation.
- Added placeholder pages for Employees, Assignments, Minimum Staffing, Leave Requests, Open Shifts, Reports, and Settings.
- Preserved existing Schedule overview and Calendar Foundation pages.
- Documented admin-first, role-filter-later interface strategy.
## v2.2.0 — Leave Requests Foundation

- Replaced the Leave Requests placeholder with a preview-only admin workflow page.
- Added leave request type and preview request seed data.
- Added Leave Request adapter, repository, and service boundaries.
- Added read-only API contract and Coolify route planning.
- Added future Postgres leave request schema planning.
- Kept Schedule admin navigation linked to the new Leave Requests page.

## v2.3.0 — Open Shifts / VOT Foundation

- Added Open Shifts / VOT Foundation preview page.
- Added open shift and VOT request preview data.
- Added admin-controlled request reason seed options.
- Added OpenShift adapter, repository, and service boundaries.
- Added read-only Open Shifts API contract and Coolify route planning.
- Added future SQL planning for open shifts, VOT requests, and request reason options.
