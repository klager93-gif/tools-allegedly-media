# Signal Schedule v1.3.0 — D1 Database Foundation

Adds the Cloudflare Worker / Pages Function API foundation while keeping the main app static and backend-portable.

## Added

- Planned Worker API response standards.
- Mock Pages Function endpoint files for health, agencies, and employees.
- API adapter contract notes in the app layer.
- Worker API foundation documentation.

## Preserved

- Static JSON remains the active data source.
- Repository/service/adapter boundaries remain in place.
- No D1, credentials, CRUD, authentication, or live writes were added.

## Fixed

- Removed duplicate employee add call in the employee form submit handler.
