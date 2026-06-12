# v1.0 Readiness — Cloudflare Data Layer Foundation

Before v1.0 begins, confirm:

- The static site still deploys from GitHub to Cloudflare.
- No PHP/MySQL hosting is required for the first v1.x releases.
- Data access will use services, repositories, and adapters.
- Sample data is safe to commit publicly.
- No secrets or private employee data are included.
- Render registry validation still passes.
- Rule 23 and Rule 24 are followed.

## v1.0 target

- Add `/schedule/data/agencies.json`.
- Add `/schedule/data/employees.json`.
- Add browser-safe data service/repository files.
- Keep all live database work out of v1.0.
