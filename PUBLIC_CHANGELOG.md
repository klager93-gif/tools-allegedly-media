# Signal Labs Public Changelog

## Signal Schedule v1.9.0 — Assignments Foundation

- Signal Schedule now previews employee assignment records such as consoles, posts, stations, and operational roles.
- This is a foundation release; public scheduling, bidding, and request workflows are not active yet.


## Signal Schedule v1.4.0 — Backend Adapter Selection

- Selected Coolify-hosted Schedule API service with Postgres as the preferred future backend path.
- Preserved static JSON as the active adapter and kept MySQL/D1 as possible future adapters.
- Added no CRUD, authentication, credentials, live API deployment, or database writes.


## Coordinated Recovery Release — Paycheck v0.9.9 / Schedule v1.3.3

- Cleaned public project documentation after backup-install drift.
- Restored the root README to describe the full Signal Labs tool ecosystem.
- Preserved Paycheck v0.9.9 behavior, including Weekly OT support.
- Preserved Signal Schedule v1.3.3 as a static JSON-backed planning tool.
- Repaired missing icon and Pay Planner incubator asset references.
- No calculator math, live account features, database writes, or backend connections changed.

## Signal Schedule v1.3.3 — Coolify Backend Setup Guide

- Updated backend planning to reflect the GitHub to Coolify deployment path.
- No public app behavior changed.

## Signal Schedule v1.3.1 — D1 Setup Guide

- Added setup guidance for preparing Cloudflare D1 before live database work begins.
- No user-facing application behavior changed.

## Signal Schedule v1.3.0 — D1 Database Foundation

- Added first D1 schema and seed planning files while keeping the live app static/read-only.

## Signal Schedule v1.1.0 — Repository / Adapter Layer

- Added repository and adapter boundaries around the static multi-agency JSON data layer.

## Signal Schedule v1.0.0 — Cloudflare Data Layer Foundation

- Added a static multi-agency data layer so the schedule prototype can load and switch between pretend agencies.
- No live database, login system, CRUD, or server-side code was included.
