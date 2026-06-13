## v2.2.1 — Request Hours & Admin Override Foundation

- Added request hour calculation planning for leave and future VOT/open shift workflows.
- Added full-day vs partial-day request mode.
- Added start/end time and calculated-hours preview.
- Added request type minimum increment settings.
- Added admin/scheduler override planning for exact time entries outside configured increments.
- Added future SQL planning for request type settings and leave request hour fields.

# Public Changelog

## v2.1.3 — Employee Identity Cleanup

- Added employee identity architecture rule.
- Standardized hidden system ID vs admin-entered agency employee ID.
- Added optional badge number planning separate from employee ID.
- Added future users, roles, and user_roles table planning.
- Documented username-or-email login strategy.
- Added future SQL planning file for employee identity and authentication tables.


## 2026-06-12 — Schedule v2.1.1

- Cleaned full-root deployment package and preserved Schedule index/calendar routing.


## Schedule v2.1.0 — Calendar Foundation

Schedule now has a calendar-style preview page for viewing coverage, short-staffing placeholders, and event placeholders by day.

## v2.1.2 — Admin Navigation Foundation

- Added Schedule-specific admin navigation.
- Added placeholder pages for Employees, Assignments, Minimum Staffing, Leave Requests, Open Shifts, Reports, and Settings.
- Preserved existing Schedule overview and Calendar Foundation pages.
- Documented admin-first, role-filter-later interface strategy.
## Schedule v2.2.0 — Leave Requests Foundation

- Added preview structure for future Schedule leave request workflows.

## v2.3.0 — Open Shifts / VOT Foundation

- Added Open Shifts / VOT Foundation preview page.
- Added open shift and VOT request preview data.
- Added admin-controlled request reason seed options.
- Added OpenShift adapter, repository, and service boundaries.
- Added read-only Open Shifts API contract and Coolify route planning.
- Added future SQL planning for open shifts, VOT requests, and request reason options.
