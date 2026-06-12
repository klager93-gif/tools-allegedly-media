# Signal Schedule v1.3.3 — Coolify Backend Setup Guide

This guide documents the corrected backend path for Signal Schedule after confirming the live deployment is:

```text
GitHub → Coolify → live site
```

Cloudflare remains useful for DNS, proxying, SSL, and security, but Cloudflare Pages/D1 is no longer the assumed default backend path.

## Current status

The active Schedule app remains static and JSON-backed.

```text
/schedule/data/agencies.json
/schedule/data/employees.json
```

No live database connection, API writes, credentials, authentication, or CRUD behavior are active in this release.

## Recommended backend direction

For Coolify, the recommended backend stack is:

```text
GitHub
↓
Coolify
↓
API service
↓
Postgres database
```

Postgres is recommended over MySQL for the default Signal Schedule path because it is strong for future commercial use, modern API services, reporting, JSON fields, constraints, migrations, and audit-heavy application design.

MySQL remains acceptable as a future adapter under Rule 24.

## Rule 24 reminder

Backend portability is required.

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

The backend may be:

```text
JSON today
Postgres later
MySQL later
D1 later
```

The UI and business logic should not directly depend on any one backend.

## Coolify setup checklist

Do not perform these steps until we intentionally begin the backend implementation release.

### 1. Confirm current Coolify app

Find the existing Signal Labs application in Coolify and confirm:

```text
Repository
Branch
Build command
Publish/output directory
Custom domain
Environment variables section
```

### 2. Add database service later

When ready, add a Postgres service in Coolify.

Suggested naming:

```text
Service name: signal-schedule-postgres
Database name: signal_schedule
Database user: signal_schedule_app
```

Do not commit real credentials to GitHub.

### 3. Use environment variables

Future backend services should read database credentials from environment variables, not hardcoded files.

Planned names:

```text
DATABASE_URL
APP_ENV
APP_NAME
```

If separate values are needed:

```text
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
```

### 4. First backend service later

The first real backend service should expose read-only health/data endpoints before CRUD.

Planned first endpoints:

```text
/api/health
/api/agencies
/api/employees
```

### 5. First tables later

Initial database tables should remain small:

```text
agencies
employees
audit_logs
```

No requests, bids, awards, events, benefits, or scheduling writes should be added until the database foundation is stable.

## D1 status

A Cloudflare D1 database may have been created during exploration. That is okay.

D1 is now considered:

```text
optional future adapter / test database
```

It is not the default backend path while the live deployment is GitHub to Coolify.

## What v1.3.3 does not do

```text
No app behavior changes
No database connection
No API writes
No CRUD
No authentication
No credentials
No root infrastructure folders
No dashboard preview panels
```

## Recommended next release

```text
v1.4.0 — Coolify Backend Adapter Plan
```

That release should define the exact API service shape and adapter interface before connecting a live Postgres database.
