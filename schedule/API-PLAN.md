# Signal Schedule API Plan — v0.99.0

Future PHP endpoints should be grouped by domain rather than by UI screen.

## Early read-only endpoints

- `/schedule/php/api/agencies.php`
- `/schedule/php/api/employees.php`
- `/schedule/php/api/health.php`

## Later write endpoints

- `/schedule/php/api/requests.php`
- `/schedule/php/api/opportunities.php`
- `/schedule/php/api/bids.php`
- `/schedule/php/api/awards.php`
- `/schedule/php/api/events.php`

## Rules

- Validate every input server-side.
- Require permissions for every write.
- Return structured errors.
- Log every schedule-changing write.
- Do not expose database credentials to frontend JavaScript.
