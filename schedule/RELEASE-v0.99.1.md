# Signal Schedule v0.99.1 — Cloudflare Architecture Pivot

## Summary

Pivots the backend plan from PHP/MySQL-first to Cloudflare-native-first while preserving backend portability.

## Changes

- Adds `CLOUDFLARE-ARCHITECTURE.md`.
- Adds `BACKEND-PORTABILITY.md`.
- Adds Rule 24 to workflow standards.
- Updates roadmap from PHP/MySQL foundation to Cloudflare Data Layer Foundation.
- Keeps the release documentation-first under Rule 23.
- Adds no live database code, no credentials, no CRUD, and no new dashboard preview panels.

## Validation

- JavaScript syntax checked.
- Render registry validation passed.
- Every safeRender callback resolves to a defined function.
- No new dashboard preview panels added.
- ZIP integrity checked.
