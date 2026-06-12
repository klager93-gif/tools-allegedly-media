# Signal Schedule Roadmap

## Current

**v1.8.0 — Employee CRUD Foundation**

Signal Schedule now has protected employee CRUD route boundaries in the Coolify API. Writes remain disabled by default and require both `EMPLOYEE_WRITES_ENABLED=true` and an `ADMIN_API_KEY`. Deletes are soft deletes only.

No login system, role-based authentication, frontend employee editor, or scheduling engine logic is active in this release.

## Next

**v1.9.0 — Authentication / Admin Access Foundation**

Planned focus:

- Design login/session or token strategy.
- Define admin/scheduler/supervisor/employee roles.
- Protect employee data before real employee records are entered.
- Decide whether public API reads should remain available or require authorization.

## Planned Path

```text
v1.8.0 — Employee CRUD Foundation
v1.9.0 — Authentication / Admin Access Foundation
v2.0.0 — Assignments Foundation
v2.1.0 — Events / Requests / VOT Foundation
v2.2.0 — Scheduling Engine Foundation
```

## Completed

```text
v0.99.1 — Cloudflare Architecture Pivot
v1.0.0 — Cloudflare Data Layer Foundation
v1.1.0 — Repository / Adapter Layer
v1.2.0 — Planning / safety documentation
v1.3.0 — D1 Database Foundation
v1.3.1 — D1 Setup Guide
v1.3.2 — Backend planning refinements
v1.3.3 — Coolify Backend Setup Guide
v1.4.0 — Backend Adapter Selection
v1.5.0 — Employee Read API Foundation
v1.5.1 — Employee Data Model Design
v1.6.0 — Coolify API Skeleton
v1.7.0 — Postgres Connection + Employee Read Endpoint
v1.7.1 — Coolify Dockerfile Deployment Fix
v1.8.0 — Employee CRUD Foundation
```

## Rule 24

Backend portability remains required. No UI or business logic should directly depend on a single backend implementation.
