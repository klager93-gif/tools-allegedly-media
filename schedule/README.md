# Signal Schedule

**Current Version:** v1.7.1 — Coolify Dockerfile Deployment Fix

Signal Schedule is the scheduling and staffing foundation inside Signal Labs. The browser app remains static/browser-safe while the tool-owned Coolify API gains a predictable Dockerfile deployment path and optional read-only Postgres employee path.

## Current State

- Active app source: static HTML/CSS/JS
- Active frontend data source: `/schedule/data/*.json` through the static JSON adapter
- Active frontend behavior: read-only planning/prototype behavior
- Backend service path: `/schedule/api/coolify/`
- Optional backend data source: Postgres through `DATABASE_URL`
- Postgres employee reads are opt-in through `USE_POSTGRES_EMPLOYEES=true`
- No live CRUD
- No authentication
- No production credentials committed
- No production database writes

## v1.7.1 Coolify Dockerfile Deployment Fix

This release adds an explicit Dockerfile deployment path for the Coolify API after the Nixpacks deployment path proved slow or unreliable during initial setup.

See:

- `COOLIFY-DOCKERFILE-DEPLOYMENT.md`
- `schedule/api/coolify/Dockerfile`
- `schedule/api/coolify/.dockerignore`
- `RELEASE-v1.7.1.md`

## v1.7.0 Postgres Employee Read Endpoint

This release adds a read-only Postgres connection helper and employee read SQL while preserving the same API response wrapper:

```text
GET /health
GET /employees
GET /api/health
GET /api/employees
```

See:

- `POSTGRES-EMPLOYEE-READ-ENDPOINT.md`
- `schedule/api/coolify/db/postgres.js`
- `schedule/api/coolify/sql/001_employee_read_schema.sql`
- `schedule/api/coolify/.env.example`
- `schedule/api/contracts/employees.read.schema.json`

## Active Frontend Read Path

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

## Optional Backend Read Path

```text
UI
  ↓
Employee Service
  ↓
Employee Repository
  ↓
API Employee Adapter
  ↓
Coolify API
  ↓
Postgres
```

## Backend Direction

The selected backend path is:

```text
GitHub
  ↓
Coolify
  ↓
Schedule API service
  ↓
Postgres
```

Cloudflare Workers and D1 remain historical/alternate adapter references only. They are not the active implementation path.

## Required Architecture Boundary

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

The UI and scheduling logic must talk to services and repositories only. Backend-specific code belongs inside adapters.

## Rule 24

Backend portability remains required. UI and business logic must not depend directly on Postgres, MySQL, D1, Workers, PHP, Coolify, or any single backend implementation.

## Rule 25

Schedule-specific infrastructure belongs inside `/schedule/` unless it is intentionally shared by multiple tools.

## Next Planned Release

**v1.8.0 — Employee CRUD Foundation**

The next release should design and add controlled create/edit/delete boundaries only after the read path and Postgres configuration are reviewed.
