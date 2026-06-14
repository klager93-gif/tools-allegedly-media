## Schedule v2.17.0 — Roles & Permissions Engine

Adds the Roles & Permissions Engine foundation for agency-controlled view, edit, approve, delete, override, and export access.

## v2.14.0 Database Update

After uploading v2.14.0, run `019_employee_profile_self_service_schema.sql` and verify `schema_migrations` shows version `019`.

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

## Schedule v2.3.0 — Open Shifts / VOT Foundation

The Schedule tool now includes a preview Open Shifts / VOT page at `schedule/open-shifts.html`.

The page is still admin-first and read-only. It demonstrates the planned workflow for posting open shifts, showing staffing shortages, collecting volunteer interest, calculating request hours, and controlling request reasons through future admin settings.


## Schedule v2.11.0 — Calendar Shortcode Admin Controls

Adds admin-managed compact calendar codes and database migration tracking guidance. After uploading v2.11.0, run migrations 004 through 017 in order.


## Applying v5.1.0

1. Back up the live site.
2. Upload the full replacement package.
3. Apply `schedule/api/coolify/sql/045_employee_experience_data_tools_schema.sql` in Postgres.
4. Insert the migration tracking row: `045 | employee_experience_data_tools_schema`.
5. Visit `/schedule/data-tools.html` and `/schedule/employee/index.html`.
