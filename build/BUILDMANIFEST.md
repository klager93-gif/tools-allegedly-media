# Build Manifest

Version: v1.2.1
Release: Signal Schedule v1.2.1 — Worker Folder Repair
Source: signal-labs-v1.2.0-worker-api-foundation.zip
Output: signal-labs-v1.2.1-worker-folder-repair.zip

Validation:

- JavaScript syntax checked.
- Schedule API mock JavaScript syntax checked.
- Render registry validation passed.
- Every safeRender callback resolves to a defined function.
- Root-level /functions folder removed from release package.
- Schedule-owned API mock files placed under /schedule/api/mock-functions/.
- Rule 25 documented.
- No live D1, credentials, CRUD, auth, live writes, or new dashboard preview panels added.
- ZIP integrity checked after packaging.
