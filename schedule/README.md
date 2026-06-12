# Signal Schedule

**Current Version:** v1.3.3 — Coolify Backend Setup Guide

Signal Schedule is the scheduling and staffing foundation inside Signal Labs. The current app remains static/browser-safe and uses JSON-backed data while backend architecture is planned.

## Current State

- Active app source: static HTML/CSS/JS
- Active data source: `/schedule/data/*.json`
- Active behavior: read-only planning/prototype behavior
- No live CRUD
- No authentication
- No production database writes
- No credentials included

## Backend Direction

The actual deployment path is GitHub to Coolify. Cloudflare D1 is paused as the default backend assumption and remains a possible future adapter only.

Preferred future path:

```text
GitHub
  ↓
Coolify
  ↓
API service
  ↓
Postgres
```

Required architecture boundary:

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

Supported adapter targets:

- Static JSON
- Postgres
- MySQL
- Cloudflare D1

## Rule 24

Backend portability remains required. UI and business logic should not depend directly on D1, Workers, MySQL, PHP, Postgres, or any single backend implementation.

## Rule 25

Schedule-specific infrastructure belongs inside `/schedule/` unless it is intentionally shared by multiple tools.

## Next Planned Release

**v1.4.0 — Backend Adapter Selection**

This should document the selected adapter path before Employee API work begins.
