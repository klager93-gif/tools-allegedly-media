## Signal Schedule v2.24.1 — Full-Replace Cleanup & Drift Audit

Normalizes Schedule navigation/footer drift and cleans the full-replace package. No database migration required.

## v2.24.0 — Shift Trades UI

- Adds Shift Trades UI for employee trade requests, proposed swap review, approval workflow status, and assignment engine connection points.
- Updates trade preview data, read-only API contract/endpoint, service/repository/adapter cache versions, and navigation.
- Adds Postgres migration `030_shift_trades_ui_schema.sql`.
- Production trade writes remain disabled.

# Signal Labs Tools

## Current Schedule Release

Signal Schedule v2.23.0 — OT Volunteer Board Foundation. Database migration 029 required.

## Current Schedule Release

Signal Schedule v2.23.0 — OT Volunteer Board Foundation. Database migration 029 required.

# Signal Schedule v2.22.0 — Assignment Engine UI Contrast Hotfix

Current Schedule release fixes Assignment Engine readability on the dark Schedule layout. The assignment page remains the v2.21 Assignment Engine foundation, but cards, records, badges, history events, and rules now use readable dark-surface styling.

## Database Migration Required

No. v2.22.0 is a UI hotfix only. If v2.21.0 migration 027 has already been run, no psql action is needed.

## Current Foundation

Signal Schedule currently includes employees, agencies, requests, coverage board, coverage spots, daily board, notifications, roles/permissions, approvals, and assignment engine preview foundations.

## Next Planned Release

v2.23.0 — OT Volunteer Board Foundation.


## v2.25.0 — Mandation Engine Foundation

Adds policy-driven mandate rotation, shortage-window eligibility, employee and supervisor/admin mandate views, agency-set mandate hour caps, max consecutive hour rules, and override audit preview.
