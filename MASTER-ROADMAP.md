## v2.24.0 — Shift Trades UI

- Adds Shift Trades UI for employee trade requests, proposed swap review, approval workflow status, and assignment engine connection points.
- Updates trade preview data, read-only API contract/endpoint, service/repository/adapter cache versions, and navigation.
- Adds Postgres migration `030_shift_trades_ui_schema.sql`.
- Production trade writes remain disabled.

## Current Position

- v2.23.0 complete: OT Volunteer Board Foundation.
- Next likely release: v2.24.0 — Shift Trade UI / workflow connection.

# Signal Schedule Roadmap

## Current

Schedule v2.22.0 — Assignment Engine UI Contrast Hotfix

- Assignment Engine page readability has been restored on the dark Schedule layout.
- Assignment records, source types, history events, and foundation rules now use dark cards with readable text.
- No database migration required.

## Next

Schedule v2.22.0 — Leave Banks Foundation

- Define vacation, sick, personal, comp, holiday, and training balance buckets.
- Prepare request approvals to deduct from configured banks.
- Keep the first release read-only/preview until deduction rules are validated.

## Recently Completed

- v2.21.0 Assignment Engine Integration
- v2.20.0 Daily Schedule Board Foundation
- v2.19.0 Coverage Spots Foundation


## v2.25.0 — Mandation Engine Foundation

Completed first major alpha milestone foundation for mandation rules, rotation lists, policy caps, shortage-window eligibility, and override audit preview. Next: seniority engine, assignment generator, conflict detection, and qualification expiration.
