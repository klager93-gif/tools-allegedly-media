## v1.3.2 HOWTO — Coolify Backend Pivot

Before building Employee CRUD, use `COOLIFY-BACKEND-PIVOT.md` to understand the corrected backend direction. Do not create D1 bindings, CRUD, authentication, or live write behavior until the Coolify backend setup has been planned and confirmed.

## v1.3.1 HOWTO — D1 Setup Guide

Use `/schedule/D1-SETUP-GUIDE.md` before attempting any D1 connection or Employee CRUD work.

## v1.3.0 HOWTO — D1 Database Foundation

The Schedule tool still runs from static JSON. The new `/schedule/d1` files are planning/building blocks for the future Cloudflare D1 backend. Do not add live secrets or credentials to the repo.

## v1.3.0 HOWTO — D1 Database Foundation

Signal Schedule still runs as a static browser app. Use the multi-agency demo data exactly as before.

### What changed

The project now includes the planned Cloudflare API shape and mock Pages Function endpoint files. These are for backend transition planning only.

### Current app path

```text
UI
↓
Service Layer
↓
Repository Layer
↓
JSON Adapter
↓
/schedule/data/agencies.json and employees.json
```

### Future app path

```text
UI
↓
Service Layer
↓
Repository Layer
↓
API Adapter
↓
Cloudflare Worker / Pages Function
↓
D1
```

### Do not add yet

```text
D1 credentials
CRUD forms
Authentication
Approval workflows
Live writes
```
