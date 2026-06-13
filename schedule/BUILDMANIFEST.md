# Signal Schedule Build Manifest

**Version:** v2.3.1 — Version Sync + API File Integrity Fix  
**Build date:** 2026-06-13

## Build scope

Cleanup release for `/schedule/` plus root README version cleanup.

## Changed areas

- Schedule HTML page metadata and visible version labels
- Schedule cache-busting query strings
- Schedule script storage key
- Schedule README and changelog
- Schedule API seed data files
- Schedule Coolify API optional Postgres adapter
- Root README current package note

## Validation

- `node --check schedule/script.js`
- `node --check schedule/api/coolify/server.js`
- `node --check schedule/api/coolify/db/postgres.js`
- Verified required Schedule API/data files exist.
- Verified Schedule HTML CSS/JS references resolve locally.
- Built release ZIP excluding `.git`, `.DS_Store`, `._*`, `__MACOSX`, and release/archive junk.
