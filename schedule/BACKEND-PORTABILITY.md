# Backend Portability — Rule 24

## v1.4.0 Backend Adapter Selection

The selected preferred future backend path is:

```text
GitHub → Coolify → Schedule API service → Postgres
```

This selection does not remove portability. Postgres must remain an adapter implementation, not a direct dependency inside UI or scheduling logic.

## Rule 24

Backend portability is required. No UI or business logic may depend directly on D1, Workers, MySQL, PHP, Postgres, Coolify, or any other backend-specific storage implementation.

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

## Current adapter path

```text
EmployeeService
↓
EmployeeRepository
↓
JsonAdapter
↓
/schedule/data/*.json
```

## Preferred future adapter path

```text
EmployeeService
↓
EmployeeRepository
↓
PostgresAdapter
↓
Coolify-hosted API service
↓
Postgres
```

## Future alternate adapters

```text
MySQLAdapter
D1Adapter
ImportFileAdapter
MockAdapter
```

## Forbidden pattern

```text
UI directly queries Postgres/D1/MySQL
UI directly calls backend-specific SQL
Business rules live inside API route handlers
SQL is scattered across unrelated files
```

## Required pattern

```text
UI asks service for data
Service applies business meaning
Repository owns data access contract
Adapter handles backend-specific implementation
```
