# Signal Schedule v1.3.0 — D1 Database Foundation

Signal Labs is a multi-tool repository. Schedule-specific backend planning must stay inside `/schedule/` unless explicitly shared by multiple tools.

## Correct placement

```text
/schedule/api/mock-functions/health.js
/schedule/api/mock-functions/agencies.js
/schedule/api/mock-functions/employees.js
```

## Incorrect placement

```text
/functions/schedule/api/health.js
/functions/schedule/api/agencies.js
/functions/schedule/api/employees.js
```

Root-level Cloudflare Pages Functions may become necessary later if the entire repository is intentionally wired that way. Until then, Schedule API planning stays in the Schedule tool directory.
