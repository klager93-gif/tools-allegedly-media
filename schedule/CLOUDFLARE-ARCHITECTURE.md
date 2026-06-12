# Signal Schedule v0.99.1 — Cloudflare Architecture Pivot

This release pivots the post-0.99 roadmap from traditional PHP/MySQL hosting to a Cloudflare-native architecture because the live workflow is already GitHub to Cloudflare.

## Target stack

```text
GitHub
↓
Cloudflare Pages
↓
Cloudflare Workers / Pages Functions
↓
Repository and service layers
↓
Adapters
↓
Cloudflare D1, KV, R2, Secrets, Queues as needed
```

## What changes

- PHP/MySQL is no longer the default first backend target.
- Cloudflare Workers/Pages Functions become the first API target.
- Cloudflare D1 becomes the first SQL persistence adapter.
- D1 is treated as one adapter, not a permanent lock-in.
- Backend portability remains mandatory.

## What does not change

- Rule 0: store facts, not assumptions.
- Rule 23: do not create unnecessary foundation preview panels.
- Render registry validation remains a packaging gate.
- The app remains browser-only until v1.0 data-layer work begins.
- The scheduling engines should not depend directly on Cloudflare, D1, PHP, or MySQL.

## Cloudflare services

### Pages
Hosts the static frontend and deploys from GitHub.

### Workers / Pages Functions
Future API boundary for requests such as `/api/employees`, `/api/agencies`, and `/api/health`.

### D1
Future SQL adapter for structured records such as agencies, employees, assignments, events, requests, opportunities, bids, awards, and audit logs.

### KV
Possible future storage for low-risk configuration, cached lookup data, and feature flags.

### R2
Possible future object storage for exports, attachments, generated reports, or backups. Structured schedule records should not live in R2.

### Secrets
Future location for API secrets and credentials. Secrets must not be committed to GitHub.
