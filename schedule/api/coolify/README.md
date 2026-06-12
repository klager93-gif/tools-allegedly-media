# Signal Schedule Coolify API

Current version: v1.9.0

This folder contains the tool-owned Coolify API for Signal Schedule.

## Active routes

Read routes:

```text
GET /health
GET /employees
GET /employees/:id
```

Protected write foundation routes:

```text
POST /employees
PUT /employees/:id
PATCH /employees/:id
DELETE /employees/:id
```

## Write safety

Employee write routes are disabled unless all of the following are true:

```text
DATA_MODE=postgres
DATABASE_URL=<internal Postgres URL>
EMPLOYEE_WRITES_ENABLED=true
ADMIN_API_KEY=<long random key>
```

Write requests must include either:

```text
Authorization: Bearer <ADMIN_API_KEY>
```

or:

```text
x-admin-api-key: <ADMIN_API_KEY>
```

Deletes are soft deletes only. They set `status = deleted` and do not remove rows from Postgres.

## Deployment

Coolify deployment should use the Dockerfile build pack with:

```text
Base Directory: /schedule/api/coolify
Dockerfile Location: /schedule/api/coolify/Dockerfile
Port: 3000
```

## v1.9.0 Assignments Foundation

Read-only JSON seed assignment routes are available for foundation review:

```text
GET /assignments
GET /api/assignments
```

Assignment writes are not active in this release.
