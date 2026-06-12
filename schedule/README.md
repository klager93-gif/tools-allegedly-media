## v1.2.1 — Worker Folder Repair

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
