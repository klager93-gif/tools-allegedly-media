# Signal Schedule Latest Release

Current: v2.23.0 — OT Volunteer Board Foundation

Database migration required: yes. Run `schedule/api/coolify/sql/029_ot_volunteer_board_schema.sql`.

## v2.23.0 — OT Volunteer Board Foundation

- Adds OT Volunteer Board Foundation for posted overtime opportunities, volunteer/withdraw preview, eligibility status, award queue, and open shift connection points.
- Adds `ot-volunteer-board.html`, preview data, read-only service/repository/adapter boundaries, API contract, and endpoint.
- Adds Postgres migration `029_ot_volunteer_board_schema.sql`.
- Production volunteer writes and award actions remain disabled.
