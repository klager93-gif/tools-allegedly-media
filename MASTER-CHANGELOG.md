## Signal Schedule v0.11.1 — Fairness Engine Foundation

- Added Fairness Engine Foundation planning.
- Added fairness metric previews for overtime, mandates, weekends, holidays, callbacks, and seniority.
- Added seniority-ledger planning so hire date, seniority date, and effective seniority can differ.
- Updated Schedule visible version references to v0.11.1.

## Signal Schedule v0.10.0 — Schedule Views Foundation

- Added schedule view planning for day, week, month, personal, coverage, and system-inspector views.
- Added seniority-adjustment planning to employee data.
- Reframed current card panels as temporary engine/debug previews.

## Signal Schedule v0.9.0 — Coverage Engine Foundation

- Added Coverage Engine Foundation preview panels.
- Added minimum, target, and maximum coverage evaluation by role, time block, location, qualification, and day.
- Added open spot preview for numbered coverage slots.
- Added shortage, below-target, and over-maximum status output.
- Updated Schedule version references and cache-busting to v0.9.0.

## Signal Schedule v0.8.2 — Preview Stabilization and Sample Data Repair

- Repaired default sample loading after stale/empty local storage could hide sample employees and assignments.
- Limited live rule-warning output to keep the page usable.
- Updated Schedule preview wording and build metadata to v0.8.2.

# Master Changelog

## Signal Schedule v0.8.2 — Rule Engine Render Repair

- Fixed missing Rule Engine preview render functions that stopped page rendering after v0.8.0.
- Restored sample employee loading and employee add form behavior.
- No database, schedule automation, or CRUD workflow was added.

## 2026-06-11 — Signal Schedule v0.8.2 Rule Engine Foundation

- Added visible Rule Engine Foundation, Rule Evaluation Preview, and Agency Template Preview panels to the Schedule sandbox.
- Added sample rule-engine principles for priority, explainability, audit trail, and editable industry templates.
- Added sample evaluation examples for mandation, benefit usage, and coverage outcomes.
- Fixed event impact wording so mandation events do not incorrectly show vacation-benefit consumption.
- Updated text output, Schedule docs, root planning docs, changelog, database plan, rule-engine notes, and build manifests.
- No database, editable rule CRUD, real policy automation, approval workflow, mandation rotation automation, or final schedule generation was added.

## 2026-06-11 — Signal Schedule v0.7.0 Benefit Ledger Foundation

- Added visible Benefit Ledger Foundation and Benefit Rule Preview panels to the Schedule sandbox.
- Added sample benefit ledger entries for accruals, approved usage, annual banks, and manual adjustments.
- Added sample benefit rules for monthly accrual, per-paycheck accrual, annual bank, and seniority-tier planning.
- Reinforced that benefit balances should be calculated from auditable ledger entries instead of silently overwritten totals.
- No database, editable benefit records, payroll integration, approval workflow, automatic accrual processing, or final benefit calculations were added.

## 2026-06-11 — Signal Schedule v0.5.0 Pattern Foundation

- Added visible Pattern Foundation and Pattern Cycle Preview panels to the Schedule sandbox.
- Added sample pattern templates for B Nights, 2-2-3 Days, and Office 8s with an unpaid break.
- Added cycle-day modeling for normal work days, off days, and short days.
- Added paid minutes and break-rule planning to support non-public-safety schedules.
- Updated week display behavior to follow Agency Profile work-week start settings.
- Updated Schedule docs, root planning docs, changelog, database plan, rule-engine notes, and build manifests.
- No database, pattern CRUD, login, admin save workflow, event overlays, or final schedule generation was added.

## 2026-06-11 — Signal Schedule v0.4.0 Employee Profile Foundation

- Added visible Employee Profile Foundation panels to the Schedule sandbox.
- Added rule-aware employee mock objects using agency-defined vocabulary from v0.3.
- Added sample identity, agency assignment, eligibility flags, exceptions, qualifications, and benefit snapshots.
- Added employee profile cards and selected employee detail preview.
- No employee database, login, admin save workflow, CRUD, or final schedule automation was added.

## 2026-06-11 — Signal Schedule v0.3.0 Agency Profile Foundation

- Added visible Agency Profile Foundation panels to the Schedule sandbox.
- Added agency/company profile sample data for settings, vocabulary, shift definitions, and coverage requirements.
- Added coverage minimum, target, maximum, and numbered spot planning.
- Updated Schedule docs and root planning docs to make Agency Profile the source for future employee profiles and rule-engine behavior.
- No database, login, employee profile CRUD, or final schedule automation was added.

## 2026-06-11 — Signal Schedule v0.2.1 Pattern and Coverage Rule Planning

- Rebuilt the lost v0.2.1 docs-only Schedule release from the current Signal Labs source.
- Added Rule 0 planning: Store Facts, Not Assumptions.
- Added company profile planning for work week starts on, pay period starts on, time format, date format, and time zone.
- Added coverage planning for role-based needs, time-block needs, numbered spots, and open/unfilled spots.
- Added pattern planning for cycle-based short days, short weeks, day-specific shift types, paid minutes, and unpaid break rules.
- No new schedule UI, database, login, or backend behavior was added.

# Master Changelog

## 2026-06-11 — Signal Labs Home v0.9.9.6 Release Archive Standard

### Added

- Added Rule 25: Build Response Standard.
- Added Rule 26: Release Archives Are Backups.
- Added release archive restore guidance to `docs/BACKUP.md` and `docs/RESTORE.md`.

### Changed

- Retired duplicate normal backup-folder workflow in favor of complete release ZIP archives stored in dated `Releases/` folders.
- Updated Home/public page visible version references and shared asset cache references to v0.9.9.6.
- Updated workflow standards so Nuclear Option comparisons use the last release ZIP instead of a duplicate backup folder.

