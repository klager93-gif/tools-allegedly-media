## v2.26.0 — Seniority Engine Foundation

- Adds Seniority Engine Foundation with agency-configurable overall, classification, department, rank, and shift seniority lists.
- Adds scenario preview for vacation picks, shift bids, OT awards, and mandation ordering.
- Adds tie-breaker policy, frozen list behavior, employee-visible holds, supervisor/admin-only override notes, and audit preview.
- Adds read-only Seniority Engine API contract, service/repository/adapter, preview data, endpoint, and Postgres migration 032.

## Signal Schedule v2.24.1 — Full-Replace Cleanup & Drift Audit

Normalizes Schedule navigation/footer drift and cleans the full-replace package. No database migration required.

## v2.24.0 — Shift Trades UI

- Adds Shift Trades UI for employee trade requests, proposed swap review, approval workflow status, and assignment engine connection points.
- Updates trade preview data, read-only API contract/endpoint, service/repository/adapter cache versions, and navigation.
- Adds Postgres migration `030_shift_trades_ui_schema.sql`.
- Production trade writes remain disabled.

## v2.23.0 — OT Volunteer Board Foundation

- Adds OT Volunteer Board Foundation for posted overtime opportunities, volunteer/withdraw preview, eligibility status, award queue, and open shift connection points.
- Adds preview data, read-only service/repository/adapter boundaries, API contract, page, and endpoint.
- Adds Postgres migration 029_ot_volunteer_board_schema.sql.
- Production volunteer writes and award actions remain disabled.


## v2.22.0 — Leave Banks Foundation

- Adds Leave Banks Foundation for vacation, sick, personal, comp, holiday, and training balances.
- Adds preview data, read-only service/repository/adapter boundaries, API contract, page, and endpoint.
- Adds Postgres migration 028_leave_banks_foundation_schema.sql.
- Production balance writes remain disabled.

## Signal Schedule v2.21.1 — Assignment Engine UI Contrast Hotfix

- Fixed Assignment Engine card contrast so assignment records, source types, history events, and foundation rules are readable on the dark Schedule layout.
- Updated Assignment Engine cache-busting and visible version label to v2.21.1.
- No database migration required.

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

- Cleaned Schedule release documentation clutter and corrected visible version drift.

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

# Public Changelog

## Schedule v2.6.0 — Seniority & Rotation Engine

Signal Schedule now includes a read-only Seniority & Rotation preview for future overtime, callback, and mandation ordering.

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
