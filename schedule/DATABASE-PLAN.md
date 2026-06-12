# Signal Schedule Database Plan

## v0.11.2 Fairness Engine Notes

Future persistence should support fairness as history, not manually edited totals. Potential tables include:

- fairness_snapshots
- overtime_history
- mandate_history
- callback_history
- weekend_holiday_counts
- seniority_ledger
- fairness_explanations

Hire date, seniority date, and effective seniority should remain separate concepts. Effective seniority should be calculated from auditable ledger entries when agency policy requires it.

# Signal Schedule Database Plan

## v0.10.0 Schedule Views Foundation Notes

Schedule views should not own schedule data. Day, week, month, personal, coverage, and system-inspector views should all read from the same underlying facts: agency settings, employees, patterns, events, benefits, rules, and coverage requirements.

Future data objects should include view preferences, but the database should store facts separately from presentation.

### Seniority adjustment planning

Employee data should eventually separate hire date, base seniority date, and effective seniority. A future `seniority_ledger` or `seniority_adjustments` table should preserve leave periods, break-in-service records, suspensions, or other non-accrual periods instead of silently overwriting seniority dates.


# Signal Schedule Database Plan

## Status

Planning document for the future PHP/database version. Signal Schedule v0.9.0 remains local-first and does not create database tables yet, but the sandbox now mirrors the future core engine objects.


## v0.9.0 Coverage Engine Foundation Notes

Coverage requirements should eventually be stored as rule-aware records, not hard-coded schedule text.

Future records should support:

- agency or location;
- role or position required;
- qualification required;
- start and end time;
- applicable days;
- minimum staffing;
- target staffing;
- maximum staffing;
- numbered spots when the agency wants assignable coverage seats;
- open/unfilled spot status;
- explanation and audit trail for overrides.

The v0.9.0 sandbox only previews these concepts with local mock data.

## Core Rule

Do not confuse employees with users.

- An employee is someone who appears on the schedule.
- A user is someone who can log in.
- One person may be both, but the tables should remain separate.

## Architecture Rule

Do not store every future schedule day forever unless it has been manually changed or published.

The preferred model is:

```text
pattern + start date + employee assignment + events + overrides = generated schedule
```

This keeps recurring schedules flexible while still allowing real-world corrections.

## Rule Engine Rule

Agency rules should be configurable policy records when possible, not hidden inside one-off schedule page code.

The preferred decision model is:

```text
agency policy + employees + patterns + events + exceptions + coverage requirements = schedule decision + explanation
```

See `RULE-ENGINE.md` for the standing rule-engine planning document.

## v0.2.0 Local Mock Objects

The browser sandbox now includes starter objects that should map cleanly to future tables:

- `employees`
- `ruleProfiles`
- `patterns`
- `employeePatterns`
- `scheduleEvents`
- `benefitLedger`
- `coverageRequirements`

These are not database tables yet. They are shape tests so future PHP/database work does not start from a spreadsheet-style schedule page.

## v0.2.1 Planning Additions

Signal Schedule v0.2.1 is a docs-only architecture capture release. It preserves the model decisions below before more interface or backend work is added.

### Rule 0: Store Facts, Not Assumptions

The future database should store raw facts and let rules, calculations, and display preferences derive outcomes.

Store facts such as:

- start time
- end time
- paid minutes
- unpaid break rules
- time zone
- date
- event type
- policy rule
- reason / explanation

Avoid storing only presentation or assumptions such as:

- `7A-3:30P` as the only source of truth
- `8 hours` without start/end/break facts
- formatted dates without an underlying date value
- schedule cells that hide whether something is work, overtime, vacation, mandate, or training

### Company Profile Settings

Future agency/company profile records should support:

- work week starts on
- pay period starts on
- time format
- date format
- time zone
- industry type / template

These settings should drive display, overtime calculations, reporting, pay-period summaries, and future rule-engine decisions.

### Coverage Requirements

Coverage requirements should support:

- needed by role or qualification
- needed by time block
- location, station, unit, department, or division scope
- numbered coverage spots where useful
- open / unfilled spot tracking

Coverage should eventually compare required staffing to generated schedule events and explain shortages.

### Pattern Enhancements

Patterns should support:

- cycle-based short days
- short weeks
- day-specific shift types
- paid minutes
- unpaid break rules
- pattern-level exceptions
- employee-specific pattern variations

Short days should not be hard-coded to a weekday unless the agency rule actually works that way. Some organizations need short days based on rotation cycle or short-week position instead.

## Future Tables

### agencies

Organizations or departments using the system.

Suggested fields:

- id
- name
- agency_type
- timezone
- date_format
- time_format
- work_week_starts_on
- pay_period_type
- pay_period_starts_on
- active
- created_at
- updated_at

