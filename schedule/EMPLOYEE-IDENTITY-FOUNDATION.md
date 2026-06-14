# Schedule v2.1.3 — Employee Identity Cleanup

This release standardizes the way Schedule separates agency employee identity, system identity, login identity, and role permissions.

## Identity Rule

**Human-entered identifiers belong to the agency. Database identifiers belong to the system.**

## Employee Identity

Employee records should have a hidden system key and agency-entered identifiers.

| Field | Purpose | Who sets it | Notes |
| --- | --- | --- | --- |
| `id` | Hidden system/database key | System | Internal primary key. Users should not depend on it. |
| `employee_id` | County/agency employee ID | Admin/Supervisor | User-entered official employee number/code. |
| `badge_number` | Badge or operational number | Admin/Supervisor | Optional. Separate from employee ID. |
| `display_name` | User-facing name | System/Admin | Usually first + last name. |

## User Login Identity

Login accounts should be separate from employees.

| Field | Purpose |
| --- | --- |
| `users.id` | Hidden system key for login account |
| `users.employee_record_id` | Link to the employee record |
| `users.username` | Optional login name |
| `users.email` | Optional email login |
| `users.password_hash` | Authentication secret hash, never plaintext |
| `users.active` | Login enabled/disabled |

Users should be able to authenticate with either a username or an email address.

## Roles

Roles are not employee fields. Roles should be separate records and attached to user accounts.

Recommended roles:

- Admin
- Scheduler
- Supervisor
- Telecommunicator
- Trainee
- Employee

## Why This Matters

This keeps employee data, login access, and permissions independent:

- Employees can exist without login accounts.
- Login accounts can be disabled without deleting employee history.
- Badge numbers can change without breaking schedules.
- County employee IDs can be imported without becoming system primary keys.
- Supervisors and administrators can hold multiple roles.

## Current Status

This release documents and reserves the identity model. It does not enable live authentication, password storage, or role enforcement yet.
