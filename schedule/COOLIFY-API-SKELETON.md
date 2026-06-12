# Signal Schedule v1.6.0 — Coolify API Skeleton

Signal Schedule v1.6.0 creates the backend shape for a future Coolify-hosted API without connecting Postgres or changing the active browser app data source.

## Active Decision

Coolify is the active backend deployment direction.

```text
GitHub
  ↓
Coolify
  ↓
Schedule API service
  ↓
Postgres later
```

Cloudflare Workers and D1 remain historical or possible alternate adapters under Rule 24, but they are not the current build path.

## What This Release Adds

```text
schedule/api/coolify/package.json
schedule/api/coolify/server.js
schedule/api/coolify/README.md
schedule/adapters/ApiEmployeeAdapter.js
```

## Routes Defined

```text
GET /health
GET /employees
```

The skeleton also accepts:

```text
GET /api/health
GET /api/employees
```

so routing can be adjusted in Coolify, reverse proxy, or future frontend config without changing the response contract.

## Response Wrapper

All API responses should follow:

```json
{
  "ok": true,
  "data": [],
  "meta": {
    "source": "coolify-api-skeleton",
    "version": "v1.6.0"
  },
  "errors": []
}
```

## Active Browser Adapter

The active Schedule frontend still uses:

```text
EmployeeService
  ↓
EmployeeRepository
  ↓
JsonEmployeeAdapter
  ↓
/schedule/data/employees.json
```

The API adapter exists as a future boundary, but it is not active by default.

## Not Included

- No Postgres connection
- No database tables or migrations
- No CRUD
- No authentication
- No production credentials
- No writes
- No live deployment requirement

## Why This Comes Before Postgres

The API route shape and response contract should stabilize before database work begins. This prevents frontend logic from depending directly on Postgres or any single backend implementation.
