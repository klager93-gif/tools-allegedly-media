# v1.0 Database Readiness Checklist

Before building v1.0, confirm:

- Database tables map to stored facts, not assumptions.
- Agency terminology is data-driven.
- Employees are separate from user accounts.
- Requests, opportunities, bids, awards, explanations, and notifications are separate records.
- Benefit changes are ledger entries.
- Rule evaluations can be audited later.
- Overrides require reasons.
- Every future automated decision can produce an explanation.
- Render registry validation remains part of every build until the UI is redesigned.

## v1.0 minimum target

- PHP/MySQL foundation
- User and role model
- Agency settings table
- Employee table
- Shift/pattern tables
- Event/request/opportunity tables
- Audit log table
- Basic CRUD skeletons
