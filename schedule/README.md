## v0.99.1 — Cloudflare Architecture Pivot

Signal Schedule v0.99.1 pivots the post-0.99 backend plan from traditional PHP/MySQL hosting to a Cloudflare-native path because the live site already deploys from GitHub to Cloudflare.

This release does **not** create live D1 tables, Workers, API endpoints, CRUD workflows, authentication, approvals, or production data storage. It documents the architecture pivot before implementation.

## Direction

Initial backend target:

```text
Cloudflare Pages
Cloudflare Workers / Pages Functions
Cloudflare D1
Cloudflare Secrets
Cloudflare KV / R2 when appropriate
```

## Rule 24

Backend portability is required. D1 is the first likely backend adapter, not a permanent lock-in. UI and business logic must go through services, repositories, and adapters.

## Guardrails

- No secrets in GitHub.
- No direct UI dependency on D1 or Workers.
- No new foundation preview panels unless the UI itself is the release purpose.
- Render registry validation remains required before packaging.

## Next

`v1.0.0 — Cloudflare Data Layer Foundation` should add browser-safe JSON data files and service/repository boundaries before any live database or Worker API exists.
