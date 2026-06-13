## Schedule v2.16.0 — Roles & Permissions Engine

Adds the Roles & Permissions Engine foundation for agency-controlled view, edit, approve, delete, override, and export access.

## Schedule v2.16.0 — Supervisors & Organizational Hierarchy

- Added supervisor hierarchy preview.
- Added hybrid supervisor scope by employee, group, position, department, division, and location.
- Added SQL migration 021 supervisor hierarchy.

# Schedule v2.14.0 — Employee Timeline & Audit Trail

Current Schedule release adds employee profile self-service controls and overview live-feature cleanup.

Database migration required after upload: `019_employee_profile_self_service_schema.sql`.

## Schedule v2.12.0 — Calendar Views + Schedule Footer

- Adds user-facing week and day calendar views.
- Adds Schedule-specific footer across /schedule/ pages.
- Adds Calendar View foundation files and fixes overview version drift.

# Signal Labs Tools

**Current package:** Full Root Cleanup + Schedule v2.5.0 — Overtime Opportunity Board Foundation

This repository contains the Signal Labs tool set, including Schedule, Paycheck, Overtime, Time Off, Pay Planner, and shared site assets.

## Current Schedule release included in this package

**Schedule v2.4.0** adds the Overtime Opportunity Board foundation for posted overtime opportunities, slot counts, qualification tags, volunteer/VOT matching preview, seniority/eligibility review, and admin award preview.

## Root cleanup included in this package

This package is safe for full-root replacement because Schedule-specific infrastructure is contained inside `schedule/` instead of being duplicated at the repository root.

Moved/contained under `schedule/`:

- `schedule/adapters/`
- `schedule/api/`
- `schedule/data/`
- `schedule/repositories/`
- `schedule/services/`

The repository root keeps only true site/shared items such as `index.html`, `assets/`, public info pages, standards, and individual tool folders.

## Schedule pages

- `schedule/index.html` — foundation/admin overview
- `schedule/schedule.html` — calendar preview
- `schedule/employees.html` — employees placeholder/foundation page
- `schedule/assignments.html` — assignments placeholder/foundation page
- `schedule/staffing.html` — minimum staffing foundation page
- `schedule/leave.html` — leave request foundation page
- `schedule/open-shifts.html` — overtime opportunity board foundation page
- `schedule/reports.html` — reports placeholder/foundation page
- `schedule/settings.html` — settings placeholder/foundation page

## Production status

Schedule remains an active-development prototype. The current UI is read-only/preview-oriented for most advanced modules. Employee write routes in the API skeleton remain protected and disabled unless intentionally enabled with environment variables.


## Standards v3.0

Signal Labs now uses consolidated development standards with required release handoff sections, single-source naming, tool-owned infrastructure, and package validation rules.


## Schedule v2.10.0 — Benefit Ledger

Adds optional shift credential requirements and eligibility checks powered by Training & Certifications. Coverage, Open OT, Trades, and Assignments can now preview whether an employee is eligible, warned, or blocked for a qualified role.



## Schedule v2.11.0 — Calendar Shortcode Admin Controls

Adds admin-managed compact calendar codes and database migration tracking guidance. After uploading v2.11.0, run migrations 004 through 017 in order.
