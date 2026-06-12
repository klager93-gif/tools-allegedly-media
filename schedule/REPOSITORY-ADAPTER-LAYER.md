# Signal Schedule Repository / Adapter Layer

Version: v1.1.0

## Purpose

Signal Schedule must remain backend-portable. The app should not be written directly around Cloudflare D1, Workers, PHP, MySQL, Postgres, static JSON, or any other single backend.

## Current adapter

```text
Static JSON Adapter
```

The v1.1.0 app still reads browser-safe sample data from:

```text
/schedule/data/agencies.json
/schedule/data/employees.json
```

but those reads now move through:

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
D1Adapter
MySQLAdapter
PostgresAdapter
MockAdapter
ImportFileAdapter
```

The UI should not need to know which adapter is active.

## Rule 24 application

No UI or business logic should directly depend on D1, Workers, MySQL, PHP, or static JSON. Persistence must remain behind repositories, services, and adapters.
