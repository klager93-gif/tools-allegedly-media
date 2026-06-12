# Signal Labs Master Changelog

## Signal Schedule v1.9.0 — Assignments Foundation

- Added assignment templates and employee assignment records.
- Added assignment service/repository/adapter boundaries.
- Added read-only assignment API contract and future Postgres assignment schema.
- Added Schedule UI preview connecting employees to operational assignments.
- No Paycheck, root app, global asset, authentication, VOT, minimum staffing, or schedule engine changes added.


## Signal Schedule v1.4.0 — Backend Adapter Selection

- Selected Coolify-hosted Schedule API service with Postgres as the preferred future backend path.
- Preserved static JSON as the active adapter and kept MySQL/D1 as possible future adapters.
- Added no CRUD, authentication, credentials, live API deployment, or database writes.


## Coordinated Recovery Release — Paycheck v0.9.9 / Schedule v1.3.3

- Restored root README from Schedule-specific changelog drift back to Signal Labs ecosystem documentation.
- Cleaned root roadmap to reflect current tool versions and next planned work.
- Preserved Paycheck v0.9.9 as the active Paycheck version.
- Preserved Signal Schedule v1.3.3 as the active Schedule version.
- Repaired Rule 26 asset validation issues for root favicon references and Pay Planner incubator assets.
- Removed backup-install documentation drift from current roadmap/changelog surfaces.
- No Paycheck calculator math changes added.
- No Schedule CRUD, authentication, live API, credentials, database writes, or production backend connections added.

## Signal Schedule v1.3.3 — Coolify Backend Setup Guide

- Corrected backend planning after confirming GitHub to Coolify deployment.
- Paused Cloudflare D1 as the default path.
- Preserved D1 as a possible future adapter under Rule 24.
- Added Schedule Coolify backend pivot documentation.

## Signal Schedule v1.3.1 — D1 Setup Guide

- Added Schedule D1 setup guidance.
- Preserved JSON adapter as the active data source.
- No live backend behavior added.

## Signal Schedule v1.3.0 — D1 Database Foundation

- Added D1 foundation planning for agencies, employees, and audit logs.
- Moved Schedule-owned API mock planning files into `/schedule/api/mock-functions/`.
- Preserved static JSON adapter behavior.
- Added no live D1 binding, credentials, CRUD, authentication, or live writes.

## Signal Schedule v1.1.0 — Repository / Adapter Layer

- Added repository/service/adapter boundaries around static JSON data.
- Preserved static app behavior.

## Signal Schedule v1.0.0 — Cloudflare Data Layer Foundation

- Added browser-safe multi-agency JSON data files and data service functions.
- Started the v1.x data path while preserving backend portability.
