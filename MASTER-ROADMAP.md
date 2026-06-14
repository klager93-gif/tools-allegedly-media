<!-- Signal Schedule v2.30.0 Alpha Integration & Stability Audit included in latest full-replace package. -->

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

## v2.24.0 — Shift Trades UI

- Adds Shift Trades UI for employee trade requests, proposed swap review, approval workflow status, and assignment engine connection points.
- Updates trade preview data, read-only API contract/endpoint, service/repository/adapter cache versions, and navigation.
- Adds Postgres migration `030_shift_trades_ui_schema.sql`.
- Production trade writes remain disabled.

## Current Position

- v2.23.0 complete: OT Volunteer Board Foundation.
- Next likely release: v2.24.0 — Shift Trade UI / workflow connection.

# Signal Schedule Roadmap

## Current

Schedule v2.22.0 — Assignment Engine UI Contrast Hotfix

- Assignment Engine page readability has been restored on the dark Schedule layout.
- Assignment records, source types, history events, and foundation rules now use dark cards with readable text.
- No database migration required.

## Next

Schedule v2.22.0 — Leave Banks Foundation

- Define vacation, sick, personal, comp, holiday, and training balance buckets.
- Prepare request approvals to deduct from configured banks.
- Keep the first release read-only/preview until deduction rules are validated.

## Recently Completed

- v2.21.0 Assignment Engine Integration
- v2.20.0 Daily Schedule Board Foundation
- v2.19.0 Coverage Spots Foundation


## v2.25.0 — Mandation Engine Foundation

Completed first major alpha milestone foundation for mandation rules, rotation lists, policy caps, shortage-window eligibility, and override audit preview. Next: seniority engine, assignment generator, conflict detection, and qualification expiration.

## v2.28.0 — Conflict Detection Foundation

Adds Conflict Detection Foundation for generated schedules and assignment drafts. Includes double-assignment, under-minimum, over-maximum, leave overlap, missing qualification, rest-rule, and manual override conflict previews; role-based employee/supervisor/admin visibility panels; read-only API contract/endpoint; and Postgres migration 034.

