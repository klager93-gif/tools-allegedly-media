# Signal Schedule Admin Changelog

## v4.6.1 — Employee Portal Navigation Hotfix

- Fixed employee portal subfolder navigation so admin links resolve back to `/schedule/` instead of `/schedule/employee/`.
- Added Saved Schedules to the Scheduling/Calendar navigation group.
- Fixed employee portal active navigation detection for nested employee pages.
- Cleaned up View As group labels so raw internal values like `shiftGroup` no longer display to users.
- Added hotfix validation for nested Schedule navigation targets.

No SQL migration required.

## v4.6.1
- New admin-facing Saved Schedules page: `schedule/saved-schedules.html`.
- Builder can save a protected draft schedule to Postgres when `SCHEDULE_WRITES_ENABLED=true`, `DATA_MODE=postgres`, `DATABASE_URL` is set, and the correct `ADMIN_API_KEY` is entered.
- Saved draft rows can be inspected and handed back to the builder for preview loading.
- Delete/rename/publish controls are intentionally deferred until a proper admin auth/session flow exists.
- No new SQL migration is required after 044.
