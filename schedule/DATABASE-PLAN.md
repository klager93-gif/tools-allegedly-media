# Signal Schedule Database Plan

## Status

Planning document for the future PHP/database version. Signal Schedule v0.2.1 remains local-first and does not create database tables yet, but the sandbox now mirrors the future core engine objects.

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
