## v1.1.0 — Repository / Adapter Layer

Signal Schedule v1.0.0 begins the v1.x data architecture while keeping the app static and browser-only.

This release adds multi-agency JSON data files and data loading functions so pretend agencies and employee records are no longer only hardcoded UI examples.

### Data files

```text
/schedule/data/agencies.json
/schedule/data/employees.json
```

### Current backend target

Cloudflare-native first: Pages, Workers/Pages Functions, D1, KV, R2, and Secrets.

### Portability rule

Rule 24 remains active: data access must move through service/repository/adapter layers so D1 can be replaced later by MySQL, PostgreSQL, PHP, or another backend with minimal UI changes.


## v1.1.0 Repository / Adapter Layer

Signal Schedule now treats static JSON as an adapter behind repositories and services. This protects the UI from backend-specific decisions and supports future D1, Worker, MySQL, or Postgres adapters.
