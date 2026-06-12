## v0.17.0 — Goal Mode Foundation

- Added Goal Mode Foundation previews for optimization goals, tradeoffs, recommendations, and audit examples.
- Added goalModeProfiles, goalModeTradeoffs, goalModeRecommendations, and goalModeAuditExamples state arrays.
- Added default Goal Mode sample objects for reducing mandates, improving fairness, maximizing leave approvals, and stabilizing coverage.
- Added Goal Mode renderers and registered them in the guarded render registry.
- Updated the data-model preview to include Goal Mode object counts.
- Fixed the v0.16.0 notification renderer break by adding the missing notification trigger, channel, subscription, and audit render functions.
- Added release validation for safeRender references, registry entries, and function definitions.
- Updated visible Schedule version references and cache-busting to v0.17.0.

## v0.16.0 — Notifications Foundation

- Added Notifications Foundation previews for trigger definitions, delivery channels, audience subscriptions, and audit examples.
- Added notification defaults for coverage shortage alerts, bid award notices, mandate risk warnings, and benefit balance warnings.
- Added notification channel planning for in-app notices, email, SMS/text, and export/audit logs.
- Added notification subscription planning for employee, supervisor, and admin/audit audiences.
- Added notification audit examples for suppressed duplicates, escalations, and acknowledgement/read states.
- Updated render registry and safe render calls for notification panels.
- Updated visible Schedule version references and cache-busting to v0.16.0.
- Preserved v0.15 Analytics Foundation and v0.14.1 render registry protections.

## v0.15.0 — Analytics Foundation

- Added Analytics Foundation previews for metric definitions, report families, trend signals, and forecast planning.
- Added analytics data objects for hours, benefits, overtime/fairness, coverage trends, pay-period summaries, mandation history, benefit ledger reporting, coverage review, weekend load, repeated shortages, benefit burn rate, coverage risk, mandate risk, and benefit liability.
- Updated the guarded render registry with analytics renderers so missing optional analytics panels should not stop the whole page.
- Updated the data-model preview to include Analytics Foundation counts.
- Preserved v0.14.0 Bidding and Opportunity Foundation scope.
- Preserved v0.14.1 render registry repair protections.

## v0.14.1 — Render Registry Repair

- Added missing Mandation Foundation, Mandate Rotation, and Operational Trait preview render functions.
- Changed preview rendering to use a guarded render registry so missing optional renderers cannot stop the entire page from loading.
- Verified all render functions referenced by the render registry exist.
- Verified Schedule script syntax and required DOM IDs.
- Preserved v0.14.0 Bidding and Opportunity Foundation scope.
- No database storage, CRUD workflow, approval workflow, mandation automation, or final schedule generation was added.

## v0.14.0 — Bidding and Opportunity Foundation

- Added Bidding Foundation planning for shift bids, vacation bids, overtime opportunities, eligibility, seniority, fairness, tie breakers, awards, and audit trails.
- Added Voluntary OT Request planning for employee-initiated overtime requests submitted for later review.
- Added Posted OT Opportunity planning for management-created openings employees can volunteer or bid for.
- Added bid award examples and explanation/audit planning.
- Updated Schedule version references and build manifests to v0.14.0.

## v0.13.0 — Mandation Foundation

- Added Mandation Foundation planning for forced overtime rotation, counts, skips, exceptions, and audit history.
- Added mandate rotation preview and mandate rule examples.
- Added operational trait planning, including gender as an employee trait only when tied to documented coverage, safety, legal, or operational rules.
- Reinforced that mandation events add coverage and mandate history; they do not consume vacation or benefit time.
- Updated Schedule version references and build manifests to v0.13.0.

No database storage, real mandate automation, CRUD workflow, approval workflow, or final schedule generation was added.

# Signal Schedule Changelog

## v0.13.0 — Explainability Foundation

- Added Explainability Foundation panels.
- Added Explanation Level Preview for employee-facing, supervisor-facing, and admin/audit explanation detail.
- Added sample explanation examples for mandation, coverage, benefits, seniority, eligibility, and fairness outcomes.
- Added explanation objects to the mock data model and text output.
- Kept v0.11.2 render stability protections so one preview failure should not stop the entire page.
- Updated Schedule version references and cache-busting to v0.13.0.
- No database storage, live automation, approval workflow, CRUD workflow, mandation automation, or final schedule generation was added.

## v0.11.2 — Render Stability and Storage Migration Repair

- Added guarded render calls so one preview panel cannot stop the whole page from loading.
- Added safer event binding so missing optional controls cannot stop setup.
- Updated local storage migration so stale empty/cleared data from older versions does not hide sample employees after an update.
- Verified sample employee loading, Load Sample, and Add Employee behavior in the release package.
- Updated Schedule version references and cache-busting to v0.11.2.

