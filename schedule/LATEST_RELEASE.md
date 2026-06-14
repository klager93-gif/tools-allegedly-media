# Signal Schedule Latest Release

## v5.1.0 — Staffing Engine

Signal Schedule v5.1.0 introduces the Staffing Engine foundation and task-based navigation cleanup.

Includes:
- Staffing Engine hub at `schedule/staffing-engine.html`
- Navigation cleanup: Me, Scheduling, Staffing, Personnel, Requests, Overtime, Administration, Reports, System
- Coverage/vacancy preview
- Assignment candidate preview
- OT, callback, and mandation queue preview
- Explainability/Why foundation
- Fairness metric foundation
- Schedule Integrity Checker foundation
- Migration `047_staffing_engine_schema.sql`

Required SQL migration:
`schedule/api/coolify/sql/047_staffing_engine_schema.sql`
