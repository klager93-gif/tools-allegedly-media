## Signal Schedule v4.0.0 — Beta Foundation & Publishing

Starts the Schedule 4.x beta series with a publishing workspace, read-only publication preview endpoint, migration 040, immutable published version/snapshot/event table foundations, post/seat foundations, and employee availability/preference/restriction foundations.

Database migration required: `schedule/api/coolify/sql/040_schedule_beta_publishing_foundation_schema.sql`.

# Signal Schedule Roadmap

## Current Release

### v4.0.0 — Scheduling Workspace
- Central desktop scheduling workspace.
- Wide schedule grid with role/spot rows and week columns.
- Right inspector panel foundation for employees, shifts, open spots, and conflicts.
- Compact command toolbar foundation for today/previous/next/draft/publish flows.
- Component foundations for panels, toolbars, tables, and status tags.
- No database migration required.

## Near-Term Roadmap

### v4.0.0 — Drag-and-Drop + Draft Engine
- Drag employees between assignments, days, roles, or coverage spots.
- Draft mode separate from published schedule.
- Undo/reset draft support.
- Conflict preview before save.
- Draft → review → publish workflow.
- Audit trail for manual changes and supervisor/admin overrides.

### v4.0.0 — Schedule Planning / Forecast Horizon
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


## v4.0.0 — Schedule File Organization & Release Cleanup

Organizes page-specific support assets into /schedule/pages while preserving public page URLs.
