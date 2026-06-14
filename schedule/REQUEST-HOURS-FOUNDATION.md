# Request Hours Foundation — v2.2.1

Schedule v2.2.1 adds the shared request-hours rules that will be used by Leave Requests and future Open Shifts / Voluntary Overtime workflows.

## Rules

- Employee/self-service requests must follow the configured minimum increment for the selected request type.
- Admin and Scheduler users may override increment restrictions and enter exact start/end times.
- Supervisor override ability should become a permission setting later.
- Full-day leave requests use the employee's scheduled shift hours.
- Partial-day requests calculate hours from start time to end time.
- Overrides should require a reason/note and eventually write to the audit log.

## Example

Vacation may require 30-minute increments for employee requests.

- Employee: `1300–1700` allowed.
- Employee: `1307–1622` blocked.
- Admin/Scheduler: `1307–1622` allowed with override note.

## Future Use

This same shared rule set should be reused by:

- Leave Requests
- Sick Leave entries
- Comp Time entries
- Personal Leave entries
- Training entries
- Open Shifts
- Voluntary Overtime requests
- Manual schedule corrections
