# Signal Schedule Roadmap

## Current

**v1.6.0 — Coolify API Skeleton**

Signal Schedule now has a tool-owned Coolify API skeleton for read-only `/health` and `/employees` routes. The active browser app still uses the static JSON adapter until the API adapter is intentionally enabled.

No CRUD, authentication, production API deployment, Postgres connection, credentials, database writes, or scheduling engine logic are active in this release.

## Next

**v1.7.0 — Postgres Connection + Employee Read Endpoint**

Planned focus:

- Add Postgres connection configuration for the Coolify API service.
- Keep credentials out of the repository.
- Preserve the `/employees` response wrapper.
- Keep frontend access behind EmployeeService, EmployeeRepository, and ApiEmployeeAdapter.
- Add no employee create/edit/delete until CRUD is intentionally scheduled.

## Planned Path

```text
v1.7.0 — Postgres Connection + Employee Read Endpoint
v1.8.0 — Employee CRUD Foundation
v1.9.0 — Assignments Foundation
v2.0.0 — Events / Requests / VOT Foundation
v2.1.0 — Scheduling Engine Foundation
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
```

## Rule 24

Backend portability remains required. No UI or business logic should directly depend on a single backend implementation.
