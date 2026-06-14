# Signal Schedule Changelog

## v4.6.0 — Publish Schedule Foundation + Copy Helpers
- Added protected publish route: `POST /api/saved-schedules/:id/publish`.
- Added Saved Schedules UI Publish action with protected `ADMIN_API_KEY` prompt.
- Added published status handling using `status = published` and `published_at = now()`.
- Added copy buttons for schedule IDs, agency IDs, API endpoints, publish endpoints, and validation JSON.
- Added `PUBLISHING-FOUNDATION.md`.
- No database migration required; v4.6.0 uses migration 044 from v4.4.0.

## v4.4.0 — Saved Schedule CRUD Foundation
- Added protected Postgres-backed saved schedule CRUD foundation with `/api/saved-schedules` routes.
- Added migration 044 for `schedule_saved_schedules`.
- Added saved schedule write contract.
