# PHP/MySQL Starter Plan for Signal Schedule

This is a plain-English bridge for moving from the current static site into v1.0 database foundation work.

## First decision

Before writing code, confirm the hosting environment supports:

- PHP 8.x
- MySQL or MariaDB
- database user creation
- `.php` files served from the website root
- environment/config files that are not publicly downloadable

## Safe first step

Do not convert the whole tool at once. Start with a private database connection test file outside the public UI flow, then delete or protect it after testing.

## Suggested v1.0 order

1. Create database.
2. Create database user with limited permissions.
3. Create config file for database credentials.
4. Create connection helper.
5. Create first table: agencies.
6. Create second table: employees.
7. Add read-only test page.
8. Add admin-only CRUD later.
9. Add audit logging before approvals or schedule writes.

## Security rule

Never commit real database passwords to GitHub. Use a local config file that is excluded by `.gitignore`, or server-side environment variables if hosting supports them.
