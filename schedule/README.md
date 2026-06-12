# Signal Schedule

Signal Schedule is a scheduling and staffing tool for Signal Labs.

## Version

v0.2.1 — Pattern and Coverage Rule Planning.

## Current Purpose

This release moves Signal Schedule from a basic schedule-page sandbox toward a small staffing-engine model. It remains browser-only and local-storage based, but the mock data now mirrors future backend concepts: people, rules, patterns, events, benefit ledgers, coverage requirements, and generated schedule output.

## What it does now

- Add employees with basic roles
- Track starter employee model fields such as status, mandate eligibility, exceptions, and benefit balances
- Add reusable shifts with start/end times
- Set minimum staff per shift
- Assign people to days and shifts
- Show a weekly schedule board
- Show a Core Engine Blueprint panel
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
