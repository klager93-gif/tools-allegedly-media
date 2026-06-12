# Signal Schedule v0.99.0 Database Planning

This bridge release defines the persistence plan before v1.0 introduces PHP/MySQL.

## Principle

The database should persist facts. Engines should consume those facts. UI should display results and explanations.

## First persistence families

1. Agencies and agency settings.
2. Users and permissions.
3. Employees and employee assignments.
4. Shift definitions and schedule events.
5. Requests, opportunities, bids, and awards.
6. Benefit ledger entries.
7. Rules and coverage requirements.
8. Explanations, notifications, goals, and audit logs.

## v1.0 minimum scope

v1.0 should not attempt to persist every concept. It should prove the foundation:

- Secure config pattern.
- Database connection helper.
- Initial schema file.
- Agencies table.
- Employees table.
- Read-only test page.

## Non-goals

- No live scheduling writes.
- No approval workflows.
- No role-based admin dashboard.
- No drag-and-drop schedule editor.
- No SMS/email notifications.
