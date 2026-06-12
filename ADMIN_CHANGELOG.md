## Signal Schedule v1.2.1 — Worker Folder Repair

- Removed root-level `/functions/` from the release package.
- Moved Schedule API mock planning files into `/schedule/api/mock-functions/`.
- Added Rule 25: Tools own their infrastructure.
- Confirmed no D1, credentials, CRUD, authentication, or live writes were added.

# Admin Changelog

## Signal Schedule v1.0.0 — Cloudflare Data Layer Foundation

- Adds `/schedule/data/agencies.json`.
- Adds `/schedule/data/employees.json`.
- Adds static data service functions in Schedule.
- Adds multi-agency selector behavior.
- Keeps app browser-only and static.
- No D1, Workers, credentials, CRUD, or authentication added.
- No new dashboard preview panels or render registry entries added.


## Signal Schedule v1.1.0

Implements the first backend-portability layer: JSON adapter, repositories, services, and data gateway. No live backend code added.

## Signal Schedule v1.2.1 — Worker Folder Repair

Adds the planned Cloudflare Worker / Pages Function API shape while keeping the active app static and backend-portable. No D1, credentials, CRUD, authentication, or live writes added.
