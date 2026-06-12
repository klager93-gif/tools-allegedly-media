# Signal Schedule v1.3.3 — Coolify Backend Setup Guide

## Summary

Adds the corrected Coolify backend setup guide after confirming the live deployment path is GitHub to Coolify.

This release keeps the app static and JSON-backed while documenting the preferred future backend direction: Coolify-hosted API service plus Postgres, with MySQL/D1 still possible through portable adapters.

## Scope

- Adds `/schedule/COOLIFY-BACKEND-SETUP.md`.
- Documents Coolify backend checklist.
- Documents Postgres recommendation.
- Keeps D1 as optional future adapter, not default path.
- Preserves Rule 24 backend portability.
- Preserves Rule 25 tool-owned infrastructure.

## Not included

- No live database connection.
- No credentials.
- No CRUD.
- No authentication.
- No API writes.
- No root `/functions` folder.
- No dashboard preview panels.
