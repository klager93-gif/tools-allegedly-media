# Signal Schedule Build Manifest — v4.4.0

Generated: 2026-06-14

## Source

- Rebuilt from uploaded v4.3.0 backup: `2026-06-14 Schedule Backup Before v4.4.0.zip`
- Package type: full-root replacement package

## Release Changes

- Added saved schedule CRUD foundation.
- Added migration `044_saved_schedule_crud_foundation_schema.sql`.
- Added saved schedule write contract and foundation notes.
- Added protected API routes for `/api/saved-schedules`.
- Fixed employee write validation handling.
- Normalized active Schedule version/cache references to v4.4.0.
- Removed `.git`, `__MACOSX`, `._*`, and `.DS_Store` package junk.

## Validation

- `node --check schedule/api/coolify/server.js` passed.
- `node --check schedule/api/coolify/db/postgres.js` passed.
- No v4.3.0 references remain under `/schedule/`.
- No package junk remains in the rebuilt tree.
