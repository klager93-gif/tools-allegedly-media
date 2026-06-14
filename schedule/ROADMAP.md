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

# Signal Schedule Roadmap

## Current

Schedule v2.23.0 — OT Volunteer Board Foundation

- Posted overtime opportunities.
- Volunteer/withdraw preview model.
- Eligibility indicators and fatigue/seniority context.
- Award queue foundation.
- Open shift and assignment engine connection points.

## Next

Schedule v2.24.0 — Shift Trade UI / workflow connection

- Improve employee trade request preview.
- Connect trade approval state to assignment engine history.
- Prepare trade-related coverage impact displays.

## Near-Term

- v2.24.0 Shift Trade UI / workflow connection
- v2.25.0 Mandation Engine Foundation
- v2.26.0 Notification/approval integration pass
- v2.30.0 Usable alpha milestone


## v2.25.0 — Mandation Engine Foundation

Completed first major alpha milestone foundation for mandation rules, rotation lists, policy caps, shortage-window eligibility, and override audit preview. Next: seniority engine, assignment generator, conflict detection, and qualification expiration.
