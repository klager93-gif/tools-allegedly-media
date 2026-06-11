# Signal Labs Admin Changelog

## Home v0.9.5 — Restore Missing Tools

**Date:** 2026-06-10

### Recovery Notes

- `/overtime/` and `/timeoff/` were accidentally omitted from recent full replacement ZIP packages.
- The user has backup copies from:

```text
2026-06-10-before-home-v0.9.2-paycheck-v1.0.0-root-cleanup-stable-paycheck
```

### Workflow Rule Added

Full replacement ZIPs must include every live top-level folder, even when unchanged.

Before building a full replacement package, verify whether the user intends to delete and replace the entire local/live folder.
