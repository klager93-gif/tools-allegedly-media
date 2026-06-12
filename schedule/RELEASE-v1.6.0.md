# Signal Schedule v1.6.0 — Coolify API Skeleton

Signal Schedule v1.6.0 defines the Coolify-hosted API skeleton before Postgres connection, CRUD, authentication, or database writes are introduced.

## Package Type

Tool release.

## Added

- `schedule/api/coolify/package.json`
- `schedule/api/coolify/server.js`
- `schedule/api/coolify/README.md`
- `schedule/adapters/ApiEmployeeAdapter.js`
- `schedule/COOLIFY-API-SKELETON.md`
- `schedule/RELEASE-v1.6.0.md`

## Modified

- `schedule/index.html`
- `schedule/script.js`
- `schedule/style.css`
- `schedule/README.md`
- `schedule/ROADMAP.md`
- `schedule/CHANGELOG.md`
- `schedule/HOWTO.md`
- `schedule/api/contracts/employees.read.schema.json`
- root/build manifests and checksums

## Architecture

```text
Frontend
  ↓
EmployeeService
  ↓
EmployeeRepository
  ↓
JsonEmployeeAdapter currently
  ↓
Static JSON
```

Future path:

```text
Frontend
  ↓
EmployeeService
  ↓
EmployeeRepository
  ↓
ApiEmployeeAdapter
  ↓
Coolify API
  ↓
Postgres later
```

## Not Included

- No CRUD
- No authentication
- No production API deployment
- No Postgres connection
- No credentials
- No database writes
- No scheduling engine logic
