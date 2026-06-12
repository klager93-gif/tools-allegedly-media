# Signal Schedule v1.5.0 — Employee Read API Foundation

Signal Schedule v1.5.0 adds the read-only Employee data path before CRUD, auth, or database writes.

## Active Path

```text
UI
  ↓
Employee Service
  ↓
Employee Repository
  ↓
Static JSON Adapter
  ↓
/schedule/data/employees.json
```

## Future Path

```text
UI
  ↓
Employee Service
  ↓
Employee Repository
  ↓
Coolify API Adapter
  ↓
Postgres
```

## What This Release Adds

- Read-only Employee API contract documentation.
- Employee service/repository/adapter boundary files.
- JSON employee adapter as the active browser-safe source.
- Employee read foundation preview in the Schedule UI.
- Contract file for future `/api/employees` response shape.

## What This Release Does Not Add

- No employee create/edit/delete.
- No authentication.
- No credentials.
- No live API deployment.
- No Postgres connection.
- No database writes.

## Backend Direction

Coolify-hosted API service with Postgres remains the preferred future backend path. Static JSON remains the active adapter until the API service is intentionally introduced.
