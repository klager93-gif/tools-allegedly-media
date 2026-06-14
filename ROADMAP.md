
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

## v2.28.0 — Conflict Detection Foundation

Adds Conflict Detection Foundation for generated schedules and assignment drafts. Includes double-assignment, under-minimum, over-maximum, leave overlap, missing qualification, rest-rule, and manual override conflict previews; role-based employee/supervisor/admin visibility panels; read-only API contract/endpoint; and Postgres migration 034.



# Signal Schedule Roadmap

## Current Release

### v3.7.0 — Scheduling Workspace
- Central desktop scheduling workspace.
- Wide schedule grid with role/spot rows and week columns.
- Right inspector panel foundation for employees, shifts, open spots, and conflicts.
- Compact command toolbar foundation for today/previous/next/draft/publish flows.
- Component foundations for panels, toolbars, tables, and status tags.
- No database migration required.

## Near-Term Roadmap

### v3.8.0 — Drag-and-Drop + Draft Engine
- Drag employees between assignments, days, roles, or coverage spots.
- Draft mode separate from published schedule.
- Undo/reset draft support.
- Conflict preview before save.
- Draft → review → publish workflow.
- Audit trail for manual changes and supervisor/admin overrides.

### v3.9.0 — Schedule Planning / Forecast Horizon
- Generate or simulate schedules through a selected future end date.
- Scan pattern-generated schedules for conflicts, shortages, qualification gaps, leave/training overlaps, OT needs, and likely mandates.
- Preview recommendations before publishing.

### v4.0.0 — Reports & Dashboards
- Leave balances, OT hours, mandation history, seniority lists, certification expirations, coverage shortages.
- CSV, Excel, and PDF export targets.

### v4.1.0 — Seating / Post Assignment Planner
- Desk, console, post, station, unit, or workstation assignments.
- Qualification requirements by seat/post.
- Fair rotation tracking and fairness percentages.
- Employee-visible and admin-visible views.
- Dispatch-specific support such as Desk 1-6 plus Call Taker while remaining portable to other industries.

### v4.2.0 — Shift Bidding System
- Shift bids, vacation picks, bid rounds, seniority ordering, tie breakers, and agency rules.

### v4.3.0 — Certification Expiration Notifications
- 30/60/90 day warnings.
- Employee, supervisor, and admin notifications.
- Credential renewal workflows.

### v4.4.0 — Import / Export
- CSV and Excel import/export.
- Migration helpers for legacy scheduling systems.

### v4.5.0 — Employee Portal
- Employee schedule view, leave balances, requests, trade acceptance, OT volunteer actions, notifications, and mandate/seniority visibility according to privacy rules.

### v4.6.0 — Agency Rule Engine
- Central configurable rule engine for rest, max hours, mandation, short days, holiday rules, union rules, staffing, seating assignments, and overrides.

### v4.7.0 — Availability & Preferences
- Employee availability, do-not-call flags, overtime preferences, preferred seats/posts, temporary restrictions, and shift preferences.

### v4.8.0 — Relief Factor / Staffing Calculator
- Required staffing calculations based on coverage hours, leave usage, training, sick averages, vacancies, and workload.

### v4.9.0 — Vacancy / Hiring Tracker
- Authorized strength, filled positions, vacancies, onboarding pipeline, and staffing risk.

### v5.0.0 — Beta Milestone
- Integrated production beta target with scheduling, approvals, coverage, reporting, rules, employee portal, and admin controls working as one system.

## Long-Term Vision

### v3.x
Make it beautiful and operational.

### v4.x
Make it useful for real supervisors and large agencies.

### v5.x
Make it powerful enough for production beta.

### v6.x
Make it dangerous to Telestaff.

## Signal Schedule v3.8.0 — Drag-and-Drop + Draft Engine

- Draft schedule changes before publication.
- Preview conflicts and coverage impact.
- Track staged moves, undo/reset direction, and publish checklist.
- Prepare for forecast horizon and schedule publishing workflows.
