# Signal Schedule

Signal Schedule is a scheduling and staffing tool for Signal Labs.

## Version

v0.3.0 — Agency Profile Foundation.

## Current Purpose

This release adds the Agency Profile Foundation. Signal Schedule remains browser-only and local-storage based, but the mock data now includes an agency/company profile with configurable settings, custom vocabulary, shift definitions, and coverage requirement examples.

## What it does now

- Add employees with basic roles
- Track starter employee model fields such as status, mandate eligibility, exceptions, and benefit balances
- Add reusable shifts with start/end times
- Set minimum staff per shift
- Assign people to days and shifts
- Show a weekly schedule board
- Show a Core Engine Blueprint panel
- Show an Agency Profile Foundation panel
- Preview agency-defined settings, vocabulary, shift definitions, and coverage requirements
- Preview sample rule, pattern, event, and benefit-ledger objects
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
People + Rules + Patterns + Events + Coverage + Explanations
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
