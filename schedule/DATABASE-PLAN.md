# Signal Schedule Database Plan

## Status

Planning document for the future PHP/database version. Signal Schedule v0.1.1 remains local-first and does not create database tables yet.

## Core Rule

Do not confuse employees with users.

- An employee is someone who appears on the schedule.
- A user is someone who can log in.
- One person may be both, but the tables should remain separate.

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
- status
- default_hours_per_week
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

### schedule_assignments

Actual scheduled work.

Suggested fields:

- id
- employee_id
- shift_id
- schedule_date
- notes
- status
- created_by_user_id
- updated_by_user_id
- created_at
- updated_at

### availability

Employee availability and preference rules.

Suggested fields:

- id
- employee_id
- date
- day_of_week nullable
- availability_type
- start_time nullable
- end_time nullable
- notes

### time_off_requests

Vacation, sick, personal, unpaid, and other blocked time.

Suggested fields:

- id
- employee_id
- request_type
- start_date
- end_date
- status
- approved_by_user_id nullable
- notes

### schedule_templates

Reusable rotation or pattern definitions.

Suggested fields:

- id
- name
- rotation_length_days
- description
- active

### schedule_template_assignments

Rows inside a schedule template.

Suggested fields:

- id
- template_id
- day_offset
- shift_id
- employee_id nullable
- role_required nullable

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

1. Build read/write API for employees, shifts, and assignments.
2. Add admin login.
3. Add roles and permissions.
4. Add month schedule storage.
5. Add publish/unpublish workflow.
6. Add audit logging.
