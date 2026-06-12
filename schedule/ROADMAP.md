# Signal Schedule Roadmap

## Current

**v1.4.0 — Backend Adapter Selection**

Signal Schedule has selected the preferred future backend path: Coolify-hosted Schedule API service with Postgres, while preserving static JSON, MySQL, and Cloudflare D1 as replaceable adapters under Rule 24.

The active app remains static and JSON-backed. No CRUD, authentication, live database writes, or production API deployment is active in this release.

## Next

**v1.5.0 — Employee Read API Foundation**

Planned focus:

- Define read-only Employee API response shape.
- Add API-facing repository contract without bypassing the service layer.
- Keep static JSON as the browser-safe fallback adapter.
- Add no writes, no auth, and no production credentials.

## Planned Path

```text
v1.5.0 — Employee Read API Foundation
v1.6.0 — Employee CRUD Foundation
v1.7.0 — Assignments Foundation
v1.8.0 — Events Foundation
v1.9.0 — Requests / VOT Foundation
v2.0.0 — Scheduling Engine Foundation
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
```

## Rule 24

Backend portability remains required. No UI or business logic should directly depend on a single backend implementation.
