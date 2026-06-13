# Build Manifest

Release Title: Schedule v2.9.0 — Qualification & Eligibility Engine
ZIP Filename: signal-schedule-v2.9.0-qualification-eligibility-engine.zip
Build Date: 2026-06-13
Replace Scope: Entire repository root

## Files Modified

- `ADMIN_CHANGELOG.md`
- `MASTER-CHANGELOG.md`
- `PUBLIC_CHANGELOG.md`
- `README.md`
- `ROADMAP.md`
- `schedule/CHANGELOG.md`
- `schedule/README.md`
- `schedule/ROADMAP.md`
- `schedule/assignments.html`
- `schedule/coverage.html`
- `schedule/employees.html`
- `schedule/index.html`
- `schedule/leave.html`
- `schedule/open-shifts.html`
- `schedule/reports.html`
- `schedule/schedule-nav.css`
- `schedule/schedule.html`
- `schedule/script.js`
- `schedule/seniority.html`
- `schedule/settings.html`
- `schedule/shift-trades.css`
- `schedule/shift-trades.js`
- `schedule/staffing.html`
- `schedule/trades.html`
- `schedule/training.css`
- `schedule/training.html`
- `schedule/training.js`

## Files Added

- `schedule/RELEASE-v2.9.0-Qualification-Eligibility-Engine.md`
- `schedule/adapters/JsonShiftEligibilityAdapter.js`
- `schedule/api/contracts/shift-eligibility.read.schema.json`
- `schedule/api/coolify/sql/015_shift_eligibility_foundation_schema.sql`
- `schedule/data/shift-eligibility-preview.json`
- `schedule/eligibility.css`
- `schedule/eligibility.html`
- `schedule/eligibility.js`
- `schedule/repositories/ShiftEligibilityRepository.js`
- `schedule/services/ShiftEligibilityService.js`

## Files Removed

None.

## Validation

- JavaScript syntax checks passed.
- Eligibility page added and navigation updated.
- Schedule-owned infrastructure remains inside `/schedule/`.
- No root-level Schedule infrastructure folders.
- Package excludes `.git`, `.DS_Store`, `._*`, `__MACOSX`, and `node_modules`.
