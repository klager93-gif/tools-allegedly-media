## Signal Schedule v2.21.0 — Assignment Engine Integration

- Added Assignment Engine Integration preview tying date, agency, shift, role, numbered coverage spot, employee, source, status, and coverage impact into one read model.
- Added assignment source labels for pattern, overtime, trade, override, leave, and training.
- Added assignment history preview so later boards can explain why a spot changed or opened.
- Added `assignment-engine-preview.json`, adapter, repository, service, contract, and read-only Coolify API endpoint.
- Added migration `027_assignment_engine_integration_schema.sql` for assignment records and assignment history.

## Signal Schedule v2.20.0 — Daily Schedule Board Foundation

- Added a read-only Daily Schedule Board preview showing staffing by date, agency, shift, role, and numbered coverage spot.
- Database migration required: `026_daily_schedule_board_foundation_schema.sql`.

## Schedule v2.17.1 — Asset Drift & Load Cleanup

- Maintenance cleanup for Schedule asset loading, cache version drift, and duplicate component script references.
- No database migration required; Schedule database remains at 023.

## Schedule v2.17.0 — Release File Cleanup & Latest Release

- Removed persistent Schedule `RELEASE-v*.md` files.
- Added `schedule/LATEST_RELEASE.md`.
- No SQL migration required; current database target remains `022 roles_permissions`.

## Schedule v2.17.0 — Roles & Permissions Engine

Adds the Roles & Permissions Engine foundation for agency-controlled view, edit, approve, delete, override, and export access.

## Schedule v2.17.0 — Supervisors & Organizational Hierarchy

- Added supervisor hierarchy preview.
- Added hybrid supervisor scope by employee, group, position, department, division, and location.
- Added SQL migration 021 supervisor hierarchy.


## Schedule v2.14.0 — Employee Timeline & Audit Trail

- Added Employee Timeline & Audit Trail foundation.
- Added admin/supervisor employee-specific event history preview.
- Added actor, before/after, reason, category, and visibility preview.
- Added timeline adapter, repository, service, API contract, data, and SQL migration 020.

## Schedule v2.14.0 — Employee Profile & Self-Service Settings

- Added Employee Profile & Self-Service Settings foundation.
- Added admin-controlled editable field, contact, notification, and profile change request preview.
- Added SQL migration 019.
- Cleaned Schedule overview live-feature modules.

## Schedule v2.12.0 — Calendar Views + Schedule Footer

- Adds user-facing week and day calendar views.
- Adds Schedule-specific footer across /schedule/ pages.
- Adds Calendar View foundation files and fixes overview version drift.

## Schedule v2.11.0 — Calendar Shortcode Admin Controls

- Added Calendar Shortcode Admin Controls.
- Added shortcode data, adapter, repository, service, API contract, and SQL foundation.
- Added migration tracking foundation and schema_migrations inserts for Schedule feature migrations.
- Updated Schedule navigation across pages.


## Schedule v2.10.0 — Benefit Ledger

- Added Benefit Ledger foundation.
- Added leave bank previews, request impacts, adjustments, and audit trail preview.
- Added calendar shortcode foundation for compact week/month labels.

## Schedule v2.8.0 — Training & Certifications

## Schedule v2.10.0 — Qualification & Eligibility Engine

Adds optional shift credential requirements and eligibility checks powered by Training & Certifications. Coverage, Open OT, Trades, and Assignments can now preview whether an employee is eligible, warned, or blocked for a qualified role.


- Added Training & Certifications preview page.
- Added certification expiration, active, expired, in-training, and restricted status previews.
- Added role/credential requirement rule preview.
- Added training certification JSON data, adapter, repository, and service layers.
- Added API read contract and Postgres SQL foundation.
- Updated Schedule navigation across pages.


## Schedule v2.7.0 — Shift Trades & Swap Requests

- Added Shift Trades & Swap Requests foundation to Signal Schedule.
- Added trade preview page, data, adapter, repository, service, API contract, SQL schema, and navigation updates.

# Admin Changelog

## Schedule v2.6.0 — Seniority & Rotation Engine

- Added seniority, equalization, callback, mandation, skip reason, and audit preview foundations.
- Updated Schedule navigation.
- Added Standards v3.0 release handoff requirements.

## v2.2.1 — Request Hours & Admin Override Foundation

- Added request hour calculation planning for leave and future VOT/open shift workflows.
- Added full-day vs partial-day request mode.
- Added start/end time and calculated-hours preview.
- Added request type minimum increment settings.
- Added admin/scheduler override planning for exact time entries outside configured increments.
- Added future SQL planning for request type settings and leave request hour fields.

# Admin Changelog

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

- Added `schedule/schedule.html` as the first user-facing calendar preview page.
- Preserved `schedule/index.html` as the foundation/admin overview.
- Added read-only calendar data and service boundaries.
- Added calendar API planning for Coolify.

## v2.1.2 — Admin Navigation Foundation

- Added Schedule-specific admin navigation.
- Added placeholder pages for Employees, Assignments, Minimum Staffing, Leave Requests, Open Shifts, Reports, and Settings.
- Preserved existing Schedule overview and Calendar Foundation pages.
- Documented admin-first, role-filter-later interface strategy.
## Schedule v2.2.0 — Leave Requests Foundation

- Added admin-first Leave Requests preview page.
- Added request intake fields, review dashboard, status cards, and staffing impact placeholders.

## v2.3.0 — Open Shifts / VOT Foundation

- Added Open Shifts / VOT Foundation preview page.
- Added open shift and VOT request preview data.
- Added admin-controlled request reason seed options.
- Added OpenShift adapter, repository, and service boundaries.
- Added read-only Open Shifts API contract and Coolify route planning.
- Added future SQL planning for open shifts, VOT requests, and request reason options.
