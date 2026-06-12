# v1.0 Database Readiness Checklist

Before building v1.0, confirm:

- Hosting supports PHP 8.x.
- Hosting supports MySQL or MariaDB.
- A database can be created outside WordPress.
- A limited database user can be created.
- Credentials will not be committed publicly.
- First schema will include only agencies and employees.
- First PHP page will be read-only.
- Audit logging will be planned before write actions.

## v1.0 minimum target

- `/schedule/php/config/config.example.php`
- `/schedule/php/database/connection.php`
- `/schedule/php/database/schema.sql`
- `/schedule/php/api/health.php`
- Optional private read-only test page.
