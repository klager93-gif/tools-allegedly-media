# Signal Schedule Coolify API

Current release: **v4.4.0 — Saved Schedule CRUD + True Release Rebuild**

## Read Routes

- `GET /health`
- `GET /api/health`
- `GET /employees`
- `GET /api/employees`
- `GET /saved-schedules`
- `GET /api/saved-schedules`
- `GET /saved-schedules/:id`
- `GET /api/saved-schedules/:id`
- Existing read-only preview routes remain available for assignments, staffing, calendar, requests, boards, planning, publishing, availability, and related foundations.

## Protected Write Routes

Employee writes require `EMPLOYEE_WRITES_ENABLED=true`. Saved schedule writes require `SCHEDULE_WRITES_ENABLED=true`. Both require `DATA_MODE=postgres`, `DATABASE_URL`, and `ADMIN_API_KEY`.

Saved schedule routes:

- `POST /api/saved-schedules`
- `PUT /api/saved-schedules/:id`
- `PATCH /api/saved-schedules/:id`
- `DELETE /api/saved-schedules/:id`

`DELETE` is a soft delete that changes status to `deleted`.

## v4.4.0 Notes

This release adds the persistence layer for saving draft/published schedule payloads. It does not yet make public schedule writes available, and it does not replace future authentication/role checks.
