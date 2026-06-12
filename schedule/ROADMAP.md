## Signal Schedule v1.3.3 — Coolify Backend Setup Guide

Adds Coolify backend setup documentation after confirming the live deployment path is GitHub to Coolify. Recommends a future Coolify-hosted API service with Postgres while preserving D1/MySQL as possible adapters under Rule 24. No app behavior, credentials, CRUD, authentication, root infrastructure folders, or dashboard preview panels were added.

## Current: v1.3.3 — Coolify Backend Setup Guide

The actual deployment path is GitHub to Coolify. Cloudflare D1 is paused as the default backend path and remains a possible future adapter only.

Next recommended release: v1.3.3 — Coolify Backend Setup Guide.

## Revised Next Steps

```text
v1.3.3 — Coolify Backend Setup Guide
v1.4.0 — Backend Adapter Selection
v1.5.0 — Employee Read API Foundation
v1.6.0 — Employee CRUD Foundation
```

## Current: v1.3.1 — D1 Setup Guide

D1 setup guidance has been added before Employee CRUD begins.

Next: v1.4.0 — Employee CRUD Foundation.

## Current: v1.3.0 — D1 Database Foundation

D1 schema and seed files now exist, but the active app still uses the JSON adapter.

## Next

```text
v1.4.0 — Employee CRUD Foundation
v1.5.0 — Assignments Foundation
v1.6.0 — Events Foundation
v1.7.0 — Requests Foundation
v1.8.0 — Opportunities Foundation
v1.9.0 — Bidding Foundation
```

## Current: v1.3.0 — D1 Database Foundation

The app remains static and browser-only while the future Worker API shape is documented.

## Completed

```text
v0.99.1 — Cloudflare Architecture Pivot
v1.0.0 — Cloudflare Data Layer Foundation
v1.1.0 — Repository / Adapter Layer
v1.3.0 — D1 Database Foundation
```

## Next

```text
v1.3.0 — D1 Database Foundation
v1.4.0 — Employee CRUD Foundation
v1.5.0 — Assignments Foundation
v1.6.0 — Events Foundation
v1.7.0 — Requests Foundation
v1.8.0 — Opportunities Foundation
v1.9.0 — Bidding Foundation
```

## Rule 24

Backend portability remains required. D1 is the first likely backend adapter, not a permanent lock-in.
