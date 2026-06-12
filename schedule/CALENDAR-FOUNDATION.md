# Schedule v2.1.0 — Calendar Foundation

Calendar Foundation introduces a separate user-facing schedule page:

```text
schedule/schedule.html
```

The existing `schedule/index.html` remains the foundation/admin overview page.

## Added

- Month-style calendar preview
- Day detail panel
- Coverage status badges
- Short-staffing placeholders
- Open shift placeholders
- Event placeholders for leave, training, and open shifts
- Calendar JSON adapter
- Calendar repository boundary
- Calendar service boundary
- Read-only calendar API contract
- Read-only Coolify API route planning
- Future Postgres calendar schema

## Not Included Yet

- Schedule generation
- Drag/drop assignments
- Leave approval workflow
- VOT bidding
- Mandation logic
- Employee login/self-service
- Production publishing

## Purpose

This release gives future scheduling workflows a visible calendar surface before the engine is fully built.