Example agency types:

- dispatch
- police
- fire
- ems
- hospital
- nursing
- manufacturing
- retail
- general

### users

Login accounts for admins, managers, employees, and viewers.

Suggested fields:

- id
- agency_id
- email
- password_hash
- display_name
- role_id
- employee_id nullable
- status
- created_at
- updated_at

### employees

People who can be scheduled.

Suggested fields:

- id
- agency_id
- first_name
- last_name
- display_name
- employee_role
- color_key nullable
- default_hours_per_week
- status
- hire_date nullable
- seniority_date nullable
- created_at
- updated_at

### roles

Permission roles for the app.

Suggested fields:

- id
- agency_id
- name
- can_manage_users
- can_manage_employees
- can_edit_schedule
- can_publish_schedule
- can_view_schedule
- can_request_time_off
- can_approve_time_off
- can_manage_policy_rules

### policy_rules

Configurable agency rules for coverage, overtime, mandation, bidding, benefits, and fairness.

Suggested fields:

- id
- agency_id
- rule_category
- rule_key
- rule_value_json
- active
- effective_start_date nullable
- effective_end_date nullable
- notes
- created_by_user_id
- updated_by_user_id nullable
- created_at
- updated_at

Example categories:

- coverage
- overtime
- mandation
- benefits
- bidding
- fairness
- fatigue
- qualifications
- availability

### shifts

Reusable shift blocks.

Suggested fields:

- id
- agency_id
- name
- start_time
- end_time
- min_staff
- required_role nullable
- color_key nullable
- active
- created_at
- updated_at

### schedule_patterns

Reusable rotation or pattern definitions.

Suggested fields:

- id
- agency_id
- name
- pattern_code
- rotation_length_days
- shift_length_hours nullable
- description
- active
- created_at
- updated_at

Examples:

- `WOO` for 24/48 style logic
- `WWOOOO` for 48/96 style logic
- `WWWWOOOO` for 4-on/4-off style logic

### employee_patterns

Connects an employee to a recurring pattern.

Suggested fields:

- id
- employee_id
- pattern_id
- shift_id nullable
- start_date
- end_date nullable
- active
- notes
- created_at
- updated_at

### schedule_events

Real-world events that affect schedule output.

Suggested fields:

- id
- agency_id
- employee_id
- event_type
- event_subtype nullable
- start_datetime
- end_datetime
- hours nullable
- status
- source_type
- source_id nullable
- notes
- created_by_user_id
- updated_by_user_id nullable
- created_at
- updated_at

Example event types:

- regular_shift
- overtime
- mandated_overtime
- vacation
- sick
- personal
- bereavement
- training
- court
- trade
- callback
- holdover
- unavailable

### schedule_overrides

Manual changes to generated schedules.

Suggested fields:

- id
- agency_id
- employee_id
- schedule_date
- original_shift_id nullable
- override_shift_id nullable
- override_type
- notes
- created_by_user_id
- updated_by_user_id nullable
- created_at
- updated_at

Example override types:

- added_shift
- removed_shift
- changed_shift
- time_off
- training
- forced
- mandate

### schedule_assignments

Optional table for saved/published work rows. This should be used once a schedule period is published or when a row needs to become a stable record.

Suggested fields:

- id
- schedule_period_id nullable
- employee_id
- shift_id
- schedule_date
- source_type
- notes
- status
- created_by_user_id
- updated_by_user_id nullable
- created_at
- updated_at

Example source types:

- generated
- manual
- override
- event
- published

### schedule_periods

Draft or published blocks of schedule time.

Suggested fields:

- id
- agency_id
- name
- period_start
- period_end
- status
- published_at nullable
- published_by_user_id nullable
- notes
- created_at
- updated_at

### coverage_requirements

Minimum staffing rules by time, position, qualification, location, or unit.

Suggested fields:

- id
- agency_id
- location_id nullable
- day_of_week nullable
- effective_date nullable
- start_time
- end_time
- required_count
- required_role nullable
- required_qualification_id nullable
- notes
- active
- created_at
- updated_at

### availability

Employee availability and preference rules.

Suggested fields:

- id
- employee_id
- date nullable
- day_of_week nullable
- availability_type
- start_time nullable
- end_time nullable
- notes
- created_at
- updated_at

### employee_qualifications

Qualifications, certifications, skills, or positions an employee can work.

Suggested fields:

- id
- employee_id
- qualification_key
- qualification_name
- issued_date nullable
- expires_date nullable
- status
- notes
- created_at
- updated_at

### employee_exceptions

Temporary or permanent exceptions that affect scheduling logic.

Suggested fields:

