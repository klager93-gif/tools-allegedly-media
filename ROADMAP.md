## Current

- Schedule v2.13.0 — Employee Profile & Self-Service Settings is complete.

## Next

- Schedule v2.14.0 — Employee Timeline & Audit Trail.
- Schedule v2.15.0 — Supervisors & Organizational Hierarchy.
- Schedule v2.16.0 — Roles & Permissions Engine.

## Schedule v2.12.0 — Calendar Views + Schedule Footer

- Adds user-facing week and day calendar views.
- Adds Schedule-specific footer across /schedule/ pages.
- Adds Calendar View foundation files and fixes overview version drift.

# Current: Schedule v2.11.0 — Calendar Shortcode Admin Controls

Next: Schedule v2.12.0 — Calendar Views

Database note: after v2.11 is uploaded, run Schedule migrations 004 through 017 in order.

# Signal Labs Roadmap

## Current Coordinated Recovery

This recovery package restores documentation integrity after backup-install drift.

Included scope:

- Paycheck v0.9.9 documentation cleanup
- Signal Schedule v1.4.0 backend adapter selection
- Root README recovery
- Rule 26 asset validation repair
- Pay Planner incubator asset restoration

No Paycheck calculator logic changes are included.
No Schedule CRUD, authentication, live API, database writes, or backend deployment is included.

## Active Tool Status

| Area | Current | Next Focus |
|---|---:|---|
| Home | v0.9.9.6 | Keep root pages aligned with active tools. |
| Paycheck | v0.9.9 | Preserve Weekly OT and prepare for later v1.0 validation. |
| Overtime | Frozen | Critical fixes/shared-pattern sync only. |
| Time Off | Active | Future planning work after Paycheck/Schedule stabilization. |
| Schedule | v1.7.0 | v1.8.0 Employee CRUD Foundation. |
| Pay Planner | v0.1.x | Incubator only; keep structurally valid while unlisted. |

## Signal Schedule Path

```text
Current: v1.4.0 — Backend Adapter Selection
Next:    v1.8.0 — Employee CRUD Foundation
Future:  v1.9.0 — Assignments Foundation
Future:  v2.0.0 — Events / Requests / VOT Foundation
Future:  v1.7.0 — Assignments Foundation
Future:  v1.8.0 — Events Foundation
Future:  v1.9.0 — Requests / VOT Foundation
Future:  v2.0.0 — Scheduling Engine Foundation
```

## Paycheck Path

```text
Current: v0.9.9 — Report & Metadata Cleanup
Next:    v1.0.0 — Validation / Production Readiness
```

## Long-Term Ecosystem

### Work
- Paycheck Calculator
- Overtime Calculator
- Time Off Calculator
- Signal Schedule

### Career
- Raise Calculator
- Job Offer Comparison
- Salary ↔ Hourly

### Money
- Emergency Fund
- Debt Payoff
- Retirement Contribution
- Compound Interest

### Public Safety
- Comp Time
- Kelly Day
- Shift Schedules
- Pension

## Schedule Next

- Current Schedule: v1.8.0 — Employee CRUD Foundation
- Next Schedule: v1.8.0 — Employee CRUD Foundation

## v2.1.3 — Employee Identity Cleanup

Completed identity cleanup before leave, open shifts, authentication, and role-based views:

- Hidden system IDs remain internal.
- Agency employee IDs are admin-entered.
- Badge numbers are optional and separate.
- Future login users stay separate from employees.
- Username or email may be used for login.
- Roles remain separate from employee records.

Next: **v2.2.0 — Leave Requests Foundation**.
## Schedule Roadmap Update

Completed v2.2.0 Leave Requests Foundation. Next recommended: v2.3.0 Open Shifts / VOT Foundation.

## v2.2.1 — Request Hours & Admin Override Foundation

Leave Requests now include preview support for full-day vs partial-day time selection, start/end time calculation, request type minimum increments, and admin/scheduler override planning. Employee/self-service requests follow configured increments; admin/scheduler entries may use exact operational times with override notes.

## Completed: v2.3.0 — Open Shifts / VOT Foundation

Open Shifts and voluntary overtime now have a preview page, seed data, request reason planning, API boundaries, and future schema planning.

## Next Recommended: v2.4.0 — Supervisor Review Foundation

Planned focus:
- Pending leave/VOT review dashboard
- Approve/deny placeholders
- Staffing impact summaries
- Supervisor notes
- Request history preview


## Schedule Future: Calendar Short Codes

Add admin-editable short codes for dense user-facing calendar and schedule views: VOT, T, SP, SF, VAC, CT, plus custom agency-defined codes.


## Current: Schedule v2.8.0 — Training & Certifications

- Certification tracking.
- Expiration warnings.
- Training status.
- Restriction previews.
- Qualification-aware scheduling foundation.

## Next: Schedule v2.10.0 — Benefit Ledger (current)

Certification tracking, expiration warnings, required qualification rules, and training assignment previews.


## Schedule v2.10.0 — Qualification & Eligibility Engine

Adds optional shift credential requirements and eligibility checks powered by Training & Certifications. Coverage, Open OT, Trades, and Assignments can now preview whether an employee is eligible, warned, or blocked for a qualified role.



## Next Planned Release

### Schedule v2.11.0 — Calendar Shortcode Admin Controls

- Admin add/edit/disable shortcode labels.
- Connect shortcode labels to requests, training, OT, and benefit banks.
- Improve week/month calendar display.
