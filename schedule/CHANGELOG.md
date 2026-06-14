# Signal Schedule Changelog

## v4.5.0 — Saved Schedule Save/Load UI
- Added Saved Schedules page for reading `/api/saved-schedules`.
- Added Schedule Builder `Save draft` action with protected `ADMIN_API_KEY` prompt.
- Added saved draft inspector showing date range, status, assignment count, and validation summary.
- Added open-in-builder handoff using local browser storage.
- Updated Schedule cache versions to `4.5.0`.
- No database migration required; v4.5 uses migration 044 from v4.4.0.

## v4.4.0 — Saved Schedule CRUD Foundation
- Added protected Postgres-backed saved schedule CRUD foundation with `/api/saved-schedules` routes.
- Added migration 044 for `schedule_saved_schedules`.
- Added saved schedule write contract.
