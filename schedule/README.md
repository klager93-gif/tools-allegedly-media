# Signal Schedule

**Current Version:** v1.4.0 — Backend Adapter Selection

Signal Schedule is the scheduling and staffing foundation inside Signal Labs. The app remains static/browser-safe while the backend architecture is selected and documented before any live Employee API, CRUD, authentication, or database writes are added.

## Current State

- Active app source: static HTML/CSS/JS
- Active data source: `/schedule/data/*.json` through the static JSON adapter
- Active behavior: read-only planning/prototype behavior
- No live CRUD
- No authentication
- No production database writes
- No credentials included

## v1.4.0 Decision

The selected default future backend path is:

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

**v1.5.0 — Employee Read API Foundation**

The next release should begin the read-only Employee API contract while preserving the existing static JSON adapter and browser-safe fallback.
