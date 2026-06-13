# Signal Labs How To

## Shared Asset Update Checklist

When changing shared assets:

1. List all affected pages.
2. List unaffected/legacy pages.
3. Include matched CSS/JS files.
4. Update cache-busting references.
5. Verify live behavior after deploy.

## Signal Schedule

Use the current Signal Schedule sandbox before treating it like a finished scheduling app. Add employees, roles, shifts, minimum staffing rules, max weekly hours, and rest-gap rules. Then review the warnings and plain-text output to decide whether the schedule model makes sense.

This version is still local-browser only. PHP, database tables, logins, admin roles, employee accounts, permissions, publishing, and shared schedules should come later after the logic is proven.


## Release Archive Workflow

1. Download the release ZIP from the build response.
2. Save the ZIP in a dated local folder such as `Releases/YYYY-MM-DD/`.
3. Treat that ZIP as the backup and restore point for the release.
4. Replace or upload the current project files as needed.
5. Push the updated files to GitHub.

Do not create a duplicate normal backup folder unless the work is experimental, risky, manual, or outside the normal release process.

## Schedule v2.1.3 — Employee Identity Cleanup

Employee identity is now standardized for future production use. Employee records should use a hidden system key, an admin-entered agency employee ID, and an optional badge number. Future login accounts should live in a separate users table and support login by username or email. Roles should be assigned through separate role tables rather than embedded directly on employee records.

## v2.2.1 — Request Hours & Admin Override Foundation

Leave Requests now include preview support for full-day vs partial-day time selection, start/end time calculation, request type minimum increments, and admin/scheduler override planning. Employee/self-service requests follow configured increments; admin/scheduler entries may use exact operational times with override notes.

