# Signal Schedule Rule Engine

## Purpose

The rule engine exists so Signal Schedule can support different agencies without hard-coding one workplace, one union contract, or one scheduling culture.

Signal Schedule should not only answer:

```text
Who is working?
```

It should also answer:

```text
Why was this person scheduled, skipped, awarded, denied, mandated, or warned?
```

## Core Rule

Agency rules should be stored as configurable policy records whenever possible, not buried inside page-specific schedule code.

The schedule should be generated and explained from:

```text
agency policy + employees + patterns + events + exceptions + coverage requirements = schedule decision
```

## Why This Matters

Common schedule complaints across public safety, healthcare, manufacturing, retail, and general staffing are usually about fairness and transparency:

- The same people always get weekends.
- The same people always get holidays.
- Mandatory overtime feels unfair.
- Employees do not know why someone else was awarded a shift, vacation block, or overtime opportunity.
- Exceptions are handled informally and are hard to audit.
- Managers need flexibility, but employees need a record of why decisions were made.

The rule engine should turn those decisions into visible, reviewable logic.

## Rule Categories

### Coverage Rules

Examples:

- Minimum staffing by hour
- Minimum staffing by position
- Minimum staffing by location, station, unit, or department
- Required supervisor coverage
- Required certification coverage

### Overtime Rules

Examples:

- Voluntary overtime list
- Equalization by hours
- Equalization by opportunities
- Callback rules
- Holdover rules
- Maximum hours warnings
- Minimum rest warnings

### Mandation Rules

Examples:

- Rotating forced overtime list
- Mandate count tracking
- Last mandated date
- Temporary skip reasons
- Permanent or temporary mandate exemptions
- Admin override with required notes

Example mandate exceptions:

- FMLA
- Part-time
- Light duty
- Probationary status
- Training restriction
- Maximum hours reached
- Contractual restriction
- Manual management exemption

### Benefit Time Rules

Examples:

- Sick time accrues monthly on the first
- Vacation accrues per paycheck
- Personal time is banked annually
- Comp time is earned from worked events
- Seniority tiers change accrual rates
- Carryover limits
- Balance caps
- Expiration rules

### Bidding Rules

Examples:

- Shift bidding
- Vacation bidding
- Overtime bidding
- Bid windows
- Seniority order
- Rounds
- Award publication
- Admin override

### Fairness Rules

Examples:

- Weekend count
- Holiday count
- Overtime hours
- Mandate count
- Callback count
- Denied request count
- Distribution compared to team average

### Qualification Rules

Examples:

- Dispatcher
- Police officer
- Firefighter
- Paramedic
- Nurse
- Supervisor
- Trainer
- Driver/operator
- Forklift certified
- Unit-specific qualification

### Availability and Preference Rules

Examples:

- Cannot work certain days
- Preferred shifts
- School schedule
- Temporary availability window
- Maximum weekly hours
- Minimum rest gap

## Explainability Requirement

Every automated or assisted decision should eventually be able to provide a human-readable explanation.

Examples:

```text
Smith was mandated because Smith was next on the rotation list.
Jones was skipped because Jones has an active FMLA mandate exception through 2026-08-01.
Lee was not eligible because the shift requires Supervisor qualification.
Patel was awarded vacation because Patel had higher seniority in round 2.
Coverage is red from 0900-1300 because minimum staffing is 11 and only 9 eligible employees are scheduled.
```

## Audit Requirement

Rules should leave a record.

Important decisions should be auditable:

- Who made the decision
- What rule was applied
- What employee was affected
- What alternatives were skipped
- Why an override happened
- When the action occurred

## Development Rule

When coding schedule logic, avoid one-off decisions hidden inside UI functions.

Prefer this direction:

```text
policy/rule function
↓
returns decision
↓
returns warning or explanation
↓
UI displays result
```

Do not build the schedule as a spreadsheet that happens to have rules. Build it as a policy-aware staffing engine with calendar views.

## Future Data Concepts

Likely future records:

- agency_policies
- policy_rules
- rule_sets
- employee_exceptions
- benefit_accrual_rules
- benefit_ledger
- mandate_rotation
- mandate_events
- bid_windows
- bid_submissions
- bid_awards
- fairness_metrics
- decision_explanations

These names may change during implementation, but the concept should remain.


## v0.2.0 Implementation Note

The Core Engine Blueprint adds local mock objects for rule profiles, patterns, employee-pattern links, events, benefit ledger entries, coverage requirements, mandate eligibility, and mandate exceptions. These objects exist to keep future coding aligned with the rule-engine direction before database work begins.
