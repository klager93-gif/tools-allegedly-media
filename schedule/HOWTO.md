# Signal Schedule HOWTO

## Current Version

**v1.6.0 — Coolify API Skeleton**

This release defines the future Coolify API service skeleton while keeping the active browser app on static JSON.

## How to Use the Current App

1. Open `/schedule/index.html`.
2. Use the current browser-based prototype normally.
3. Employee data is still read from static JSON through the Employee service/repository/adapter boundary.
4. Do not expect create/edit/delete, authentication, production API calls, Postgres reads, or database writes yet.

## How to Review the API Skeleton

Review:

```text
schedule/COOLIFY-API-SKELETON.md
schedule/api/coolify/README.md
schedule/api/coolify/server.js
schedule/adapters/ApiEmployeeAdapter.js
```

The skeleton defines:

```text
GET /health
GET /employees
```

It also accepts:

```text
GET /api/health
GET /api/employees
```

## Optional Local API Skeleton Test

```bash
cd schedule/api/coolify
npm start
```

Then open:

```text
http://localhost:3000/health
http://localhost:3000/employees
```

This is a local skeleton only. It does not connect Postgres.

## Architecture Boundary

The app should continue to follow:

```text
UI
  ↓
Services
  ↓
Repositories
  ↓
Adapters
  ↓
Backend
```

Do not connect UI or scheduling logic directly to Postgres, MySQL, D1, Workers, PHP, Coolify, or a raw JSON file.

## Backend Direction

Preferred future direction:

```text
GitHub
  ↓
Coolify
  ↓
Schedule API service
  ↓
Postgres
```

v1.6.0 does not install or connect Postgres.

## Do Not Add Yet

- CRUD
- Authentication
- Production credentials
- Database writes
- Postgres connection
- Scheduling engine logic
- Payroll/benefits/medical/discipline records

## Next Planned Release

**v1.7.0 — Postgres Connection + Employee Read Endpoint**

The next release should connect the skeleton to Postgres for read-only employee data while keeping writes and CRUD out of scope.
