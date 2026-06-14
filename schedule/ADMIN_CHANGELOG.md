# v4.7.0 — Schedule History & Snapshot Engine

- Renamed the user-facing legacy saved-schedule list concept to Schedule History.
- Replaced `legacy saved-schedule page` with `history.html` and updated navigation/dashboard links.
- Added the product principle: One Agency / One Living Schedule / Many Snapshots.
- Updated snapshot wording for restore, publish, copy, and inspector actions.
- Added Schedule History & Snapshot Engine documentation.
- No SQL migration required; existing migration 044 storage remains in use.

# Signal Schedule Admin Changelog

## v4.7.0 — Employee Portal Navigation Hotfix

- Fixed employee portal subfolder navigation so admin links resolve back to `/schedule/` instead of `/schedule/employee/`.
- Added Schedule History to the Scheduling/Calendar navigation group.
- Fixed employee portal active navigation detection for nested employee pages.
- Cleaned up View As group labels so raw internal values like `shiftGroup` no longer display to users.
- Added hotfix validation for nested Schedule navigation targets.

No SQL migration required.

## v4.7.0
- New admin-facing Schedule History page: `schedule/history.html`.
- Builder can save a protected draft schedule to Postgres when `SCHEDULE_WRITES_ENABLED=true`, `DATA_MODE=postgres`, `DATABASE_URL` is set, and the correct `ADMIN_API_KEY` is entered.
- Snapshot rows can be inspected and handed back to the builder for preview loading.
- Delete/rename/publish controls are intentionally deferred until a proper admin auth/session flow exists.
- No new SQL migration is required after 044.
