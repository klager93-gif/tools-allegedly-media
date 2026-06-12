# Signal Schedule v1.4.0 — Backend Adapter Selection

## Release Type

Architecture and documentation foundation release.

## Summary

Signal Schedule v1.4.0 formally selects the default future backend adapter path before Employee API work begins.

Preferred future path:

```text
GitHub → Coolify → Schedule API service → Postgres
```

The active app remains static and JSON-backed. This release does not add live CRUD, authentication, database writes, credentials, or a production API deployment.

## Included

- Backend adapter selection documentation.
- Updated Schedule README, ROADMAP, CHANGELOG, and HOWTO.
- Updated backend portability and repository/adapter documentation.
- Updated Schedule app release metadata and visible release copy.
- Preserved static JSON adapter as the active implementation.
- Preserved Postgres, MySQL, and D1 portability under Rule 24.

## Not Included

- No Employee CRUD.
- No authentication.
- No database writes.
- No production API deployment.
- No credentials.
- No migration away from static JSON.

## Next

Signal Schedule v1.5.0 — Employee Read API Foundation.
