# Signal Schedule HOWTO

## Current Version

**v1.5.1 — Employee Data Model Design**

This release is a model-design release. It defines what employee and scheduling entities need to look like before Coolify API skeleton work begins.

## How to Use the Current App

1. Open `/schedule/index.html`.
2. Use the current browser-based prototype normally.
3. Employee data is still read from static JSON through the Employee service/repository/adapter boundary.
4. Do not expect create/edit/delete, authentication, production API calls, or database writes yet.

## How to Read the New Model Docs

Start with:

```text
schedule/EMPLOYEE-DATA-MODEL.md
```

Then review:

```text
schedule/SCHEDULE-DATA-MODEL.md
```

The key idea is:

```text
HR Position ≠ Minimum Staffing Role
```

Example:

```text
Position: Telecommunicator
Minimum Staffing Role: Dispatcher
Secondary Role: Lead Dispatcher
```

Future coverage logic should use minimum staffing roles instead of relying only on HR job titles.

## Architecture Boundary

The app should continue to follow:

```text
UI
  ↓
Services
  ↓
Repositories
  ↓
Adapters
  ↓
Backend
```

Do not connect UI or scheduling logic directly to Postgres, MySQL, D1, Workers, PHP, Coolify, or a raw JSON file.

## Backend Direction

Preferred future direction:

```text
GitHub
  ↓
Coolify
  ↓
Schedule API service
  ↓
Postgres
```

v1.5.1 does not install or connect Postgres.

## Do Not Add Yet

- CRUD
- Authentication
- Production credentials
- Database writes
- Postgres connection
- Scheduling engine logic
- Payroll/benefits/medical/discipline records

## Next Planned Release

**v1.6.0 — Coolify API Skeleton**

The next release should define the API skeleton around the model direction without adding production database writes.
