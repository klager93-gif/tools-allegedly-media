# Signal Labs

**Useful tools without the noise.**

Signal Labs is a lightweight tool ecosystem for real-life work, money, planning, and public-safety-adjacent calculations. The project favors practical tools, clear outputs, portable architecture, and release discipline.

## Active Tools

| Tool | Current Status | Notes |
|---|---:|---|
| Home | v0.9.9.6 | Public landing page and shared navigation entry point. |
| Paycheck Calculator | v0.9.9 | Active calculator. Report and metadata cleanup with Weekly OT behavior preserved. |
| Overtime Calculator | Active | Frozen for feature work unless critical fixes or shared-pattern syncs are needed. |
| Time Off Calculator | Active | Leave/time-off planning tool. |
| Signal Schedule — v1.7.0 Postgres Connection + Employee Read Endpoint
| Pay Planner | v0.1.x | Unlisted incubator page for future pay goal planning. |

## Ecosystem Direction

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

## Project Standards

Signal Labs follows the project standards stored in `STANDARDS.md`.

Key rules include:

- Files do not lie.
- Foundation before features.
- Build complete systems, not demos.
- Shared component changes are system-wide dependency changes.
- Backend portability is required.
- Tools own their infrastructure.
- Whole-site or multi-tool releases must validate referenced assets before packaging.

## Backend Direction

Signal Schedule is the current backend-planning driver.

Preferred future path:

```text
GitHub
  ↓
Coolify
  ↓
API service
  ↓
Postgres
```

Required architecture boundary:

```text
UI
  ↓
Services
  ↓
Repositories
  ↓
Adapters
  ↓
Backend
```

Supported adapter targets remain:

- Static JSON
- Postgres
- MySQL
- Cloudflare D1

## Repository Notes

- Root-level documentation describes the whole Signal Labs ecosystem.
- Tool-specific documentation belongs inside each tool folder.
- Schedule-specific backend/API planning belongs inside `/schedule/`.
- Root-level infrastructure additions require explicit justification.

## Current Coordinated Recovery Scope

This repository state includes cleanup for:

- Paycheck v0.9.9 documentation integrity
- Signal Schedule — v1.7.0 Postgres Connection + Employee Read Endpoint
- Root README recovery
- Rule 26 asset validation repair
- Pay Planner incubator asset restoration

No calculator math changes, live database writes, CRUD, authentication, or production backend connections are included in this recovery scope.