## v0.11.2 — Fairness Engine Foundation

- Added Fairness Engine Foundation panels.
- Added Fairness Snapshot Preview using sample employees.
- Added Seniority Ledger Preview for non-accrual leave and seniority adjustment planning.
- Added planning for OT equalization, mandate counts, weekend/holiday/callback distribution, skipped reasons, and exception history.
- Updated Schedule version references and cache-busting to v0.11.2.
- No database storage, final fairness automation, CRUD workflow, approval workflow, mandation rotation automation, or final schedule generation was added.


## v0.11.2 — Fairness Render Repair

- Fixed a missing `minutesLabel()` helper introduced in v0.11.2.
- Restored page rendering, sample employee loading, and add-employee behavior after the Fairness Snapshot preview stopped the script.
- Updated Schedule version references and cache-busting to v0.11.2.
- No new scheduling logic, database storage, CRUD workflow, approval workflow, mandation automation, or final schedule generation was added.

## v0.10.0 — Schedule Views Foundation

- Added Schedule Views Foundation panels for day, week, month, personal, coverage, and system-inspector views.
- Reframed the current wall of cards as engine-facing/debug-style inspector panels, not the final user experience.
- Added view planning that respects agency settings such as work-week start, time format, date format, events, and coverage rules.
- Added seniority-adjustment planning to employee data so hire date, seniority date, and effective seniority can differ.
- Updated Schedule version references and cache-busting to v0.10.0.


## v0.9.0 — Coverage Engine Foundation

- Added visible Coverage Engine Foundation panels.
- Added Coverage Engine Preview for minimum, target, maximum, shortage, below-target, and overstaffed states.
- Added Open Spot Preview for numbered coverage slots.
- Added coverage rows that compare scheduled staffing against agency coverage requirements by role, time block, location, and qualification.
- Updated text output and warning generation to include coverage engine results.
- Updated Schedule version references and cache-busting to v0.9.0.
- No database storage, coverage CRUD workflow, approval workflow, mandation automation, or final schedule generation was added.

## v0.8.2 — Preview Stabilization and Sample Data Repair

- Restored default sample data when older empty local storage would otherwise render a blank sandbox.
- Preserved the Clear Data action by marking intentionally cleared local data.
- Limited visible rule-warning output so the live page does not become a giant warning wall.
- Updated text export notes from v0.6 wording to v0.8 wording.
- Kept the v0.8 Rule Engine Foundation scope: mock data only, no database or final automation.

# Signal Schedule Changelog

## v0.8.2 — Rule Engine Render Repair

- Fixed a JavaScript render error caused by missing Rule Engine preview render functions.
- Restored sample employee loading and employee add form behavior.
- Added render handlers for Rule Engine principles, Rule Evaluation previews, and Agency Template previews.
- Updated Schedule version references and cache-busting to v0.8.2.
- No new scheduling logic, database storage, or CRUD workflow was added.

## v0.8.0 — Rule Engine Foundation

- Added visible Rule Engine Foundation panels.
- Added Rule Evaluation Preview for policy evaluation examples.
- Added Agency Template Preview for editable industry templates instead of hard-coded modes.
- Added sample rule-engine principles for priority, explainability, audit trail, and templates.
- Added sample rule evaluation examples for mandation, benefit usage, and coverage.
- Fixed event impact wording so mandation events do not incorrectly say they consume vacation minutes.
- Updated Schedule version references to v0.8.0.
- Updated Schedule roadmap, database plan, rule-engine notes, README, HOWTO, root roadmap, root README, master changelog, and build manifests.
- No database storage, editable rule CRUD, real policy automation, approval workflow, mandation rotation automation, or final schedule generation was added.

## v0.7.0 — Benefit Ledger Foundation

- Added visible Benefit Ledger Foundation panels.
- Added Benefit Rule Preview panels.
- Added sample benefit ledger entries for accruals, approved usage, annual banks, and manual adjustments.
- Added sample benefit rules for monthly accrual, per-paycheck accrual, annual bank, and seniority-tier planning.
- Reinforced that benefit balances should be calculated from auditable ledger entries instead of silently overwritten totals.
- No database storage, editable benefit records, payroll integration, approval workflow, automatic accrual processing, or final benefit calculations were added.

## v0.5.0 — Pattern Foundation

