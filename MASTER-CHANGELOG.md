## Signal Schedule v1.3.0 — D1 Database Foundation

D1 foundation added for agencies, employees, and audit logs. Active app remains JSON-backed.

## Signal Schedule v1.3.0 — D1 Database Foundation

- Removed root-level `/functions/` from the release package.
- Moved Schedule API mock planning files into `/schedule/api/mock-functions/`.
- Added Rule 25: Tools own their infrastructure.
- Confirmed no D1, credentials, CRUD, authentication, or live writes were added.

# Master Changelog

## Signal Schedule v1.0.0 — Cloudflare Data Layer Foundation

Adds browser-safe multi-agency JSON data files and data service functions. This starts the v1.x Cloudflare-native data path while preserving backend portability through Rule 24.


## Signal Schedule v1.1.0 — Repository / Adapter Layer

Static JSON data access now routes through portable service/repository/adapter boundaries.

## Signal Schedule v1.3.0 — D1 Database Foundation

Adds the planned Cloudflare Worker / Pages Function API shape while keeping the active app static and backend-portable. No D1, credentials, CRUD, authentication, or live writes added.
