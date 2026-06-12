# Signal Schedule Roadmap

## Current

**v1.7.1 — Coolify Dockerfile Deployment Fix**

Signal Schedule now has a Dockerfile deployment path for the Coolify API. This is a deployment fix for v1.7.0 after the Nixpacks build path proved too slow or unreliable during initial Coolify setup.

The active browser app still uses the static JSON adapter until the API adapter is intentionally enabled. The Coolify API remains read-only.

No CRUD, authentication, production credentials, database writes, or scheduling engine logic are active in this release.

## Next

**v1.8.0 — Employee CRUD Foundation**

Planned focus:

- Define create/edit/delete employee boundaries.
- Keep write operations behind service, repository, and adapter layers.
- Add validation and error response rules before writes go live.
- Keep authentication and roles as a separate planned release unless intentionally included.

## Planned Path

```text
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
v1.7.0 — Postgres Connection + Employee Read Endpoint
v1.7.1 — Coolify Dockerfile Deployment Fix
```

## Rule 24

Backend portability remains required. No UI or business logic should directly depend on a single backend implementation.
