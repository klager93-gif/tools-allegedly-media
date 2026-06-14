## v3.1.0 Complete — Desktop Application UI System

The 3.x UI direction is now desktop-first. Future 3.x releases should build editing, drag/drop, publishing, and reporting inside the shared app shell instead of the earlier centered website layout.


## v3.0.0 — Weekly Schedule View

Adds the first weekly schedule grid foundation with seven-day staffing visibility, open spots, source badges, conflict indicators, role-based panels, read-only API endpoint, API contract, and Postgres migration 036.


## v2.29.0 — Qualifications & Certification Engine

Adds Qualifications & Certification Engine for credential definitions, employee credentials, license numbers, certificate numbers, issuing authorities, expiration warnings, role qualification requirements, notes, role-based employee/supervisor/admin panels, read-only API endpoint, API contract, and Postgres migration 035. License numbers can be not required, optional, or required per qualification type.

Database migration required: `schedule/api/coolify/sql/035_qualifications_certifications_schema.sql`.

## Current — v2.26.0 Seniority Engine Foundation

- Overall, classification, department, rank, and shift seniority list model.
- Scenario preview for vacation picks, shift bids, OT awards, and mandation ordering.
- Agency-configurable tie breakers and employee/admin visibility split.
- Manual override and audit foundation.

## Next — v2.27.0 Assignment Generator

- Generate assignment previews from patterns, coverage requirements, leave, training, and open coverage.
- Keep production writes disabled until conflict detection and approval workflow are connected.

## v2.24.1 — Full-Replace Cleanup & Drift Audit

- Normalizes Schedule navigation/footer drift.
- Keeps `shift-trades.html` as the canonical trade UI.
- Leaves `trades.html` only as a redirect compatibility shim.
- Excludes `.git`, `__MACOSX`, and AppleDouble `._*` files from release packaging.
- No database migration required.

## v2.24.0 — Shift Trades UI

- Adds Shift Trades UI for employee trade requests, proposed swap review, approval workflow status, and assignment engine connection points.
- Updates trade preview data, read-only API contract/endpoint, service/repository/adapter cache versions, and navigation.
- Adds Postgres migration `030_shift_trades_ui_schema.sql`.
- Production trade writes remain disabled.

# Signal Schedule Roadmap

## Current

Schedule v2.23.0 — OT Volunteer Board Foundation

- Posted overtime opportunities.
- Volunteer/withdraw preview model.
- Eligibility indicators and fatigue/seniority context.
- Award queue foundation.
- Open shift and assignment engine connection points.

## Next

Schedule v2.24.0 — Shift Trade UI / workflow connection

- Improve employee trade request preview.
- Connect trade approval state to assignment engine history.
- Prepare trade-related coverage impact displays.

## Near-Term

- v2.24.0 Shift Trade UI / workflow connection
- v2.25.0 Mandation Engine Foundation
- v2.26.0 Notification/approval integration pass
- v3.0.0 Usable alpha milestone


## v2.25.0 — Mandation Engine Foundation

Completed first major alpha milestone foundation for mandation rules, rotation lists, policy caps, shortage-window eligibility, and override audit preview. Next: seniority engine, assignment generator, conflict detection, and qualification expiration.

## v2.28.0 — Conflict Detection Foundation

Adds Conflict Detection Foundation for generated schedules and assignment drafts. Includes double-assignment, under-minimum, over-maximum, leave overlap, missing qualification, rest-rule, and manual override conflict previews; role-based employee/supervisor/admin visibility panels; read-only API contract/endpoint; and Postgres migration 034.


## v3.2.0 Completed — Theme Engine Foundation

Schedule now has a desktop theme foundation and compact flyout navigation. Next UX work should continue dense workspace refinement before drag-and-drop planning.
