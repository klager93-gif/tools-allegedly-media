# Backend Portability — Rule 24

## Rule 24

Backend portability is required. No UI or business logic may depend directly on D1, Workers, MySQL, PHP, or any other backend-specific storage implementation.

All persistence must flow through services, repositories, and adapters.

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

## Initial adapter path

```text
EmployeeService
↓
EmployeeRepository
↓
JsonAdapter in v1.0
↓
D1Adapter later
```

## Future migration path

If Signal Schedule later needs MySQL, PostgreSQL, or another backend, the adapter changes. The UI and scheduling engines should not need to be rewritten.

## Forbidden pattern

```text
UI directly queries D1
UI directly calls backend-specific SQL
Business rules live inside Worker route handlers
SQL is scattered across unrelated files
```

## Required pattern

```text
UI asks service for data
Service applies business meaning
Repository owns data access contract
Adapter handles backend-specific implementation
```


## v1.1.0 implementation

The first backend boundary is now present in script.js: static JSON is wrapped by an adapter, repositories, and services. Future D1 or Worker code should implement the same repository contract rather than bypassing it.
