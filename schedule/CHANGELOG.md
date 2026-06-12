## v1.0.0 — Cloudflare Data Layer Foundation

- Added static multi-agency JSON data layer.
- Added `/schedule/data/agencies.json`.
- Added `/schedule/data/employees.json`.
- Added data service functions for loading agencies and employees.
- Added agency selector support for pretend agencies.
- Added `agencyId` to employee normalization.
- Preserved browser-only/static behavior.
- Added `DATA-LAYER.md` and `RELEASE-v1.0.0.md`.
- No live D1, Workers, credentials, CRUD, or authentication added.


## v1.1.0 — Repository / Adapter Layer

- Added static JSON adapter wrapper for agency and employee data.
- Added agency and employee repository/service boundaries.
- Preserved browser-only behavior while preparing for future D1/Worker adapters.
- Added repository/adapter documentation.
- No database, credentials, CRUD, authentication, or new preview panels added.
