# Signal Schedule v1.3.2 — Coolify Backend Pivot

## What changed

The actual live deployment path is now documented as:

```text
GitHub
↓
Coolify
↓
Live Signal Labs site
```

Cloudflare remains useful for DNS, proxying, security, and optional future services, but the site is not currently deployed through Cloudflare Pages. Because of that, the Cloudflare D1-first roadmap is paused.

## Corrected backend direction

The likely backend path is now:

```text
GitHub
↓
Coolify
↓
Application / API container
↓
Coolify-managed database
```

Possible database options:

```text
Postgres
MySQL / MariaDB
SQLite for small/dev uses
Cloudflare D1 only if a future Cloudflare Worker adapter is intentionally chosen
```

## What stays the same

Rule 24 remains the most important backend rule:

```text
UI and business logic must not depend directly on D1, Workers, PHP, MySQL, Postgres, or any single backend.
```

The structure should stay:

```text
UI
↓
Service Layer
↓
Repository Layer
↓
Adapter
↓
Backend
```

This means the project can start with Coolify + Postgres/MySQL and still move later if needed.

## D1 status

A D1 database may exist in Cloudflare from setup testing, but it is not connected and should be treated as unused/test until intentionally selected again.

Do not build new D1-specific behavior unless we explicitly choose Cloudflare Workers/D1 as an adapter path.

## v1.3.2 scope

This release only documents and corrects the backend plan.

It does not add:

```text
live backend connection
Coolify database container
Postgres schema
MySQL schema
D1 binding
credentials
CRUD
authentication
writes
new dashboard preview panels
```

## Next safe step

Before Employee CRUD, create a Coolify backend setup guide:

```text
v1.3.3 — Coolify Backend Setup Guide
```

That guide should walk through the actual host path before any write operations are built.
