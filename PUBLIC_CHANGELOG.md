## Paycheck Calculator v1.0.4 — Regression Repair

- Restored missing Paycheck tool-specific CSS and JavaScript files.
- Repaired broken Paycheck styling and calculator controls.
- Schedule versioning was not changed.

## Signal Schedule v1.3.3 — Coolify Backend Setup Guide

- Updated backend planning to reflect the actual GitHub to Coolify deployment path.
- No public app behavior changed.

## Signal Schedule v1.3.1 — D1 Setup Guide

- Added setup guidance for preparing Cloudflare D1 before live database work begins.
- No user-facing application behavior changed.

## Signal Schedule v1.3.0 — D1 Database Foundation

Adds first D1 schema and seed planning files while keeping the live app static/read-only.

## Signal Schedule v1.3.0 — D1 Database Foundation

- Removed root-level `/functions/` from the release package.
- Moved Schedule API mock planning files into `/schedule/api/mock-functions/`.
- Added Rule 25: Tools own their infrastructure.
- Confirmed no D1, credentials, CRUD, authentication, or live writes were added.

# Public Changelog

## Signal Schedule v1.0.0 — Cloudflare Data Layer Foundation

Adds a static multi-agency data layer so the schedule prototype can load and switch between pretend agencies such as Corrections, Fire, Dispatch, and Police.

No live database, login system, CRUD, or server-side code is included yet.


## Signal Schedule v1.1.0

Adds repository and adapter boundaries around the static multi-agency JSON data layer.

## Signal Schedule v1.3.0 — D1 Database Foundation

Adds the planned Cloudflare Worker / Pages Function API shape while keeping the active app static and backend-portable. No D1, credentials, CRUD, authentication, or live writes added.
