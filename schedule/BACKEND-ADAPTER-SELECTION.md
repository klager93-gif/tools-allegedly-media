# Signal Schedule v1.4.0 — Backend Adapter Selection

## Decision

The selected default future backend path for Signal Schedule is:

```text
GitHub
  ↓
Coolify
  ↓
Schedule API service
  ↓
Postgres
```

This is the preferred direction for future backend implementation. It does not remove backend portability and it does not activate live persistence in v1.4.0.

## Current active adapter

```text
Static JSON Adapter
```

The current app continues to read from:

```text
/schedule/data/agencies.json
/schedule/data/employees.json
```

This keeps the browser app safe while API contracts are planned.

## Adapter priority

1. Static JSON adapter — current active adapter
2. Postgres adapter — preferred future production adapter
3. MySQL adapter — supported alternate production adapter
4. Cloudflare D1 adapter — supported alternate edge adapter

## Required boundary

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

## Future repository contract direction

The Employee API work should begin with read-only contracts, such as:

```text
EmployeeRepository.listEmployees(context)
EmployeeRepository.getEmployeeById(employeeId, context)
EmployeeRepository.listEmployeesByAgency(agencyId, context)
```

The static JSON adapter and future Postgres adapter should satisfy the same repository contract.

## Forbidden patterns

- UI code directly querying Postgres, MySQL, D1, or Workers.
- Business rules living only in API route handlers.
- SQL embedded in unrelated UI or scheduling-engine files.
- Backend-specific assumptions inside employee, rule, coverage, or schedule logic.

## Required patterns

- UI asks services for data.
- Services express business meaning.
- Repositories define data-access contracts.
- Adapters handle backend-specific implementation.
- API routes call services/repositories instead of owning business rules.

## v1.4.0 non-goals

- No CRUD.
- No authentication.
- No live database writes.
- No credentials.
- No production API deployment.
- No migration away from static JSON yet.
