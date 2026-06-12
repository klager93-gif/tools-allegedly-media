## v1.3.0 — D1 Database Foundation

- Added `/schedule/d1/schema.sql`.
- Added `/schedule/d1/seed.sql`.
- Added planned D1 adapter contract.
- Kept JSON adapter active.
- Added no live D1 binding, credentials, CRUD, authentication, or live writes.

# Signal Schedule Changelog

## v1.3.0 — D1 Database Foundation

- Removed the repository-root `/functions/` folder from the release package.
- Moved Schedule-owned API mock files into `/schedule/api/mock-functions/`.
- Added Rule 25: Tools own their infrastructure.
- Preserved static JSON adapter behavior.
- Preserved backend portability boundaries.
- Added no D1, Worker deployment, credentials, CRUD, auth, live writes, or dashboard preview panels.

# Signal Schedule Changelog

## v1.3.0 — D1 Database Foundation

- Added Worker API foundation documentation.
- Added mock Cloudflare Pages Function endpoint files for planned health, agencies, and employees APIs.
- Added API adapter contract notes while keeping JSON as the active adapter.
- Preserved backend portability under Rule 24.
- Fixed duplicate employee add submit call.
- No D1, credentials, CRUD, authentication, or live writes added.

## v1.1.0 — Repository / Adapter Layer

- Added repository/service/adapter boundaries around static JSON data.
- Preserved static app behavior.
