# Schedule History UI — v5.1.0

This release adds the first browser UI on top of the v4.4.0 snapshot database foundation.

## Pages

- `builder.html`
  - Adds Save snapshot.
  - Builds a snapshot payload from the editable grid.
  - Posts to `/api/saved-schedules`.

- `history.html`
  - Lists snapshot rows from `/api/saved-schedules`.
  - Shows status, agency, date range, and updated timestamp.
  - Provides an inspector with payload and validation summary details.
  - Can hand a selected draft back to the builder using local browser storage.

## Requirements

The API save action requires:

- `DATA_MODE=postgres`
- `DATABASE_URL`
- `SCHEDULE_WRITES_ENABLED=true`
- `ADMIN_API_KEY`
- Migration 044 already applied

## Database

No v4.5 migration is included. The page uses `schedule_saved_schedules`, created in v4.4.0 migration 044.
