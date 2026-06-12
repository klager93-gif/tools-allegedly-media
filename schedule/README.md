# Signal Schedule

Signal Schedule is a scheduling and staffing tool for Signal Labs.

## Version

v0.6.0 — Event Foundation.

## Current Purpose

This release adds the Event Foundation. Signal Schedule remains browser-only and local-storage based, but the mock data now includes behavior-aware event definitions and schedule events that can remove, add, modify, or explain expected pattern work.

## What it does now

- Add employees with basic roles
- Track starter employee model fields such as status, mandate eligibility, exceptions, and benefit balances
- Add reusable shifts with start/end times
- Set minimum staff per shift
- Assign people to days and shifts
- Show a weekly schedule board
- Show a Core Engine Blueprint panel
- Show an Agency Profile Foundation panel
- Show an Employee Profile Foundation panel
- Show Pattern Foundation and Pattern Cycle Preview panels
- Show Event Foundation and Event Behavior Preview panels
- Preview agency-defined settings, vocabulary, shift definitions, and coverage requirements
- Preview employee identity, agency assignment, eligibility, exceptions, qualifications, and benefit snapshots
- Preview sample rule, pattern, event type, schedule event, and benefit-ledger objects
- Calculate estimated scheduled hours
- Show coverage warnings
- Show max-hours warnings
- Show rest-gap warnings
- Show mandate-exception model warnings
- Generate plain-text core-engine output
- Show a rough month planning preview
- Save data locally in the browser

## Core Model

Signal Schedule should continue to be built around this model:

```text
Agency Profile + Employee Profiles + Rules + Patterns + Events + Coverage + Explanations
```

The schedule is a view into the staffing engine. It should not become the entire system.

## Future Model

Signal Schedule should eventually separate these concepts:

- Agencies
- Agency policy rules
- Employees
- Users
- Roles and permissions
- Shifts
- Schedule patterns
- Employee pattern assignments
- Schedule events
- Time off
- Benefit time and accrual ledgers
- Availability
- Qualifications and certifications
- Overtime
- Mandation and mandate exceptions
- Bidding
- Manual overrides
- Coverage requirements
- Fairness metrics
- Decision explanations
- Published schedule periods
- Audit logs

## Important Limitation

This version still uses browser local storage. It is temporary by design. Future versions should move to a PHP/database model after the schedule logic is clearer.

See `ROADMAP.md` for version planning, `DATABASE-PLAN.md` for backend planning notes, and `RULE-ENGINE.md` for the rule-engine planning guide.


## v0.2.1 Planning Focus

Signal Schedule v0.2.1 is a docs-only planning release that preserves key architecture decisions before more UI or backend work is added.

It adds planning for:

- Rule 0: Store Facts, Not Assumptions.
- Company profile settings such as work week start, pay period start, time format, date format, and time zone.
- Coverage requirements by role, time block, numbered spots, and open/unfilled spots.
- Pattern enhancements such as cycle-based short days, short weeks, day-specific shift types, paid minutes, and unpaid break rules.


## v0.3.0 Agency Profile Foundation

Signal Schedule v0.3.0 adds the first visible agency/company profile model. This defines the organization before employee profiles are added.

Agency profile planning includes:

- Agency/company name.
- Industry type.
- Time zone.
- Date format.
- Time format.
- Work week starts on.
- Pay period type and start day.
- User-defined departments, divisions, and locations.
- User-defined positions/job titles.
- User-defined shift groups.
- User-defined qualifications.
- User-defined benefit types.
- User-defined exception types.
- Shift definitions with start time, end time, paid minutes, display label, and break rule.
- Coverage requirements with minimum, target, maximum, role, qualification, location, time block, and optional numbered spots.

The goal is to avoid hard-coded dispatch-only assumptions. Public safety, nursing, manufacturing, retail, office, and custom organizations should be supported through templates and agency-defined vocabulary, not separate hard-coded modes.


## v0.4.0 Employee Profile Foundation

Signal Schedule v0.4.0 adds the first visible employee profile model. Employees are treated as rule-aware objects, not just rows on a schedule.

Employee profile planning includes:

- Identity fields such as name, employee ID, hire date, seniority date, status, and color/label.
- Agency assignment fields such as department, division, location, position/title, shift group, assigned pattern placeholder, and supervisor.
- Eligibility flags for overtime, mandation, trades, shift bids, vacation bids, and benefits.
- Rule-impacting exceptions such as FMLA, part-time, light duty, no mandation, training-only, and temporary restrictions.
- Qualifications and capabilities such as calltaking, radio, trainer, supervisor, forklift, paramedic, RN, cashier, manager, or agency-defined custom values.
- Benefit snapshots for display only. Future benefit balances should come from the benefit ledger.

v0.4.0 does not add employee database storage, admin editing, login accounts, or employee CRUD.


## v0.5.0 Pattern Foundation

Signal Schedule v0.5.0 adds visible pattern planning before schedule generation. Patterns are modeled as cycle-based objects with normal work days, off days, short days, paid minutes, and break rules.

This release also corrects the week display philosophy so previews should follow the agency profile work-week start setting instead of assuming Monday-first display.

v0.5.0 does not add database persistence, admin editing, final schedule generation, or editable pattern CRUD.


## v0.6.0 Event Foundation

Signal Schedule v0.6.0 adds visible event planning before final schedule generation. Events are modeled as objects that modify expected pattern work.

Sample event categories include:

- Vacation
- Sick
- Overtime
- Mandation
- Training
- Trades
- Callback
- Administrative leave

Event behavior planning includes:

- removes from coverage
- adds to coverage
- changes role
- changes pay
- uses benefit time
- requires approval
- requires audit trail

v0.6.0 does not add database persistence, event CRUD, approval workflows, benefit automation, mandation rotation, trade workflow, or final schedule generation.