- id
- employee_id
- exception_type
- start_date
- end_date nullable
- affects_mandation
- affects_overtime
- affects_schedule
- notes
- approved_by_user_id nullable
- created_at
- updated_at

Example exception types:

- FMLA
- part_time
- light_duty
- probationary
- training_restriction
- max_hours_restriction
- contractual_exception
- management_override

### time_off_requests

Vacation, sick, personal, unpaid, and other blocked time.

Suggested fields:

- id
- employee_id
- request_type
- start_date
- end_date
- start_time nullable
- end_time nullable
- hours nullable
- status
- approved_by_user_id nullable
- notes
- created_at
- updated_at

### benefit_types

Configurable benefit banks.

Suggested fields:

- id
- agency_id
- name
- code
- unit
- active
- created_at
- updated_at

Example benefit types:

- vacation
- sick
- personal
- comp
- holiday
- bereavement
- admin_leave

### benefit_accrual_rules

Rules that add benefit time.

Suggested fields:

- id
- agency_id
- benefit_type_id
- accrual_frequency
- accrual_amount
- effective_start_date
- effective_end_date nullable
- seniority_min_months nullable
- seniority_max_months nullable
- max_balance nullable
- carryover_limit nullable
- active
- notes
- created_at
- updated_at

Example frequencies:

- monthly_first
- paycheck
- annual
- per_hour_worked
- manual_only

### benefit_ledger

Auditable benefit balance history.

Suggested fields:

- id
- employee_id
- benefit_type_id
- ledger_date
- amount
- reason
- source_type
- source_id nullable
- balance_after nullable
- created_by_user_id nullable
- created_at

Important rule:

Do not silently overwrite balances. Add ledger records.

### mandate_rotation

Current forced overtime rotation list.

Suggested fields:

- id
- agency_id
- employee_id
- rotation_group nullable
- order_position
- mandate_count
- last_mandated_at nullable
- temporarily_skipped
- skip_reason nullable
- active
- created_at
- updated_at

### mandate_events

Records individual mandates and mandate attempts.

Suggested fields:

- id
- agency_id
- employee_id
- schedule_event_id nullable
- mandate_datetime
- mandate_start_datetime
- mandate_end_datetime
- status
- counted_against_rotation
- skip_reason nullable
- decision_explanation
- created_by_user_id
- created_at

Example statuses:

- mandated
- skipped
- refused
- cancelled
- overridden

### bid_windows

Open periods for shift bids, vacation bids, or overtime bids.

Suggested fields:

- id
- agency_id
- bid_type
- name
- opens_at
- closes_at
- award_method
- status
- notes
- created_at
- updated_at

### bid_submissions

Employee bid choices.

Suggested fields:

- id
- bid_window_id
- employee_id
- choice_rank
- choice_json
- submitted_at
- status
- notes

### bid_awards

Awarded bid results.

Suggested fields:

- id
- bid_window_id
- employee_id
- submission_id nullable
- award_json
- awarded_by_user_id nullable
- awarded_at
- decision_explanation
- status

### shift_swap_requests

Requests for one employee to trade or give away a shift.

Suggested fields:

- id
- requester_employee_id
- receiver_employee_id nullable
- schedule_date
- shift_id
- status
- approved_by_user_id nullable
- notes
- created_at
- updated_at

### fairness_metrics

Precomputed or cached fairness counters.

Suggested fields:

- id
- agency_id
- employee_id
- metric_key
- period_start
- period_end
- metric_value
- comparison_value nullable
- notes
- calculated_at

Example metrics:

- weekend_count
- holiday_count
- overtime_hours
- mandate_count
- callback_count
- denied_time_off_count

### decision_explanations

Human-readable explanations for automated or assisted decisions.

Suggested fields:

- id
- agency_id
- entity_type
- entity_id
- decision_type
- explanation_text
- rule_snapshot_json nullable
- created_by_user_id nullable
- created_at

### notifications

In-app or future email/SMS notification records.

Suggested fields:

- id
- user_id nullable
- employee_id nullable
- notification_type
- message
- read_at nullable
- created_at

### audit_log

Records important changes.

Suggested fields:

- id
- user_id
- entity_type
- entity_id
- action
- before_json
- after_json
- reason nullable
- created_at

## Future PHP Milestones

1. Build read/write API for employees, shifts, patterns, and schedule events.
2. Add generated schedule preview from pattern logic.
3. Add rule-engine warnings and human-readable explanations.
4. Add date-based assignments and month view.
5. Add time-off conflict checks.
6. Add coverage requirement checks.
7. Add admin login.
8. Add roles and permissions.
9. Add schedule periods and publish/unpublish workflow.
10. Add benefit time ledger and accrual rules.
11. Add mandation rotation and mandate event tracking.
12. Add bidding tables and award explanations.
13. Add audit logging.


