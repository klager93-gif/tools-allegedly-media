# Signal Schedule v1.3.2 — Coolify Backend Pivot

## Summary

Corrects the backend roadmap after confirming the live deployment path uses GitHub to Coolify rather than Cloudflare Pages.

This release pauses Cloudflare D1 as the default implementation path and reframes future backend work around Coolify-hosted services and database options while preserving backend portability under Rule 24.

## Changed

- Added `/schedule/COOLIFY-BACKEND-PIVOT.md`.
- Updated Schedule version references to v1.3.2.
- Documented GitHub → Coolify as the actual live deployment path.
- Paused Cloudflare D1 as the default backend assumption.
- Preserved D1 as a possible future adapter, not the current default.
- Reframed future backend planning toward Coolify with Postgres/MySQL options.

## Not added

- No live backend connection.
- No Coolify service configuration.
- No database credentials.
- No D1 binding.
- No CRUD.
- No authentication.
- No live writes.
- No root infrastructure folders.
- No dashboard preview panels.

## Next

```text
Signal Schedule v1.3.3 — Coolify Backend Setup Guide
```
