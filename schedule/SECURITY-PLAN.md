# Signal Schedule Security Plan — v0.99.1

## Secrets

Do not commit secrets to GitHub. Future Cloudflare secrets should be stored in Cloudflare Secrets / environment bindings, not in public files.

## Database access

D1 bindings should be accessed only from Workers or Pages Functions, never directly from browser JavaScript.

## Writes

Do not allow production writes until audit logging exists.

## Backend portability

Security decisions should stay outside UI code. Repositories and adapters should enforce backend access boundaries.

## Future authentication

Authentication and roles should be planned before employee self-service, supervisor approvals, or admin CRUD become live.
