# Signal Schedule HOWTO

## Current Version

**v1.7.1 — Coolify Dockerfile Deployment Fix**

This release adds a Dockerfile deployment path for the Coolify API while preserving the optional read-only Postgres employee path and keeping the active browser app on static JSON.

## How to Use the Current App

1. Open `/schedule/index.html`.
2. Use the current browser-based prototype normally.
3. Employee data is still read from static JSON through the Employee service/repository/adapter boundary.
4. Do not expect create/edit/delete, authentication, production API calls from the frontend, or database writes yet.

## How to Review the API

Review:

```text
schedule/POSTGRES-EMPLOYEE-READ-ENDPOINT.md
schedule/api/coolify/README.md
schedule/api/coolify/server.js
schedule/api/coolify/db/postgres.js
schedule/api/coolify/sql/001_employee_read_schema.sql
schedule/adapters/ApiEmployeeAdapter.js
```

The API defines:

```text
GET /health
GET /employees
GET /api/health
GET /api/employees
```


## How to Deploy the API on Coolify

Use Dockerfile deployment instead of Nixpacks:

```text
Build Pack: Dockerfile
Base Directory: /schedule/api/coolify
Dockerfile Location: /schedule/api/coolify/Dockerfile
Port: 3000
```

Set runtime environment variables:

```text
NODE_ENV=production
PORT=3000
DATA_MODE=postgres
DATABASE_URL=<internal Coolify Postgres URL>
```

Then test:

```text
/health
/employees
```

## Optional Local API Test Without Postgres

```bash
cd schedule/api/coolify
npm install
npm start
```

Then open:

```text
http://localhost:3000/health
http://localhost:3000/employees
```

By default, the API reads the JSON seed file.

## Optional Postgres Read Test

1. Create a Postgres database.
2. Apply:

```text
schedule/api/coolify/sql/001_employee_read_schema.sql
schedule/api/coolify/sql/002_employee_seed_read_only.sql
```

3. Set environment variables in Coolify or local shell:

```text
DATABASE_URL=postgres://user:password@host:5432/database
DATA_MODE=postgres
```

4. Start the API and test:

```text
GET /api/health
GET /api/employees
```

## Architecture Boundary

The app should continue to follow:

```text
UI
  ↓
Services
  ↓
Repositories
  ↓
Adapters
  ↓
Backend
```

Do not connect UI or scheduling logic directly to Postgres, MySQL, D1, Workers, PHP, Coolify, or a raw JSON file.

## Backend Direction

Preferred direction:

```text
GitHub
  ↓
Coolify
  ↓
Schedule API service
  ↓
Postgres
```

## Do Not Add Yet

- CRUD
- Authentication
- Production credentials
- Database writes from API endpoints
- Scheduling engine logic
- Payroll/benefits/medical/discipline records

## Next Planned Release

**v1.8.0 — Employee CRUD Foundation**


## v1.8.0 Employee CRUD testing

Do not enable writes for real employee data yet. For controlled testing only, set these Coolify runtime variables:

```text
EMPLOYEE_WRITES_ENABLED=true
ADMIN_API_KEY=<long random key>
```

Write requests must include either:

```text
Authorization: Bearer <ADMIN_API_KEY>
```

or:

```text
x-admin-api-key: <ADMIN_API_KEY>
```

Run `schedule/api/coolify/sql/003_employee_crud_safety_indexes.sql` before testing writes.
