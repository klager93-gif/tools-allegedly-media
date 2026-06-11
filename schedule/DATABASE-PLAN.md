# Signal Schedule Database Plan

## Status

Planning document for the future PHP/database version. Signal Schedule v0.1.1 remains local-first and does not create database tables yet.

## Core Rule

Do not confuse employees with users.

- An employee is someone who appears on the schedule.
- A user is someone who can log in.
- One person may be both, but the tables should remain separate.

## Architecture Rule

Do not store every future schedule day forever unless it has been manually changed or published.

The preferred model is:

```text
pattern + start date + employee assignment + overrides = generated schedule
```

This keeps recurring schedules flexible while still allowing real-world corrections.

## Future Tables

### users

Login accounts for admins, managers, employees, and viewers.

Suggested fields:

- id
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
- first_name
- last_name
- display_name
- employee_role
- color_key nullable
- default_hours_per_week
- status
- hire_date nullable
- created_at
- updated_at

### roles

Permission roles for the app.

Suggested fields:

- id
- name
- can_manage_users
- can_manage_employees
- can_edit_schedule
- can_publish_schedule
- can_view_schedule
- can_request_time_off
- can_approve_time_off

### shifts

Reusable shift blocks.

Suggested fields:

- id
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

### schedule_overrides

Manual changes to generated schedules.

Suggested fields:

- id
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
- published

### schedule_periods

Draft or published blocks of schedule time.

Suggested fields:

- id
- name
- period_start
- period_end
- status
- published_at nullable
- published_by_user_id nullable
- notes
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
- created_at

## Future PHP Milestones

1. Build read/write API for employees, shifts, patterns, and overrides.
2. Add generated schedule preview from pattern logic.
3. Add date-based assignments and month view.
4. Add time-off conflict checks.
5. Add admin login.
6. Add roles and permissions.
7. Add schedule periods and publish/unpublish workflow.
8. Add audit logging.
