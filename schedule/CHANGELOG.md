## Signal Schedule v1.3.3 — Coolify Backend Setup Guide

Adds Coolify backend setup documentation after confirming the live deployment path is GitHub to Coolify. Recommends a future Coolify-hosted API service with Postgres while preserving D1/MySQL as possible adapters under Rule 24. No app behavior, credentials, CRUD, authentication, root infrastructure folders, or dashboard preview panels were added.

## v1.3.3 — Coolify Backend Setup Guide

- Documented the actual live deployment path as GitHub to Coolify.
- Paused Cloudflare D1 as the default backend assumption.
- Preserved D1 as a possible future adapter under Rule 24.
- Reframed future backend planning around Coolify-hosted services and database options.
- Added no live backend, credentials, CRUD, authentication, writes, or dashboard preview panels.

## v1.3.1 — D1 Setup Guide

- Added D1 setup documentation for Cloudflare preparation.
- Documented recommended D1 database name and binding name.
- Confirmed the app remains static/JSON-backed until D1 is intentionally connected.
- No CRUD, credentials, live writes, authentication, or root infrastructure folders added.

## v1.3.0 — D1 Database Foundation

- Added `/schedule/d1/schema.sql`.
- Added `/schedule/d1/seed.sql`.
- Added planned D1 adapter contract.
- Kept JSON adapter active.
- Added no live D1 binding, credentials, CRUD, authentication, or live writes.

# Signal Schedule Changelog

## v1.3.0 — D1 Database Foundation

- Removed the repository-root `/functions/` folder from the release package.
- Moved Schedule-owned API mock files into `/schedule/api/mock-functions/`.
- Added Rule 25: Tools own their infrastructure.
- Preserved static JSON adapter behavior.
- Preserved backend portability boundaries.
- Added no D1, Worker deployment, credentials, CRUD, auth, live writes, or dashboard preview panels.

# Signal Schedule Changelog

## v1.3.0 — D1 Database Foundation

- Added Worker API foundation documentation.
- Added mock Cloudflare Pages Function endpoint files for planned health, agencies, and employees APIs.
- Added API adapter contract notes while keeping JSON as the active adapter.
- Preserved backend portability under Rule 24.
- Fixed duplicate employee add submit call.
- No D1, credentials, CRUD, authentication, or live writes added.

## v1.1.0 — Repository / Adapter Layer

- Added repository/service/adapter boundaries around static JSON data.
- Preserved static app behavior.
