# Signal Schedule

**Current Version:** v1.6.0 — Coolify API Skeleton

Signal Schedule is the scheduling and staffing foundation inside Signal Labs. The app remains static/browser-safe while a tool-owned Coolify API skeleton is introduced for future backend work.

## Current State

- Active app source: static HTML/CSS/JS
- Active frontend data source: `/schedule/data/*.json` through the static JSON adapter
- Active frontend behavior: read-only planning/prototype behavior
- New backend shape: Coolify API skeleton under `/schedule/api/coolify/`
- No live CRUD
- No authentication
- No Postgres connection
- No production database writes
- No credentials included

## v1.6.0 Coolify API Skeleton

This release defines the future API shape without switching the active frontend adapter.

```text
GET /health
GET /employees
```

The local skeleton also accepts:

```text
GET /api/health
GET /api/employees
```

See:

- `COOLIFY-API-SKELETON.md`
- `schedule/api/coolify/README.md`
- `schedule/api/contracts/employees.read.schema.json`

## Active Read Path

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

## Future Read Path

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

The selected future backend path is:

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

**v1.7.0 — Postgres Connection + Employee Read Endpoint**

The next release should connect the Coolify API skeleton to a Postgres read source while preserving the existing response contract and adapter boundaries.