### Not Changed

- No calculator or scheduling functionality changed.
- No database, login, admin, or publishing system was added.


## 2026-06-11 — Signal Schedule v0.2.0 Core Engine Blueprint

- Advanced Signal Schedule from a local schedule sandbox toward a core staffing-engine blueprint.
- Added visible blueprint panels for people, rules, patterns, events, benefits, and coverage.
- Expanded local mock data to include future database-shaped objects without adding backend storage.
- Updated Schedule page status, cache-busting, text output, home page card copy, and documentation to v0.2.0.
- Preserved the architecture rule that schedules should be generated from pattern + start date + events + overrides rather than hard-coded forever.
- No login, PHP/database storage, publishing workflow, or final automation was added.

## 2026-06-11 — Signal Schedule v0.1.4 Version Consistency Update

### Added

- Added Rule 23: Version Consistency to release standards.
- Added a formal requirement that user-facing version references must be updated during each release.

### Changed

- Updated Signal Schedule page metadata, footer version, status text, cache-busting, and text output version to v0.1.4.
- Updated root and Schedule documentation to identify v0.1.4 as the current release.
- Moved the previously planned local sandbox cleanup milestone to v0.1.5.

### Fixed

- Fixed stale visible Schedule version references that still showed v0.1.1 after later documentation releases.
- Preserved older local sandbox data by adding old localStorage key fallback support.

## 2026-06-11 — Signal Schedule v0.1.3 Rule Engine and Agency Policy Planning

### Added

- Added Schedule rule-engine planning so future schedule logic can support multiple agency types and explain why decisions were made.
- Added `schedule/RULE-ENGINE.md`.
- Expanded Schedule database planning for agency policies, benefit accrual, mandate rotation, mandate exceptions, bidding, fairness metrics, qualifications, and decision explanations.

### Changed

- Reframed Schedule as a policy-aware staffing engine with calendar views instead of a calendar-first or dispatch-only tool.
- Updated root roadmap and Schedule docs to preserve the rule-engine direction before the next coding pass.

# Signal Labs Master Changelog

## v0.9.9.6 / Signal Schedule v0.1.2 — Roadmap and Architecture Planning

**Date:** 2026-06-11  
**Type:** Documentation / planning release

### Added

- Expanded Signal Schedule roadmap around local sandbox cleanup, date-based scheduling, month view, schedule patterns, rotations, time off conflicts, publishing, and future backend work.
- Expanded `schedule/DATABASE-PLAN.md` with pattern, override, schedule period, shift swap, notification, and audit log planning.
- Added the architecture rule that future schedules should be generated from pattern + start date + overrides instead of storing every future day forever.

### Changed

- Reframed Signal Schedule as a small scheduling application rather than a single-page spreadsheet replacement.
- Updated `schedule/README.md`, `schedule/ROADMAP.md`, `schedule/DATABASE-PLAN.md`, `schedule/HOWTO.md`, root `ROADMAP.md`, and Schedule changelog.

### Fixed

- Confirmed `/schedule/` already had documentation files and avoided creating duplicates.

## v0.9.9.5 / Signal Schedule v0.1.1 — Logic Sandbox

**Date:** 2026-06-11  
**Type:** Feature refinement

### Added

- Added employee role selection to Signal Schedule.
- Added minimum staffing requirement per shift.
- Added sandbox rules for max weekly hours and minimum rest gap between shifts.
- Added coverage, weekly-hour, and rest-gap warnings.
- Added plain-text schedule output with copy support.
- Added rough month planning preview.
- Added `schedule/DATABASE-PLAN.md` for future PHP/database planning.

### Changed

- Reframed Signal Schedule as a logic-first sandbox before full UI/backend expansion.
- Updated Schedule documentation to clarify temporary local-storage status.
- Updated Schedule roadmap around month view, date-based assignments, and later PHP/backend work.

### Fixed

- Reduced risk of overbuilding temporary UI before schedule rules are proven.
- Clarified that future employees and login users should be modeled separately.

## v0.9.9.4 / Signal Schedule v0.1.0 — Schedule Tool MVP

**Date:** 2026-06-11  
**Type:** Feature release

### Added

- Added `/schedule/` as Signal Schedule v0.1.0.
- Added employee, shift, assignment, weekly board, local save, coverage summary, sample data, clear, and print actions.
- Added schedule-specific README, HOWTO, CHANGELOG, and ROADMAP docs.
- Added missing shared `assets/components/header.js` and `assets/global.js`.

### Changed

- Added Signal Schedule to the home tool grid.
- Added Schedule to shared navigation.
- Updated shared footer route handling for `/schedule/`.
- Synced shared asset cache references to `v0.9.9.4`.

### Fixed

- Restored missing shared global assets from the baseline.
- Updated stale `assets/global.css` version header.
- Fixed mixed cache-busting versions introduced during the Schedule build.


## Home v0.9.9.3 + Paycheck v1.0.3 — Global Footer Recovery

**Date:** 2026-06-11  
**Type:** Corrective release

### Changes

- Recovered styled footer for all migrated shared-footer pages.
- Updated Home/public pages to `v0.9.9.3`.
- Updated Paycheck to `v1.0.3` for footer recovery sync.
- Updated Pay Planner to `v0.1.1` for footer recovery sync.
- Added Global Change Rule to Standards v2.0.
- Preserved Overtime and Time Off unchanged.

### Notes

No calculator logic changes.


## Signal Schedule v0.11.1 — Fairness Render Repair

Fixed a missing fairness preview helper that stopped Schedule rendering and restored sample employee/add employee behavior.
