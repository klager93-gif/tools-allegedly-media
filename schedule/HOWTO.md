# Signal Schedule HOWTO

## Current Version

**v1.7.0 — Postgres Connection + Employee Read Endpoint**

This release adds an optional read-only Postgres employee path to the Coolify API while keeping the active browser app on static JSON.

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
USE_POSTGRES_EMPLOYEES=true
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
