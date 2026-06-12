# Signal Schedule Audit Logging Plan — v0.99.0

Audit logging is mandatory before live schedule-changing writes.

## Audit record should include

- Actor user ID.
- Actor role.
- Action type.
- Target entity type.
- Target entity ID.
- Previous value when practical.
- New value when practical.
- Reason or rule chain.
- Timestamp.
- Request/source context.

## Actions that require audit logs

- Creating or changing employees.
- Changing assignments.
- Creating schedule events.
- Approving or denying requests.
- Posting opportunities.
- Awarding bids.
- Applying mandates.
- Overriding rules.
- Sending or suppressing notifications.
