# Signal Schedule Roadmap

## Current

**v1.5.0 — Employee Read API Foundation**

Signal Schedule now reads employee records through an Employee Service, Employee Repository, and static JSON adapter boundary. Coolify-hosted API service with Postgres remains the preferred future backend path.

The active app remains static and JSON-backed. No CRUD, authentication, live database writes, or production API deployment is active in this release.

## Next

**v1.6.0 — Coolify API Skeleton**

Planned focus:

- Define the Coolify-hosted API service skeleton.
- Preserve the Employee service/repository boundary.
- Keep static JSON active until the API adapter is intentionally switched.
- Add no production credentials and no database writes unless intentionally scoped.

## Planned Path

```text
v1.6.0 — Coolify API Skeleton
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
```

## Rule 24

Backend portability remains required. No UI or business logic should directly depend on a single backend implementation.
