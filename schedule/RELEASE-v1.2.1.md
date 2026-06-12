# Signal Schedule v1.2.1 — Worker Folder Repair

Repairs the v1.2.0 Worker API planning folder placement.

## What changed

- Removed the repository-root `/functions/` folder from the release package.
- Moved Schedule-owned mock Worker/API files into `/schedule/api/mock-functions/`.
- Added Rule 25: Tools own their infrastructure.
- Preserved the active static JSON adapter.
- Preserved backend portability under Rule 24.

## What did not change

- No live D1 database was added.
- No Cloudflare Worker deployment was added.
- No credentials were added.
- No CRUD, authentication, approvals, or live writes were added.
- No dashboard preview panels were added.

## Source

Built from `signal-labs-v1.2.0-worker-api-foundation.zip`.
