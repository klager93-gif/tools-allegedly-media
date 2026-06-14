## v2.24.1 — Full-Replace Cleanup & Drift Audit

- Normalizes Schedule navigation/footer drift.
- Keeps `shift-trades.html` as the canonical trade UI.
- Leaves `trades.html` only as a redirect compatibility shim.
- Excludes `.git`, `__MACOSX`, and AppleDouble `._*` files from release packaging.
- No database migration required.

## v2.24.0 — Shift Trades UI

- Adds Shift Trades UI for employee trade requests, proposed swap review, approval workflow status, and assignment engine connection points.
- Updates trade preview data, read-only API contract/endpoint, service/repository/adapter cache versions, and navigation.
- Adds Postgres migration `030_shift_trades_ui_schema.sql`.
- Production trade writes remain disabled.

# Signal Schedule v2.23.0 — OT Volunteer Board Foundation

Signal Schedule v2.23.0 adds an admin-first OT Volunteer Board foundation for posted overtime opportunities, employee volunteer interest, eligibility preview, award queue review, and open shift connection points.

## Database Migration Required

Yes. Run:

```text
schedule/api/coolify/sql/029_ot_volunteer_board_schema.sql
```

Expected newest migration row:

```text
029 | ot_volunteer_board_foundation
```

## Current Foundation

Signal Schedule currently includes employees, agencies, requests, coverage board, coverage spots, daily board, assignment engine, leave banks, notifications, roles/permissions, approvals, and OT volunteer board preview foundations.

## Next Planned Release

v2.24.0 — Shift Trade UI / workflow connection.
