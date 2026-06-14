# Signal Schedule Latest Release

## v4.5.0 — Saved Schedule Save/Load UI

Signal Schedule v4.5.0 connects the v4.4.0 saved schedule database foundation to the browser UI.

Highlights:
- Adds `saved-schedules.html` for listing and inspecting saved schedule drafts.
- Adds builder `Save draft` action that posts to `/api/saved-schedules` using the protected `ADMIN_API_KEY` flow.
- Adds local handoff from Saved Schedules back into the builder for preview/open behavior.
- Keeps destructive protected write actions out of the browser UI until a real admin auth/session flow exists.

Database note:
- No new migration is required for v4.5.0. It uses the v4.4.0 `schedule_saved_schedules` table from migration 044.
