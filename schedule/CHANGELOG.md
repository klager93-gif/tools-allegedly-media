# Signal Schedule Changelog

## v0.1.3 — Rule Engine and Agency Policy Planning

### Added

- Added `RULE-ENGINE.md` as a standing architecture guide for future schedule logic.
- Added rule-engine planning for coverage, overtime, mandation, benefit accrual, bidding, fairness, qualifications, availability, audit history, and explainable decisions.
- Added mandate rotation planning with mandate counts, skip reasons, exceptions, and admin override notes.
- Added benefit time planning with accrual rules, agency policy flexibility, and auditable ledger records.
- Added future support concepts for agency types beyond dispatch, including police, fire, EMS, nursing, hospitals, manufacturing, retail, and general shift-based companies.
- Expanded database planning with agencies, policy rules, schedule events, coverage requirements, qualifications, employee exceptions, benefit tables, mandate tables, bidding tables, fairness metrics, and decision explanations.

### Changed

- Reframed Signal Schedule as a policy-aware staffing engine with calendar views, not a calendar-first or dispatch-only app.
- Moved fairness, transparency, and explainability into the core roadmap.
- Bumped the next sandbox cleanup work to v0.1.4 so v0.1.3 can remain a documentation/planning release.

### Fixed

- Reduced the risk of hard-coding one agency's rules into future schedule logic.
- Added a standing reminder that schedule UI should display rule results, not hide business logic inside page-specific UI code.

## v0.1.2 — Roadmap and Architecture Planning

### Added

- Expanded the Schedule roadmap around employees, shifts, schedule patterns, overrides, time off, month view, publishing, and backend planning.
- Expanded the database plan with schedule patterns, employee pattern assignments, overrides, schedule periods, shift swap requests, notifications, and audit logging.
- Added the architecture rule that future schedules should be generated from pattern + start date + overrides instead of storing every future day forever.

### Changed

- Reframed Signal Schedule as a small scheduling application rather than a single-page schedule builder.
- Clarified that the next coding phase should continue testing local logic before committing to PHP/database tables.
- Updated README direction to match the larger scheduling roadmap.

### Fixed

- Avoided creating duplicate roadmap files because `/schedule/` already had README, HOWTO, CHANGELOG, ROADMAP, and DATABASE-PLAN documents.

## v0.1.1 — Logic Sandbox

### Added

- Added prototype notice explaining that the tool is still temporary.
- Added employee role selection.
- Added minimum staff needed per shift.
- Added sandbox rules for max weekly hours and minimum rest gap between shifts.
- Added rule warnings for understaffed shifts.
- Added rule warnings for employees exceeding weekly hour limits.
- Added rule warnings for short rest gaps between shifts.
- Added estimated total scheduled hours.
- Added plain-text schedule output.
- Added copy text output action.
- Added rough month planning preview.
- Added `DATABASE-PLAN.md` for future PHP/database planning.

### Changed

- Repositioned Signal Schedule as a logic-first sandbox instead of a polished final app.
- Updated sample data to trigger useful coverage and hour warnings.
- Updated local storage key to `signalSchedule.v0.1.1` while still reading v0.1.0 data when available.
- Updated Schedule README, HOWTO, and ROADMAP.

### Fixed

- Reduced risk of overbuilding UI before the schedule model is clear.
- Clarified that employees and login users should become separate future data concepts.

## v0.1.0 — Initial Working Schedule Builder

### Added

- New `/schedule/` tool.
- Employee creation.
- Shift creation with start and end times.
- Weekly assignment builder.
- Seven-day schedule board.
- Coverage summary cards.
- Sample data loader.
- Clear schedule action.
- Print-friendly schedule layout.
- Browser local storage saving.

### Changed

- Added Signal Schedule to the home tool grid.
- Added Schedule to the shared navigation.
- Updated shared footer routing to support `/schedule/`.

### Fixed

- Restored missing shared `header.js` reference.
- Restored missing shared `global.js` reference.
- Updated stale global CSS version header.
