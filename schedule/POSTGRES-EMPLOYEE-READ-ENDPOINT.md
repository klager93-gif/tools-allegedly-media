# Signal Schedule v1.7.0 — Postgres Employee Read Endpoint

## Purpose

v1.7.0 adds the first read-only Postgres connection path for the Coolify API while preserving the existing service/repository/adapter architecture.

This release does not make Postgres mandatory for the static frontend. The browser app still uses the JSON adapter unless the API adapter is intentionally enabled later.

## Active Direction

```text
Schedule Frontend
  ↓
EmployeeService
  ↓
EmployeeRepository
  ↓
ApiEmployeeAdapter
  ↓
Coolify API
  ↓
Postgres
```

## Added Backend Pieces

```text
schedule/api/coolify/.env.example
schedule/api/coolify/db/postgres.js
schedule/api/coolify/sql/001_employee_read_schema.sql
schedule/api/coolify/sql/002_employee_seed_read_only.sql
```

## Routes

```text
GET /health
GET /api/health
GET /employees
GET /api/employees
```

## Environment Variables

```text
DATABASE_URL=postgres://user:password@host:5432/database
USE_POSTGRES_EMPLOYEES=false
POSTGRES_SSL=false
```

`USE_POSTGRES_EMPLOYEES` remains false by default so the API can still return the JSON seed data while infrastructure is being configured.

## Read-Only Rule

v1.7.0 adds only employee read support. It does not add:

- create employee
- edit employee
- delete employee
- authentication
- roles/permissions
- schedule writes
- overtime writes
- request writes

## Rule 24 Compliance

The frontend does not talk to Postgres. Postgres access is isolated inside the Coolify API adapter layer.
