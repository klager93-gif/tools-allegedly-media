# Signal Labs Home

Signal Labs is the shared home for simple, useful calculators and planning tools.

---

# Current Version

v0.8.1

## Theme

Design System Cleanup

---

# Current Tools

## Paycheck Calculator

Estimate gross pay, paid hours, taxes, deductions, adjustments, target pay, and take-home pay.

## Overtime Calculator

Estimate regular pay, overtime pay, before-tax pay, deductions, take-home pay, and target pay.

## Time Off Planner

Plan vacation, sick time, personal time, comp time, holidays, and planned time off.

---

# Shared Design System

Home v0.8.1 introduces the Design System Cleanup foundation.

Shared systems now include or prepare for:

- Global navigation.
- Metadata-aware global footer.
- Shared tool action bar pattern.
- Shared modal/dialog styling.
- Shared toast notification styling.
- Shared cards, buttons, pills, and empty states.

Tools do not have to migrate all at once. Future tool releases can adopt the shared system gradually.

---

# Shared Assets

## assets/global.css

Provides shared Signal Labs styling, navigation, footer, action bar support, empty states, modal/dialog styling, toast styling, report foundations, and responsive foundations.

## assets/global.js

Provides shared navigation, metadata helpers, optional global footer rendering, modal utilities, toast utilities, action bar support, ad slot initialization, and shared helper behavior.

---

# Development Standards

This project follows:

```text
/STANDARDS.md
/UX_STANDARDS.md
/SCRIPT_STANDARDS.md
/DOCUMENTATION_STANDARDS.md
/VERSIONING_STANDARDS.md
/WORKFLOW_STANDARDS.md
```

`STANDARDS.md` is the constitution. Supporting standards files are authoritative within their domains.

---

# Current Status

Build: v0.8.1

Theme: Design System Cleanup

Status: Active Development


## v0.8.1 Note

Home v0.8.1 removes the public design-system demo card while preserving the shared design-system foundation for future tool adoption.
