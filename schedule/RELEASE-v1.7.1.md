# Signal Schedule v1.7.1 — Coolify Dockerfile Deployment Fix

## Purpose

v1.7.1 is a deployment fix for the Coolify API introduced in v1.7.0. The first Coolify deploy path used Nixpacks, which may take too long or stall while building the runtime image. This release adds a tool-owned Dockerfile so Coolify can deploy the Schedule API using an explicit Dockerfile build.

## Added

- `schedule/api/coolify/Dockerfile`
- `schedule/api/coolify/.dockerignore`

## Updated

- API server now listens on `0.0.0.0` for container compatibility.
- API package version updated to v1.7.1.
- Postgres mode can now be enabled by either `DATA_MODE=postgres` or `USE_POSTGRES_EMPLOYEES=true`.
- Coolify setup guidance now recommends Dockerfile deployment instead of Nixpacks.

## Not Added

- No CRUD
- No authentication
- No new database tables
- No database writes
- No scheduling engine logic

## Coolify Deployment Settings

Use:

```text
Build Pack: Dockerfile
Base Directory: /schedule/api/coolify
Dockerfile Location: /schedule/api/coolify/Dockerfile
Port: 3000
```

Environment variables:

```text
NODE_ENV=production
PORT=3000
DATA_MODE=postgres
DATABASE_URL=<Coolify internal Postgres URL>
```

Then test:

```text
/health
/employees
```
