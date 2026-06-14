# Schedule History Foundation — v5.1.0

Signal Schedule v5.1.0 adds the first protected database-backed save/load foundation for schedule drafts and published schedule payloads.

## What changed

- Added Postgres table `schedule_saved_schedules`.
- Added protected API routes for snapshots:
  - `GET /api/saved-schedules`
  - `GET /api/saved-schedules/:id`
  - `POST /api/saved-schedules`
  - `PUT/PATCH /api/saved-schedules/:id`
  - `DELETE /api/saved-schedules/:id` soft-deletes by setting status to `deleted`.
- Added `SCHEDULE_WRITES_ENABLED=true` gate for snapshot writes.
- Reuses `ADMIN_API_KEY` for protected write access.
- Keeps JSON seed previews as the default read-only mode until Postgres is enabled.

## Required environment for writes

```text
DATA_MODE=postgres
DATABASE_URL=postgres://...
ADMIN_API_KEY=...
SCHEDULE_WRITES_ENABLED=true
```

## Notes

This is not the final scheduling engine. It is the persistence layer needed so the builder/planning workflow can save real draft schedule payloads before later assignment generation, publication, audit, and employee visibility workflows are wired together.
