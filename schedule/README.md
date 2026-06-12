## v1.3.1 — D1 Setup Guide

Signal Schedule v1.3.1 adds Cloudflare D1 setup guidance. The active app still uses the static JSON adapter.

## v1.3.0 — D1 Database Foundation

Signal Schedule now includes the first planned Cloudflare D1 foundation: schema, seed data, audit-log table planning, and a D1 adapter contract. The active app still uses static JSON and remains browser-only.

## v1.3.0 — D1 Database Foundation

Signal Schedule keeps the future API plan, but Schedule-owned mock API files now live inside the Schedule tool instead of the repository root.

Active data source: `/schedule/data/*.json` through the JSON adapter.

Schedule-owned mock API planning files:

```text
/schedule/api/mock-functions/health.js
/schedule/api/mock-functions/agencies.js
/schedule/api/mock-functions/employees.js
```

Planned future API shape:

```text
GET /schedule/api/health
GET /schedule/api/agencies
GET /schedule/api/employees
```

No D1 database, credentials, CRUD, authentication, or live writes are active in this release.

See `WORKER-FOLDER-REPAIR.md`, `WORKER-API-FOUNDATION.md`, and `BACKEND-PORTABILITY.md`.