- Added visible Pattern Foundation panels.
- Added pattern template previews for B Nights, 2-2-3 Days, and Office 8s with unpaid break.
- Added pattern cycle-day preview with normal work days, off days, and short days.
- Added cycle-based short day planning so short days are not hard-coded to fixed weekdays.
- Added paid minutes and break-rule planning to pattern days.
- Updated week display behavior to respect the Agency Profile work-week start setting.
- Updated Schedule version references to v0.5.0.
- Updated Schedule roadmap, database plan, rule-engine notes, README, HOWTO, root roadmap, root README, master changelog, and build manifests.
- No database storage, pattern CRUD, final schedule generation, event overlays, login, or admin save workflow was added.

# Signal Schedule Changelog

## v0.4.0 — Employee Profile Foundation

### Added

- Added visible Employee Profile Foundation section.
- Added rule-aware employee profile cards and selected employee detail preview.
- Expanded employee mock objects with identity, employee code, hire date, seniority date, department, division, location, position, shift group, assigned pattern placeholder, supervisor placeholder, eligibility flags, exceptions, qualifications, and benefit snapshots.
- Added sample employee profiles that use agency-defined positions, shift groups, qualifications, benefit types, and exception types.

### Changed

- Updated Schedule version references to v0.4.0.
- Updated text output to include Employee Profile Foundation notes.
- Updated docs and planning notes so employee profiles follow agency profile/vocabulary instead of hard-coded assumptions.

### Not Changed

- No employee database was added.
- No login, admin save workflow, employee CRUD, or final schedule automation was added.


## v0.3.0 — Agency Profile Foundation

- Added visible Agency Profile Foundation panels.
- Added sample agency/company settings for industry type, time zone, date format, time format, work week start, pay period type, and pay period start.
- Added sample agency-defined vocabulary for departments, divisions, locations, positions/job titles, shift groups, qualifications, benefit types, and exception types.
- Added sample shift definitions with start time, end time, paid minutes, display label, and break rule.
- Added sample coverage requirement previews with minimum, target, maximum, role, qualification, location, time block, and numbered spot planning.
- Updated Schedule version references to v0.3.0.
- Updated roadmap, database plan, rule-engine notes, README, HOWTO, root roadmap, root README, and master changelog.
- No login, database, admin save workflow, employee profile system, or final schedule automation was added.

## v0.2.1 — Pattern and Coverage Rule Planning

- Rebuilt the lost v0.2.1 docs-only release from the current Signal Labs source.
- Added Rule 0: Store Facts, Not Assumptions.
- Added company profile planning for work week start day, pay period start day, time format, date format, and time zone.
- Added coverage requirement planning for role-based needs, time-block needs, numbered coverage spots, and open/unfilled spots.
- Added pattern enhancement planning for cycle-based short days, short weeks, day-specific shift types, paid minutes, and unpaid break rules.
- Updated visible Schedule version references to v0.2.1 for version consistency.
- No new scheduling features, database storage, login, admin roles, or publishing workflow were added.

## v0.2.0 — Core Engine Blueprint

- Advanced Signal Schedule from a version-consistency maintenance release to a Core Engine Blueprint.
- Updated visible Schedule references, metadata, cache-busting, status text, and text output to v0.2.0.
- Added Core Engine Blueprint UI panels for people, rules, patterns, events, benefits, and coverage.
- Expanded local mock data to include rule profiles, schedule patterns, employee-pattern links, schedule events, benefit ledger entries, coverage requirements, mandate eligibility, and mandate exceptions.
- Updated sample data to demonstrate benefit accrual, vacation events, mandates, and mandate exceptions.
- Updated warnings and text output to reinforce explainability, rule-engine planning, and future PHP/database boundaries.
- Updated home page Schedule card copy so the root page reflects the broader staffing-engine direction.
- No login, database storage, admin roles, publishing workflow, or real automated schedule generation was added.

## v0.1.4 — Version Consistency Update

### Added

- Added Rule 23: Version Consistency to the Signal Labs release standards.
- Added a standing requirement to update user-facing version references whenever a tool version changes.

### Changed

- Updated the Signal Schedule page metadata from v0.1.1 to v0.1.4.
- Updated Schedule CSS and JavaScript cache-busting from v0.1.1 to v0.1.4.
- Updated the Schedule footer version through the shared footer metadata.
- Updated the Schedule status card text to match the current planning and architecture stage.
- Updated plain-text schedule output to show v0.1.4.
- Updated root and Schedule documentation to identify v0.1.4 as the current release.
- Moved the local sandbox cleanup milestone to v0.1.5 so v0.1.4 can remain a maintenance/version alignment release.

### Fixed

- Fixed stale visible Schedule version references that still displayed v0.1.1 after later roadmap releases.
- Preserved local sandbox data by reading older localStorage keys when the new v0.1.4 key is empty.

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