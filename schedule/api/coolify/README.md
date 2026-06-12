# Signal Schedule Coolify API Skeleton

**Version:** v1.6.0

This folder contains the tool-owned Coolify API skeleton for Signal Schedule.

## Active Status

- Skeleton only
- Read-only routes only
- No Postgres connection
- No credentials
- No CRUD
- No authentication
- No writes

## Routes

```text
GET /health
GET /employees
```

The server also accepts `/api/health` and `/api/employees` so deployment routing can be adjusted later without changing the response contract.

## Local Test

```bash
cd schedule/api/coolify
npm start
```

Then open:

```text
http://localhost:3000/health
http://localhost:3000/employees
```

## Coolify Direction

The preferred future backend path remains:

```text
GitHub
  ↓
Coolify
  ↓
Schedule API service
  ↓
Postgres
```

Postgres begins later after the API skeleton and response contract are stable.
