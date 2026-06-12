# Signal Schedule API Plan — v0.99.1

Future APIs should be grouped by domain rather than by UI screen. The first API implementation target is Cloudflare Workers or Pages Functions, not PHP endpoints.

## Initial read-only endpoints

```text
/api/health
/api/agencies
/api/employees
```

## Future endpoint families

```text
/api/assignments
/api/shifts
/api/events
/api/requests
/api/opportunities
/api/bids
/api/awards
/api/benefits
/api/rules
/api/coverage
/api/explanations
/api/notifications
/api/goals
/api/audit
```

## Rule 24

API handlers should not contain scheduling business logic. They should call services, which call repositories, which call adapters.
