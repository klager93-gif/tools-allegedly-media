# Signal Schedule Roadmap

## Current

**v1.3.3 — Coolify Backend Setup Guide**

Signal Schedule documents the actual GitHub to Coolify deployment path. Cloudflare D1 is paused as the default backend path and remains a possible future adapter only. The active app still uses the static JSON adapter.

## Next

**v1.4.0 — Backend Adapter Selection**

Planned focus:

- Formally select the default backend adapter path.
- Confirm Coolify + API service + Postgres as the preferred future direction unless changed.
- Preserve D1, MySQL, and static JSON as replaceable adapters.
- Document service/repository/adapter boundaries before Employee API work begins.

## Planned Path

```text
v1.4.0 — Backend Adapter Selection
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
```

## Rule 24

Backend portability remains required. No UI or business logic should directly depend on a single backend implementation.
