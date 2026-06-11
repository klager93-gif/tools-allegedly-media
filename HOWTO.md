# Signal Labs How To

## Shared Asset Update Checklist

When changing shared assets:

1. List all affected pages.
2. List unaffected/legacy pages.
3. Include matched CSS/JS files.
4. Update cache-busting references.
5. Verify live behavior after deploy.

## Signal Schedule

Use Signal Schedule v0.1.1 as a logic sandbox before treating it like a finished scheduling app. Add employees, roles, shifts, minimum staffing rules, max weekly hours, and rest-gap rules. Then review the warnings and plain-text output to decide whether the schedule model makes sense.

This version is still local-browser only. PHP, database tables, logins, admin roles, employee accounts, permissions, publishing, and shared schedules should come later after the logic is proven.
