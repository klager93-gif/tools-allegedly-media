# Signal Schedule v1.3.1 — D1 Setup Guide

This guide explains how to prepare Cloudflare D1 for Signal Schedule before Employee CRUD work begins.

v1.3.1 does not activate live database reads or writes. The active app still uses the static JSON adapter. D1 remains planned until the Worker/API adapter is intentionally enabled in a later release.

## Current files

```text
/schedule/d1/schema.sql
/schedule/d1/seed.sql
/schedule/d1/README.md
```

## Cloudflare setup outline

1. Open the Cloudflare dashboard.
2. Go to **Storage & databases**.
3. Open **D1 SQL Database**.
4. Create a new database for Signal Schedule.
5. Apply `/schedule/d1/schema.sql`.
6. Apply `/schedule/d1/seed.sql`.
7. Add the D1 binding to the future Worker/Pages Function configuration.
8. Test with a read-only health endpoint before enabling any CRUD.

## Recommended database name

```text
signal_schedule_dev
```

Use a development database first. Production should not be connected until read-only endpoints and audit logging have been validated.

## Planned binding name

```text
SIGNAL_SCHEDULE_DB
```

Future Worker code should reference the binding by name instead of hard-coding database identifiers.

## First tables

```text
agencies
employees
audit_logs
```

These remain the first database tables because every future schedule feature needs an agency, an employee record, and audit accountability.

## Safety rules before CRUD

```text
- Keep the JSON adapter active until the D1 adapter is tested.
- Keep D1 reads read-only first.
- Do not add credentials to the repository.
- Do not place Schedule-specific functions in the root folder.
- Do not let UI code depend directly on D1.
- All database access must pass through service/repository/adapter layers.
```

## v1.3.1 status

```text
Active app data source: JSON adapter
D1 status: planned/setup guide only
Worker status: mock/planned only
CRUD status: not active
Authentication status: not active
Live writes: not active
```

## Next release

```text
Signal Schedule v1.4.0 — Employee CRUD Foundation
```

CRUD should not begin until the D1 setup is understood and the adapter boundary is preserved.
