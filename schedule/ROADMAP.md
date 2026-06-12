# Signal Schedule Roadmap

## Current

**v1.9.0 — Assignments Foundation**

Signal Schedule now connects employees to operational assignments such as consoles, posts, stations, beats, units, and desks. This assignment layer is required before minimum staffing, time-off validation, VOT bidding, mandation, and schedule generation can work correctly.

No login system, assignment editor, assignment writes, minimum staffing engine, or scheduling engine is active in this release.

## Next

**v2.0.0 — Minimum Staffing Foundation**

Planned focus:

- Minimum staffing requirements by agency, location, role, qualification, day, and time block.
- Compare assignment foundation records against coverage needs.
- Identify under-staffed and over-staffed areas before schedule generation.

## Planned Path

```text
v1.8.0 — Employee CRUD Foundation
v1.9.0 — Assignments Foundation
v2.0.0 — Minimum Staffing Foundation
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
v1.9.0 — Assignments Foundation
```

## Rule 24

Backend portability remains required. No UI or business logic should directly depend on a single backend implementation.
