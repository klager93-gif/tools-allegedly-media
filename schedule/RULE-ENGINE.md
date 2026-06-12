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

## Rule 0: Store Facts, Not Assumptions

Signal Schedule should store the facts that describe work, time, people, rules, and events. It should not store only a formatted schedule cell or a final outcome when the underlying facts matter.

Examples:

- Store `17:00`, not only `5 PM`.
- Store `480 paid minutes`, not only `8 hours`.
- Store `30-minute unpaid break`, not only `7A-3:30P`.
- Store the event type and reason, not only a colored calendar block.
- Store policy rules and explanations, not hidden one-off logic.

Preferred flow:

```text
facts + rules + events = calculated outcome + explanation + display
```

### Company Profile Rules

Agency/company profile settings should eventually include:

- work week starts on
- pay period starts on
- time format
- date format
- time zone

These profile settings should feed overtime, reporting, coverage, pattern generation, display formatting, and benefit accrual calculations.

### Coverage Rule Planning

Coverage rules should eventually define:

- needed role / qualification
- needed time block
- numbered coverage spots where applicable
- open or unfilled spots
- shortage and surplus explanations

### Pattern Rule Planning

Pattern rules should eventually support:

- cycle-based short days
- short weeks
- day-specific shift types
- paid minutes
- unpaid break rules
- pattern-level exceptions
- employee-specific pattern variations

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


## v0.3.0 Agency Profile Rule Source

Agency Profile becomes the source of organization-specific vocabulary and default rule inputs. Future rules should read from agency settings instead of assuming a dispatch, police, fire, nursing, manufacturing, retail, or office workflow.

Agency profile rule inputs include:

- Time zone.
- Date format.
- Time format.
- Work week start day.
- Pay period type and start day.
- User-defined positions/job titles.
- User-defined qualifications.
- User-defined benefit types.
- User-defined exception types.
- Shift definitions and paid minutes.
- Break rules.
- Coverage minimums, targets, and maximums.

Industry templates may prefill these values, but agencies must be able to edit them. Templates are shortcuts, not hard-coded modes.


## v0.4.0 Employee Rule Source

Employee profiles become a primary input to future rule decisions. Rules should evaluate employee facts instead of relying on schedule-row text.

Examples:

- Mandation rules should evaluate mandate eligibility and active exceptions.
- Coverage rules should evaluate qualifications and position assignment.
- Bidding rules should evaluate seniority date and bid eligibility.
- Benefit rules should evaluate benefit eligibility and ledger history.
- Fatigue rules should evaluate scheduled events and employee assignment history.

Employee profiles should use agency-defined vocabulary from the Agency Profile Foundation. Titles, departments, qualifications, benefit types, and exception types should be configurable values, not hard-coded public safety assumptions.


## v0.5.0 Pattern Rules

Pattern rules should derive from agency profile and pattern facts.

Key principles:

- Week display order comes from agency profile work_week_starts_on.
- Time display comes from agency profile time format.
- Paid hours come from paid minutes and break rules, not start/end assumptions.
- Short days can be cycle-based and should not be assumed to occur on a fixed weekday.
- Patterns describe normal expectations; future events explain deviations.


## v0.7.0 Event Rules

Events are rule-aware facts that change expected pattern work.

An event should be able to describe whether it:

- removes an employee from coverage
- adds an employee to coverage
- changes an employee role or assignment
- changes pay classification
- uses benefit time
- requires approval
- requires audit history

Examples:

- Vacation removes from coverage, uses benefit time, requires approval, and requires audit history.
- Overtime adds to coverage, changes pay, and requires audit history.
- Mandation adds forced overtime coverage and should link to mandate rotation history later.
- Training may change role or remove someone from normal coverage.
- Trades change who fills the assignment and require approval/audit history.

Future rule-engine behavior should evaluate events together with patterns, agency policies, employee exceptions, coverage requirements, and benefit ledgers.

## v0.7.0 — Benefit Ledger Foundation

Signal Schedule v0.7.0 adds benefit ledger planning. Benefit balances should be derived from auditable ledger entries rather than overwritten as silent totals.

Planned benefit ledger concepts include:

- Benefit types such as vacation, sick, personal, comp time, holiday, and custom agency-defined banks.
- Accrual entries such as monthly accruals, per-paycheck accruals, annual banks, and seniority-tier accruals.
- Usage entries created from approved time-off events.
- Manual adjustment entries with reasons and sources.
- Projected balance planning for future dates.
- Audit history so every balance change can answer why it happened.

v0.7.0 does not add database persistence, editable benefit records, payroll integration, approval workflow, automatic accrual processing, or final benefit calculations.

