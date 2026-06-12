# Signal Schedule Repository / Adapter Layer

Version: v1.4.0

## Purpose

Signal Schedule must remain backend-portable. The app should not be written directly around Cloudflare D1, Workers, PHP, MySQL, Postgres, static JSON, or any other single backend.

## Selected future default

```text
Coolify-hosted Schedule API service + Postgres
```

Postgres is the preferred future backend target, but it must remain behind adapter boundaries.

## Current adapter

```text
Static JSON Adapter
```

The current app still reads browser-safe sample data from:

```text
/schedule/data/agencies.json
/schedule/data/employees.json
```

Those reads move through:

```text
UI
↓
SignalScheduleDataService
↓
AgencyService / EmployeeService
↓
AgencyRepository / EmployeeRepository
↓
SignalScheduleJsonAdapter
↓
Static JSON files
```

## Future adapter examples

```text
PostgresAdapter
MySQLAdapter
D1Adapter
MockAdapter
ImportFileAdapter
```

The UI should not need to know which adapter is active.

## Rule 24 application

No UI or business logic should directly depend on D1, Workers, MySQL, PHP, Postgres, or static JSON. Persistence must remain behind repositories, services, and adapters.
