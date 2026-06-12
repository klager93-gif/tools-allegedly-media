## Current: v1.1.0 — Repository / Adapter Layer

Signal Schedule now has a static multi-agency JSON data layer.

## Next

```text
v1.1.0 — Repository / Adapter Layer
v1.2.0 — Worker API Foundation
v1.3.0 — D1 Database Foundation
v1.4.0 — Employee CRUD Foundation
```

## Direction

Cloudflare-native first, backend-portable always. The initial data source is JSON. Later adapters may target D1, MySQL, PostgreSQL, or another backend.


## Current

### v1.1.0 — Repository / Adapter Layer

Static JSON is now accessed through adapter, repository, and service layers.

## Next

### v1.2.0 — Worker API Foundation

Introduce Cloudflare Worker/Pages Function API planning and/or mock endpoints without moving persistence to D1 yet.

### v1.3.0 — D1 Database Foundation

Add the first Cloudflare D1 database schema and adapter.
