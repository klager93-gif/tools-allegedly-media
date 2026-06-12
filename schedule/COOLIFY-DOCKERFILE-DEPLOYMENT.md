# Signal Schedule — Coolify Dockerfile Deployment

## Current Release

v1.7.1 — Coolify Dockerfile Deployment Fix

## Why This Exists

The v1.7.0 API was deployable with Nixpacks, but first builds may take a long time or stall while Nixpacks assembles its runtime image. For Signal Schedule, a simple Dockerfile is clearer and more predictable.

## Coolify Settings

Inside:

```text
Signal Labs
└── production
    └── signal-schedule-api
```

Use these application settings:

```text
Build Pack: Dockerfile
Base Directory: /schedule/api/coolify
Dockerfile Location: /schedule/api/coolify/Dockerfile
Port: 3000
```

If Coolify asks for the port separately, set it to:

```text
3000
```

## Required Environment Variables

Set these as runtime variables:

```text
NODE_ENV=production
PORT=3000
DATA_MODE=postgres
DATABASE_URL=<internal Coolify Postgres URL>
```

`DATA_MODE=postgres` is the preferred flag. `USE_POSTGRES_EMPLOYEES=true` is still supported for compatibility.

## Database Setup

Before deploying the API, Postgres should already have:

```text
schedule/api/coolify/sql/001_employee_read_schema.sql
schedule/api/coolify/sql/002_employee_seed_read_only.sql
```

applied successfully.

## Test Endpoints

After deployment, test:

```text
/health
/employees
/api/health
/api/employees
```

Expected behavior:

- `/health` returns service status and Postgres reachability.
- `/employees` returns the seeded employee list from Postgres when `DATA_MODE=postgres` and `DATABASE_URL` are set.

## Troubleshooting

If Coolify shows Bad Gateway or the app exits:

1. Confirm the app port is `3000`.
2. Confirm the server logs include `Signal Schedule API listening on 0.0.0.0:3000`.
3. Confirm `DATABASE_URL` uses the internal Postgres URL.
4. Confirm Postgres is running.
5. Confirm employee seed rows exist with `SELECT COUNT(*) FROM employees;`.
