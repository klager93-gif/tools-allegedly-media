# Signal Schedule Coolify API

**Current Version:** v1.7.0 — Postgres Connection + Employee Read Endpoint

This folder contains the tool-owned Coolify API service for Signal Schedule.

## Current Scope

- `GET /health`
- `GET /api/health`
- `GET /employees`
- `GET /api/employees`
- Optional read-only Postgres employee source
- JSON seed fallback when Postgres is not enabled

## Not Included

- CRUD
- Authentication
- Production credentials
- Database writes
- Scheduling engine logic

## Local Test

```bash
npm install
npm start
```

## Environment

Copy `.env.example` into your Coolify environment settings. Do not commit real credentials.

```text
DATABASE_URL=postgres://user:password@host:5432/database
USE_POSTGRES_EMPLOYEES=false
```

`USE_POSTGRES_EMPLOYEES=false` keeps the API on JSON seed reads.

Set `USE_POSTGRES_EMPLOYEES=true` only after the Postgres schema and seed are ready.

## SQL

```text
sql/001_employee_read_schema.sql
sql/002_employee_seed_read_only.sql
```

## Rule 24

The frontend must not directly depend on Postgres. Postgres access belongs inside this API/adapter boundary.
