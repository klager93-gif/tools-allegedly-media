# Signal Schedule Changelog

## v1.9.0 — Assignments Foundation

- Added assignment template seed data.
- Added employee assignment seed records.
- Added assignment adapter, repository, and service boundaries.
- Added read-only assignment API contract and Coolify JSON seed route planning.
- Added future Postgres assignment schema.
- Added Assignments Foundation preview section to the Schedule UI.
- Added no assignment writes, login system, minimum staffing engine, VOT workflow, or schedule generation logic.


## v1.8.0 — Employee CRUD Foundation

- Added protected employee CRUD route boundaries to the Coolify API.
- Added `POST /employees`, `PUT /employees/:id`, `PATCH /employees/:id`, and `DELETE /employees/:id`.
- Added `GET /employees/:id` single employee read route.
- Added `EMPLOYEE_WRITES_ENABLED` safety flag.
- Added `ADMIN_API_KEY` write-route guard using `Authorization: Bearer` or `x-admin-api-key`.
- Added soft-delete behavior instead of physical deletes.
- Added optional employee CRUD safety SQL indexes.
- Added no public writes, login system, role-based auth, frontend employee editor, or scheduling engine logic.

## v1.7.1 — Coolify Dockerfile Deployment Fix

- Added `schedule/api/coolify/Dockerfile` for predictable Coolify deployment.
- Added `schedule/api/coolify/.dockerignore`.
- Updated the API server to listen on `0.0.0.0` for container compatibility.
- Updated Postgres mode detection to support `DATA_MODE=postgres` as well as `USE_POSTGRES_EMPLOYEES=true`.
- Updated Coolify deployment documentation to recommend Dockerfile deployment instead of Nixpacks.
- Added no CRUD, authentication, new database tables, database writes, or scheduling engine logic.

## v1.7.0 — Postgres Connection + Employee Read Endpoint

- Added optional read-only Postgres connection helper for the Coolify API.
- Added Postgres employee read schema SQL.
- Added optional sample employee seed SQL for local/Coolify testing.
- Added `.env.example` for Coolify environment configuration without committing credentials.
- Updated `GET /health` and `GET /employees` to support JSON seed mode or Postgres read mode.
- Updated `ApiEmployeeAdapter.js` to represent the future Coolify/Postgres read boundary.
- Updated Employee API contract to v1.7.0.
- Added Postgres employee read endpoint documentation and release notes.
- Preserved static JSON as the active frontend adapter.
- Added no CRUD, authentication, production credentials, database writes, or scheduling engine logic.

## v1.6.0 — Coolify API Skeleton

- Added tool-owned Coolify API skeleton under `schedule/api/coolify/`.
- Added read-only skeleton routes for `GET /health` and `GET /employees`.
- Added `ApiEmployeeAdapter.js` as an inactive future API adapter boundary.
- Updated Employee API contract to v1.6.0.
- Updated Schedule UI copy and metadata to v1.6.0.
- Preserved static JSON as the active frontend adapter.
- Confirmed Coolify + Postgres as the active backend direction.
- Left Cloudflare Workers and D1 as historical/alternate adapter references only.
- Added no CRUD, authentication, production API deployment, Postgres connection, credentials, database writes, or scheduling engine logic.

## v1.5.1 — Employee Data Model Design

- Added employee data model design documentation before Coolify API skeleton work.
- Added scheduling entity model draft for future assignments, requests, overtime, coverage, and audit events.
- Defined Employee model groups: Core Identity, Employment, Organization, Schedule Assignment, Minimum Staffing Role, Certifications / Skills, Overtime Eligibility, Leave Configuration, Contact, Gender / Assignment Constraints, and Notes / Metadata.
- Clarified that Minimum Staffing Role is separate from HR position because future coverage logic will depend on role eligibility.
- Preserved static JSON as the active adapter and Coolify + Postgres as the preferred future backend direction.
- Added no CRUD, authentication, credentials, production API deployment, Postgres connection, database writes, or scheduling engine logic.

## v1.5.0 — Employee Read API Foundation

- Added read-only Employee API foundation before CRUD or live backend work.
- Added Employee service, repository, and JSON adapter boundary files.
- Added `schedule/api/contracts/employees.read.schema.json` for the future `/api/employees` response shape.
- Added `schedule/EMPLOYEE-READ-API-FOUNDATION.md`.
- Added an Employee Read Foundation preview section to the Schedule UI.
- Preserved static JSON as the active adapter.
- Preserved Coolify-hosted API service with Postgres as the preferred future backend path.
- Added no employee create/edit/delete, auth, credentials, live API deployment, Postgres connection, or database writes.

## v1.4.0 — Backend Adapter Selection

- Selected Coolify-hosted Schedule API service with Postgres as the preferred future backend path.
- Preserved static JSON as the active browser-safe adapter.
- Preserved MySQL and Cloudflare D1 as possible future adapters under Rule 24.
- Documented service, repository, adapter, and backend boundaries before Employee API work begins.
- Added backend adapter selection documentation.
- Updated Schedule app copy and release metadata to v1.4.0.
- Added no live CRUD, authentication, credentials, database writes, or production API deployment.


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
