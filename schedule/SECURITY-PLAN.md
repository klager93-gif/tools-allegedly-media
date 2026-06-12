# Signal Schedule Security Plan — v0.99.0

## Credentials

Database credentials must live outside public web files when possible. If hosting limits that, use a private PHP config file that is never linked, never downloaded, and never committed with real passwords.

## Database user

Use a limited MySQL user. Do not use the hosting account root/admin user for the application.

## Input safety

- Use prepared statements.
- Validate types and allowed values.
- Escape output in HTML.
- Treat all browser input as untrusted.

## Permissions

Future roles:

- Employee
- Supervisor
- Admin
- System

## Write safety

No live write action should exist before audit logging exists.
