## Paycheck Calculator v1.0.4 — Regression Repair

- Restored missing Paycheck tool-specific CSS and JavaScript files.
- Repaired broken Paycheck styling and calculator controls.
- Schedule versioning was not changed.

## Signal Schedule v1.3.3 — Coolify Backend Setup Guide

- Paused Cloudflare D1-first assumptions.
- Reframed future backend work around Coolify-hosted services and databases.
- Preserved backend portability and tool-owned infrastructure rules.

## Signal Schedule v1.3.0 — D1 Database Foundation

Added schedule/d1/schema.sql, seed.sql, D1 planning docs, and planned D1 adapter contract. No live D1 binding or credentials.

## Signal Schedule v1.3.0 — D1 Database Foundation

- Removed root-level `/functions/` from the release package.
- Moved Schedule API mock planning files into `/schedule/api/mock-functions/`.
- Added Rule 25: Tools own their infrastructure.
- Confirmed no D1, credentials, CRUD, authentication, or live writes were added.

# Admin Changelog

## Signal Schedule v1.0.0 — Cloudflare Data Layer Foundation

- Adds `/schedule/data/agencies.json`.
- Adds `/schedule/data/employees.json`.
- Adds static data service functions in Schedule.
- Adds multi-agency selector behavior.
- Keeps app browser-only and static.
- No D1, Workers, credentials, CRUD, or authentication added.
- No new dashboard preview panels or render registry entries added.


## Signal Schedule v1.1.0

Implements the first backend-portability layer: JSON adapter, repositories, services, and data gateway. No live backend code added.

## Signal Schedule v1.3.0 — D1 Database Foundation

Adds the planned Cloudflare Worker / Pages Function API shape while keeping the active app static and backend-portable. No D1, credentials, CRUD, authentication, or live writes added.
