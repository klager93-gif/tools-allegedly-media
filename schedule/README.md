# Signal Schedule v4.7.0 Notes

Use `/schedule/builder.html` for the playable schedule grid, `/schedule/availability.html` for availability/preferences/restrictions, `/schedule/employee/` for employee portal preview, and `/schedule/publishing.html` for publishing preview.

## Signal Schedule v4.7.0 — Publish Schedule Foundation + Copy Helpers

Adds the first protected database-backed save/load foundation for schedule drafts and published schedule payloads. This is the persistence step needed before the builder, planning, assignment generation, publication, audit, and employee visibility workflows can become truly connected.

Database migration required: `schedule/api/coolify/sql/044_saved_schedule_crud_foundation_schema.sql`.

Protected write environment:

```text
DATA_MODE=postgres
DATABASE_URL=postgres://...
ADMIN_API_KEY=...
SCHEDULE_WRITES_ENABLED=true
```

See `SAVED-SCHEDULES-FOUNDATION.md` for route and payload notes.

## v4.7.0 Publishing Foundation

- Protected publish endpoint: `POST /api/saved-schedules/:id/publish`.
- Schedule History UI includes Publish and copy buttons for reusable fields.
- No new migration required; uses migration 044.
