# Signal Schedule v1.3.0 — D1 Database Foundation

v1.3.0 introduces the first Cloudflare D1 database foundation while keeping the active application static and read-only.

## Added

- `/schedule/d1/schema.sql`
- `/schedule/d1/seed.sql`
- `/schedule/d1/README.md`
- Planned `SignalScheduleD1Adapter` contract in `script.js`
- D1-aware API planning notes

## First tables

```text
agencies
employees
audit_logs
```

## Not added

```text
No live D1 binding
No credentials
No CRUD
No authentication
No live writes
No dashboard preview panels
```

## Adapter boundary

```text
UI
↓
Service Layer
↓
Repository Layer
↓
Adapter
↓
JSON today / D1 later
```

D1 is the first planned backend adapter, not a permanent backend lock-in.
