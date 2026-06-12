## Current: v0.99.0 — Database Planning

This release plans the PHP/MySQL transition without creating live database code.

## Next

### v1.0.0 — Database Foundation

Minimum target:

- Private config example.
- Database connection helper.
- Initial `schema.sql`.
- Agencies table.
- Employees table.
- Read-only connection test.
- No production write workflows yet.

### v1.1.0 — Agency Admin Foundation

- Agency CRUD planning/implementation.
- Agency settings persistence.
- Terminology/vocabulary persistence.

### v1.2.0 — Employee Persistence Foundation

- Employee records.
- Assignment records.
- Eligibility and operational trait persistence.

### v1.3.0+

- Shift definitions.
- Schedule events.
- Requests.
- Opportunities.
- Bids and awards.
- Benefit ledger.
- Rules and coverage.
- Notifications.
- Audit logs.

## Guardrails

- Do not build full CRUD before connection and schema are validated.
- Do not store secrets in the repository.
- Do not add preview UI just to explain database concepts.
- Do not allow live writes before audit logging exists.
