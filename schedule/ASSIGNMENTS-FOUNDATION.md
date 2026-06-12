# Signal Schedule v1.9.0 — Assignments Foundation

Assignments connect employees to operational work before minimum staffing, time-off validation, voluntary overtime, mandation, and schedule generation exist.

## What This Adds

- Assignment template seed data
- Employee assignment seed records
- Browser-safe JSON assignment adapter
- Assignment repository boundary
- Assignment service boundary
- Read-only assignment API contract
- Future Postgres assignment schema
- Assignments Foundation UI preview

## Assignment Examples

- Dispatcher → Police Radio
- Dispatcher → Fire Radio
- Dispatcher → Calltaking
- Corrections Officer → Booking
- Firefighter / Paramedic → Station 1 Engine

## What This Does Not Add

- No production assignment editor
- No assignment writes
- No login or role-based authentication
- No minimum staffing engine
- No time-off approval workflow
- No schedule generation engine

## Active Frontend Path

```text
UI
  ↓
Assignment preview renderer
  ↓
Static JSON assignment data
```

## Future Backend Path

```text
UI
  ↓
Assignment Service
  ↓
Assignment Repository
  ↓
API/Postgres adapter
  ↓
assignment_templates + employee_assignments
```
