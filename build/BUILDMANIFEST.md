# Build Manifest

Build: Signal Schedule v1.7.1 — Coolify Dockerfile Deployment Fix
Date: 2026-06-12
Package Type: Tool release / deployment fix

## Included Scope

- Schedule v1.7.1 Dockerfile deployment fix
- Tool-owned Dockerfile for `schedule/api/coolify/`
- Tool-owned `.dockerignore` for the Schedule API container build
- API server container compatibility update to listen on `0.0.0.0`
- Runtime mode compatibility for `DATA_MODE=postgres` and `USE_POSTGRES_EMPLOYEES=true`
- Coolify Dockerfile deployment documentation
- Schedule README, ROADMAP, CHANGELOG, HOWTO, and release notes updates
- Root/build manifest and checksum updates

## Excluded Scope

- No CRUD
- No authentication
- No production credentials
- No new database tables
- No database writes
- No scheduling engine changes

## Validation

- Rule 26 asset validation: PASS
- Missing references: 0
- Node syntax check: PASS for API server and Postgres helper
