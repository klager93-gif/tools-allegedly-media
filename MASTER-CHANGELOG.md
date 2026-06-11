# Signal Labs Master Changelog

## Home v0.9.9.1 — Public Page Version Sync Resolution + Standards v2.0 Consolidation

**Date:** 2026-06-10  
**Type:** Corrective release

### Changes

- Resolved Home/public footer version mismatch.
- Corrected shared footer metadata compatibility.
- Consolidated Signal Labs standards into v2.0 structure.
- Preserved independent tool versions:
  - Paycheck remains v1.0.2.
  - Pay Planner remains v0.1.0.
  - Overtime and Time Off remain unchanged legacy/restored tools.

### Root Cause

Previous hotfixes expected `data-sl-*` metadata, while the actual site pages used `data-signal-*` metadata.
