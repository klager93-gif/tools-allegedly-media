# Signal Schedule v1.4.0 — Backend Adapter Selection HOWTO

## What this release does

v1.4.0 selects the preferred future backend path for Signal Schedule:

```text
GitHub → Coolify → Schedule API service → Postgres
```

The release does not connect the live app to that backend yet. The current app remains static and reads browser-safe sample data from `/schedule/data/*.json`.

## How to use the current app

1. Open `/schedule/index.html`.
2. Review agency, employee, rule, coverage, request, and schedule-planning preview sections.
3. Treat the output as a planning sandbox only.
4. Do not enter real employee data, credentials, or production staffing records.

## How future backend work should be added

Use this boundary:

```text
UI
  ↓
Service Layer
  ↓
Repository Layer
  ↓
Adapter
  ↓
Backend
```

Rules:

- UI code should call services, not database-specific functions.
- Business logic should not live inside route handlers.
- SQL should not be scattered through UI files.
- Postgres-specific code belongs in a Postgres adapter.
- D1-specific code belongs in a D1 adapter.
- MySQL-specific code belongs in a MySQL adapter.
- Static JSON remains the local/browser fallback adapter.

## Next release

v1.5.0 should begin the Employee Read API foundation with no writes, no authentication, and no credentials.


## v1.5.0 Employee Read Foundation

Use **Load Multi-Agency Data** to read agency and employee records through the static JSON adapter. The app routes employee records through the Employee Service and Repository boundary before rendering them.

This release is read-only. Do not add live credentials, database writes, CRUD, or authentication to v1.5.0.
