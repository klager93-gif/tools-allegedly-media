# Signal Labs Admin Changelog

## Coordinated Recovery Release — Paycheck v0.9.9 / Schedule v1.3.3

- Cleaned root documentation surfaces after backup-install drift.
- Rebuilt root README as ecosystem documentation instead of Schedule-specific release notes.
- Cleaned root roadmap to show current tool status and next planned releases.
- Preserved Paycheck v0.9.9 app files and calculator behavior.
- Preserved Signal Schedule v1.3.3 app files and backend-planning state.
- Added/restored root favicon files required by absolute favicon references.
- Added minimal Pay Planner incubator CSS/JS so referenced assets resolve.
- Removed duplicate current-version sections from active Paycheck and Schedule documentation.
- No live backend, credentials, CRUD, authentication, database writes, or calculator math changes added.

## Signal Schedule v1.3.3 — Coolify Backend Setup Guide

- Paused Cloudflare D1-first assumptions.
- Reframed future backend work around Coolify-hosted services and databases.
- Preserved backend portability and tool-owned infrastructure rules.

## Signal Schedule v1.3.1 — D1 Setup Guide

- Added D1 setup documentation for Cloudflare preparation.
- Confirmed static JSON remains the active data source.

## Signal Schedule v1.3.0 — D1 Database Foundation

- Added `/schedule/d1/schema.sql` and `/schedule/d1/seed.sql` planning files.
- Added planned D1 adapter contract notes.
- Moved Schedule-owned mock API planning files into `/schedule/api/mock-functions/`.
- Added no live D1 binding, credentials, CRUD, authentication, or live writes.

## Signal Schedule v1.1.0 — Repository / Adapter Layer

- Implemented backend-portability boundaries with JSON adapter, repositories, services, and data gateway.
