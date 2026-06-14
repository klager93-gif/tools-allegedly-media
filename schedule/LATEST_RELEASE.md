# Signal Schedule Latest Release

## v4.6.0 — Publish Schedule Foundation + Copy Helpers

Signal Schedule v4.6.0 adds the first protected publish-state action on top of the v4.4.0 saved schedule database foundation and the v4.5.0 save/load UI.

Highlights:
- Adds protected `POST /api/saved-schedules/:id/publish`.
- Adds Publish action to the Saved Schedules UI.
- Marks saved schedules as `published` and stamps `published_at`.
- Adds copy buttons for saved schedule IDs, agency IDs, endpoints, and validation JSON.
- Keeps migration 044 as the database foundation.

Database note:
- No new migration is required for v4.6.0. It uses the v4.4.0 `schedule_saved_schedules` table from migration 044.
