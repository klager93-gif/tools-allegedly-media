# Signal Labs Master Changelog

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


## 2026-06-12 — Schedule v2.1.0 Calendar Foundation

- Added user-facing Schedule calendar preview page.
- Added calendar preview and event placeholder data.
- Added calendar adapter, repository, and service boundaries.
- Added calendar API contract and Coolify read route planning.
- Added future Postgres calendar schema planning.
- Preserved Schedule index as the foundation/admin overview.

## 2026-06-12 — Schedule v2.0.0 Minimum Staffing Foundation

- Added minimum staffing foundation.

## v2.1.2 — Admin Navigation Foundation

- Added Schedule-specific admin navigation.
- Added placeholder pages for Employees, Assignments, Minimum Staffing, Leave Requests, Open Shifts, Reports, and Settings.
- Preserved existing Schedule overview and Calendar Foundation pages.
- Documented admin-first, role-filter-later interface strategy.
