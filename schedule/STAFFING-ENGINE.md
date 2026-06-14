# Signal Schedule v5.1.0 — Staffing Engine

The Staffing Engine begins the operational scheduling layer that answers: **Who should work?**

## Included

- Task-based navigation cleanup
- Staffing Engine hub
- Coverage/vacancy foundation
- Assignment candidate foundation
- OT, callback, and mandation queue preview
- Explainability framework with copyable "Why?" output
- Fairness metric foundation
- Schedule Integrity Checker foundation

## Navigation model

- Me
- Scheduling
- Staffing
- Personnel
- Requests
- Overtime
- Administration
- Reports
- System

This removes earlier blended labels that made employee self-service and personnel administration feel like breadcrumbs instead of navigation groups.

## Migration

Required migration:

```text
schedule/api/coolify/sql/047_staffing_engine_schema.sql
```

Tracking row:

```text
047 | staffing_engine_schema
```
