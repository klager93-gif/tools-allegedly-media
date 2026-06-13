# Signal Labs Tools

**Current package:** Full Root Cleanup + Schedule v2.4.0 — Overtime Opportunity Board Foundation

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
