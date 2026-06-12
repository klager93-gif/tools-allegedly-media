## v0.99.1 Data Persistence Plan

v0.99.1 pivots the first persistence target from PHP/MySQL to Cloudflare-native storage while preserving the table/entity planning from v0.99.0.

## First backend target

- Cloudflare Pages for frontend deployment.
- Cloudflare Workers / Pages Functions for APIs.
- Cloudflare D1 for first SQL adapter.
- Cloudflare Secrets for backend secrets.

## Portability rule

D1 is an adapter, not the architecture. Services and repositories must sit between UI/business logic and backend storage.

## Future structured entities

- agencies
- employees
- audit_logs
- assignments
- shifts
- events
- requests
- opportunities
- bids
- awards
- benefits
- rules
- coverage
- explanations
- notifications
- goals
