# Signal Schedule Changelog

## v1.3.3 — Coolify Backend Setup Guide

- Documented the actual live deployment path as GitHub to Coolify.
- Paused Cloudflare D1 as the default backend assumption.
- Preserved D1 as a possible future adapter under Rule 24.
- Reframed future backend planning around Coolify-hosted services and database options.
- Recommended a future Coolify-hosted API service with Postgres while preserving adapter portability.
- Added no live backend, credentials, CRUD, authentication, writes, or dashboard preview panels.

## v1.3.2 — Backend Planning Refinements

- Continued backend planning and safety documentation before live persistence work.
- Preserved the static JSON adapter as the active data source.
- Added no live backend writes.

## v1.3.1 — D1 Setup Guide

- Added D1 setup documentation for Cloudflare preparation.
- Documented recommended D1 database name and binding name.
- Confirmed the app remains static/JSON-backed until D1 is intentionally connected.
- Added no CRUD, credentials, live writes, authentication, or root infrastructure folders.

## v1.3.0 — D1 Database Foundation

- Added `/schedule/d1/schema.sql`.
- Added `/schedule/d1/seed.sql`.
- Added planned D1 adapter contract.
- Removed the repository-root `/functions/` folder from the release package.
- Moved Schedule-owned API mock files into `/schedule/api/mock-functions/`.
- Preserved static JSON adapter behavior.
- Added no live D1 binding, credentials, CRUD, authentication, live writes, or dashboard preview panels.

## v1.1.0 — Repository / Adapter Layer

- Added repository/service/adapter boundaries around static JSON data.
- Preserved static app behavior.

## v1.0.0 — Cloudflare Data Layer Foundation

- Added browser-safe multi-agency JSON data files.
- Added data service functions.
- Started the v1.x data path while preserving backend portability.