## v0.3.0 Agency Profile Tables

v0.3.0 adds planning for agency/company settings and vocabulary before employee profiles. Future database work should avoid hard-coded industry assumptions.

### agencies

```text
id
name
industry_type
time_zone
date_format
time_format
work_week_starts_on
pay_period_type
pay_period_starts_on
active
created_at
updated_at
```

### agency_vocabularies

Stores agency-defined values such as departments, divisions, locations, positions, shift groups, qualifications, benefit types, and exception types.

```text
id
agency_id
type
label
code
active
sort_order
```

### shift_definitions

```text
id
agency_id
name
start_time
end_time
paid_minutes
break_rule_id
display_label
active
```

### break_rules

```text
id
agency_id
name
paid_break_minutes
unpaid_break_minutes
description
```

### coverage_requirements

```text
id
agency_id
role_or_position_id
qualification_id
location_id
day_scope
start_time
end_time
minimum_required
target_staffing
maximum_allowed
uses_numbered_spots
active
```

### coverage_spots

Optional future table for agencies that want fillable positions rather than headcount-only coverage.

```text
id
coverage_requirement_id
spot_label
sort_order
required
```

Rule 0 applies: store facts such as times, minutes, requirements, and vocabulary records. Display labels, calculations, warnings, and reports should be derived later.


## v0.4.0 Employee Profile Tables

v0.4.0 adds planning for employee profiles, but does not create database tables yet. Future database work should keep employees separate from users.

Potential employee-related tables:

```text
employees
- id
- agency_id
- employee_code
- display_name
- status
- hire_date
- seniority_date
- color_label
- created_at
- updated_at
```

```text
employee_assignments
- id
- employee_id
- department_id
- division_id
- location_id
- position_id
- shift_group_id
- assigned_pattern_id
- supervisor_employee_id
- effective_start
- effective_end
```

```text
employee_eligibility
- employee_id
- overtime_eligible
- mandate_eligible
- trade_eligible
- shift_bid_eligible
- vacation_bid_eligible
- benefit_eligible
```

```text
employee_exceptions
- id
- employee_id
- exception_type_id
- affects_rule
- start_date
- end_date
- reason
- notes
- active
```

```text
employee_qualifications
- id
- employee_id
- qualification_id
- issued_date
- expiration_date
- active
```

Benefit balances should not become silent overwritten columns. They should be calculated from future benefit ledger entries. v0.4 may show snapshots for planning, but the ledger remains the planned source of truth.


## v0.5.0 Pattern Foundation Tables

v0.5.0 adds planning for pattern objects, but does not create database tables yet.

Future tables should likely include:

```text
patterns
- id
- agency_id
- name
- description
- cycle_length
- base_shift_id nullable
- active

pattern_days
- id
- pattern_id
- cycle_day_number
- day_type work/off/custom
- shift_type normal/short/kelly/training/custom
- start_time nullable
- end_time nullable
- paid_minutes
- break_rule_id nullable

employee_patterns
- id
- employee_id
- pattern_id
- effective_start_date
- effective_end_date nullable
```

Pattern days should store facts, not assumptions. A short day should be stored as a cycle-day fact with its own start time, end time, paid minutes, and break rule.


## v0.7.0 Benefit Ledger Foundation Tables

v0.8.0 adds planning for event objects, but does not create database tables yet.

Future event-related tables may include:

### event_types

- id
- agency_id
- name
- category
- removes_from_coverage
- adds_to_coverage
- changes_role
- changes_pay
- uses_benefit_time
- requires_approval
- requires_audit_trail
- active

### schedule_events

- id
- agency_id
- employee_id
- event_type_id
- start_datetime
- end_datetime
- paid_minutes
- status
- coverage_impact
- benefit_impact
- reason
- source
- notes
- created_by_user_id
- approved_by_user_id
- created_at
- updated_at

Events should explain why the final schedule differs from expected pattern work. They should not be stored only as colored calendar text.


## Rule Engine Foundation Tables

Future persistence should separate rule configuration from rule outcomes. Planned tables include:

- `rule_profiles` for agency-level policy sets.
- `rule_definitions` for overtime, mandation, benefit, coverage, fatigue, trade, and bidding rules.
- `rule_evaluations` for recorded outcomes and explanations.
- `rule_overrides` for admin overrides with reasons.
- `agency_rule_templates` for editable industry starting points.

Mandation rule outcomes should link to mandate history and pay/coverage impact, not benefit usage. Vacation, sick, personal, and similar time-off events should link to benefit-ledger usage entries.
