# Signal Schedule v1.8.0 — Employee CRUD Foundation

Signal Schedule v1.8.0 adds protected employee CRUD route boundaries to the Coolify API.

## Purpose

This release creates the backend shape for managing employees without exposing public write access.

```text
Browser / Admin Tool
  ↓
Coolify API
  ↓
Employee CRUD route guard
  ↓
Postgres employee table
```

## Routes

```text
GET    /employees
GET    /employees/:id
POST   /employees
PUT    /employees/:id
PATCH  /employees/:id
DELETE /employees/:id
```

## Safety rules

Write routes are disabled by default.

To enable protected writes in a test environment, Coolify must provide:

```text
EMPLOYEE_WRITES_ENABLED=true
ADMIN_API_KEY=<long random key>
DATA_MODE=postgres
DATABASE_URL=<internal Postgres URL>
```

Requests must include either:

```text
Authorization: Bearer <ADMIN_API_KEY>
```

or:

```text
x-admin-api-key: <ADMIN_API_KEY>
```

## Delete behavior

Deletes are soft deletes only.

```text
status = deleted
updated_at = now()
```

No rows are physically removed in v1.8.0.

## Not included

- No user login.
- No role-based authentication.
- No public write access.
- No schedule generation engine.
- No frontend employee editor yet.
- No real employee data should be added until auth and UI protections are intentionally designed.
