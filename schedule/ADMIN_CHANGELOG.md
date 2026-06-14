# Signal Schedule Admin Changelog

## v4.6.0
- New admin-facing Saved Schedules page: `schedule/saved-schedules.html`.
- Builder can save a protected draft schedule to Postgres when `SCHEDULE_WRITES_ENABLED=true`, `DATA_MODE=postgres`, `DATABASE_URL` is set, and the correct `ADMIN_API_KEY` is entered.
- Saved draft rows can be inspected and handed back to the builder for preview loading.
- Delete/rename/publish controls are intentionally deferred until a proper admin auth/session flow exists.
- No new SQL migration is required after 044.
