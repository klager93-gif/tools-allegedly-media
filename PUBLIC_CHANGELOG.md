## Signal Schedule v1.2.1 — Worker Folder Repair

- Removed root-level `/functions/` from the release package.
- Moved Schedule API mock planning files into `/schedule/api/mock-functions/`.
- Added Rule 25: Tools own their infrastructure.
- Confirmed no D1, credentials, CRUD, authentication, or live writes were added.

# Public Changelog

## Signal Schedule v1.0.0 — Cloudflare Data Layer Foundation

Adds a static multi-agency data layer so the schedule prototype can load and switch between pretend agencies such as Corrections, Fire, Dispatch, and Police.

No live database, login system, CRUD, or server-side code is included yet.


## Signal Schedule v1.1.0

Adds repository and adapter boundaries around the static multi-agency JSON data layer.

## Signal Schedule v1.2.1 — Worker Folder Repair

Adds the planned Cloudflare Worker / Pages Function API shape while keeping the active app static and backend-portable. No D1, credentials, CRUD, authentication, or live writes added.
