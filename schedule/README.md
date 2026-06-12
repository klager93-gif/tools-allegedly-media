## Signal Schedule v1.3.3 — Coolify Backend Setup Guide

Adds Coolify backend setup documentation after confirming the live deployment path is GitHub to Coolify. Recommends a future Coolify-hosted API service with Postgres while preserving D1/MySQL as possible adapters under Rule 24. No app behavior, credentials, CRUD, authentication, root infrastructure folders, or dashboard preview panels were added.

## v1.3.3 — Coolify Backend Setup Guide

Signal Schedule now documents the actual live deployment path as GitHub to Coolify. Cloudflare D1 is paused as the default backend assumption and remains only a possible future adapter. The active app still uses the static JSON adapter.

See `COOLIFY-BACKEND-PIVOT.md`.

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
