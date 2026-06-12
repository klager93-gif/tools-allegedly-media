# Signal Schedule HOWTO

## Current Version

**v1.9.0 — Assignments Foundation**

This release adds assignment templates and employee assignment records while preserving the static JSON frontend adapter and protected employee CRUD API foundation.

## How to Use the Current App

1. Open `/schedule/index.html`.
2. Review the Assignments Foundation section.
3. Use Load Multi-Agency Data to refresh agency and employee sample records.
4. Employee and assignment data are still read from static JSON in the browser.
5. Do not expect assignment editing, authentication, minimum staffing, VOT bidding, or schedule generation yet.

## Assignment Foundation Files

```text
schedule/data/assignment-templates.json
schedule/data/employee-assignments.json
schedule/adapters/JsonAssignmentAdapter.js
schedule/repositories/AssignmentRepository.js
schedule/services/AssignmentService.js
schedule/api/contracts/assignments.read.schema.json
schedule/api/coolify/sql/004_assignments_foundation_schema.sql
```

## How to Review the API

The Coolify API now includes read-only assignment seed routes:

```text
GET /assignments
GET /api/assignments
```

Employee CRUD routes remain protected by the existing v1.8 safety controls.

## Optional Local API Test

```bash
cd schedule/api/coolify
npm install
npm start
```

Then open:

```text
http://localhost:3000/health
http://localhost:3000/employees
http://localhost:3000/assignments
```
