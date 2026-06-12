# Build Manifest

Release: Signal Schedule v1.3.2 — Coolify Backend Pivot
Source: signal-labs-v1.3.1-d1-setup-guide.zip

## Notes

- Corrects backend planning after confirming the live deployment path is GitHub to Coolify.
- Pauses Cloudflare D1 as the default backend path.
- Keeps Cloudflare D1 as a possible future adapter under Rule 24.
- Adds `/schedule/COOLIFY-BACKEND-PIVOT.md` and `/schedule/RELEASE-v1.3.2.md`.
- Active app remains static/JSON-backed.
- No live backend, database credentials, CRUD, authentication, live writes, root functions folder, or dashboard preview panels added.

## Validation

- JavaScript syntax checked.
- Schedule mock API JavaScript syntax checked.
- Render registry validation passed.
- Static JSON data files validated.
- Employee agencyId references validated.
- Root `/functions/` folder confirmed absent.
