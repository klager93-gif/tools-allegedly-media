# Signal Schedule

**Current Version:** v1.5.0 — Employee Read API Foundation

Signal Schedule is the scheduling and staffing foundation inside Signal Labs. The app remains static/browser-safe while the Employee Read Foundation is added through service, repository, and adapter boundaries before CRUD, authentication, or database writes.

## Current State

- Active app source: static HTML/CSS/JS
- Active data source: `/schedule/data/*.json` through the static JSON adapter
- Active behavior: read-only planning/prototype behavior
- No live CRUD
- No authentication
- No production database writes
- No credentials included

## v1.5.0 Employee Read Foundation

The active read path is:

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

The selected default future backend path remains:

```text
GitHub
  ↓
Coolify
  ↓
Schedule API service
  ↓
Postgres
```

This does **not** connect a backend yet. It establishes the adapter target so future work can begin cleanly.

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

## Adapter Priority

1. Static JSON adapter — current browser-safe implementation
2. Postgres adapter — selected future default for Coolify
3. MySQL adapter — future alternate backend
4. Cloudflare D1 adapter — future alternate backend

## Rule 24

Backend portability remains required. UI and business logic must not depend directly on D1, Workers, MySQL, PHP, Postgres, Coolify, or any single backend implementation.

## Rule 25

Schedule-specific infrastructure belongs inside `/schedule/` unless it is intentionally shared by multiple tools.

## Next Planned Release

**v1.6.0 — Coolify API Skeleton**

The next release should prepare the Coolify-hosted API service skeleton while preserving the existing Employee service/repository boundary and static JSON fallback.
