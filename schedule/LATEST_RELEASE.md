# Signal Schedule v2.21.0 — Assignment Engine Integration

## Summary

Adds the Assignment Engine Integration foundation so employees, coverage spots, daily board rows, assignment sources, and assignment history can be represented as one scheduling read model.

## Database Migration Required

Yes. Run:

```text
schedule/api/coolify/sql/027_assignment_engine_integration_schema.sql
```

Expected newest migration:

```text
027 | assignment_engine_integration
```

## Notes

This release remains read-only preview functionality. It does not enable drag/drop assignments, automatic pattern generation, or live assignment mutations.
