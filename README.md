## Signal Schedule v4.0.0 — Beta Foundation & Publishing

Schedule 4.0.0 starts the beta series with publishing, immutable schedule snapshots, post/seat foundations, availability/preferences/restrictions foundations, and migration 040. This release modifies `/schedule/` and root documentation only.

## Signal Schedule v3.1.0 — Desktop Application UI System

Converts Schedule to a desktop-first application UI across all Schedule pages. No database migration required.


## Signal Schedule v3.0.0 — Weekly Schedule View

Adds weekly schedule view foundation and full v3.0.0 package validation.

<!-- Signal Schedule v2.30.0 Alpha Integration & Stability Audit included in latest full-replace package. -->

## v2.29.0 — Qualifications & Certification Engine

Adds Qualifications & Certification Engine for credential definitions, employee credentials, license numbers, certificate numbers, issuing authorities, expiration warnings, role qualification requirements, notes, role-based employee/supervisor/admin panels, read-only API endpoint, API contract, and Postgres migration 035. License numbers can be not required, optional, or required per qualification type.

Database migration required: `schedule/api/coolify/sql/035_qualifications_certifications_schema.sql`.

## Signal Schedule v2.26.0 — Seniority Engine Foundation

Adds agency-configurable seniority lists for overall, classification, department, rank, and shift ordering. Includes vacation pick, shift bid, OT award, and mandation scenario previews, tie breakers, list freezes, employee-visible holds, supervisor/admin override notes, audit trail, read-only API endpoint, and Postgres migration 032.

Database migration required: `schedule/api/coolify/sql/032_seniority_engine_schema.sql`.

## Signal Schedule v2.24.1 — Full-Replace Cleanup & Drift Audit

Normalizes Schedule navigation/footer drift and cleans the full-replace package. No database migration required.

## v2.24.0 — Shift Trades UI

- Adds Shift Trades UI for employee trade requests, proposed swap review, approval workflow status, and assignment engine connection points.
- Updates trade preview data, read-only API contract/endpoint, service/repository/adapter cache versions, and navigation.
- Adds Postgres migration `030_shift_trades_ui_schema.sql`.
- Production trade writes remain disabled.

# Signal Labs Tools

## Current Schedule Release

Signal Schedule v2.23.0 — OT Volunteer Board Foundation. Database migration 029 required.

## Current Schedule Release

Signal Schedule v2.23.0 — OT Volunteer Board Foundation. Database migration 029 required.

# Signal Schedule v2.22.0 — Assignment Engine UI Contrast Hotfix

Current Schedule release fixes Assignment Engine readability on the dark Schedule layout. The assignment page remains the v2.21 Assignment Engine foundation, but cards, records, badges, history events, and rules now use readable dark-surface styling.

## Database Migration Required

No. v2.22.0 is a UI hotfix only. If v2.21.0 migration 027 has already been run, no psql action is needed.

## Current Foundation

Signal Schedule currently includes employees, agencies, requests, coverage board, coverage spots, daily board, notifications, roles/permissions, approvals, and assignment engine preview foundations.

## Next Planned Release

v2.23.0 — OT Volunteer Board Foundation.


## v2.25.0 — Mandation Engine Foundation

Adds policy-driven mandate rotation, shortage-window eligibility, employee and supervisor/admin mandate views, agency-set mandate hour caps, max consecutive hour rules, and override audit preview.


## Signal Schedule v2.27.0 — Assignment Generator Foundation

Adds Assignment Generator Foundation and role-based supervisor/admin panels; includes migration 033.

## v2.28.0 — Conflict Detection Foundation

Adds Conflict Detection Foundation for generated schedules and assignment drafts. Includes double-assignment, under-minimum, over-maximum, leave overlap, missing qualification, rest-rule, and manual override conflict previews; role-based employee/supervisor/admin visibility panels; read-only API contract/endpoint; and Postgres migration 034.

## Signal Schedule v3.8.0 — Drag-and-Drop + Draft Engine

- Draft schedule changes before publication.
- Preview conflicts and coverage impact.
- Track staged moves, undo/reset direction, and publish checklist.
- Prepare for forecast horizon and schedule publishing workflows.
