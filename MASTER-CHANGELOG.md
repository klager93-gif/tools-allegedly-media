# Signal Labs Master Changelog

## Purpose

This file tracks major changes across the entire Signal Labs ecosystem in actual release order.

Individual tools still maintain their own CHANGELOG.md files. This master changelog gives the big-picture history.

---

## 2026-06-08

### Paycheck v0.3 — Hours & Earnings

- Rebuilt Paycheck around a clearer Hours & Earnings first step.
- Added regular, overtime, double time, and selectable benefit / paid leave hours.
- Added Pay Details controls for hourly rate, pay period, currency, overtime multiplier, and double time multiplier.
- Updated gross pay, Copy Results, and Print Report output for the new hour-based structure.

### Paycheck v0.2 — Deductions & Adjustments

- Added itemized taxes, deductions, and other paycheck adjustments.
- Added suggested adjustment pills and Static Amount / Percentage controls.
- Updated paycheck results, Copy Results, and Print Report output for itemized adjustments.
- Updated Signal Labs standards with Shared Pattern Consistency guidance.

---

### Home v0.5.1 + Paycheck v0.1.1 — Navigation Refresh & Paycheck Integration

- Added Paycheck Calculator to Home and shared navigation.
- Added disabled Paycheck ad slots.
- Preserved no-live-ad behavior.

---

### Home v0.5 — Standards Expansion & Sync Cleanup

- Updated Signal Labs standards and documentation structure.
- Removed unused legacy root style.css after confirming no active files referenced it.
- Updated master documentation, release history, restore guidance, and manifests.

---

### Overtime v0.9.9 — Pre-1.0 Sync & Metadata Cleanup

- Synchronized Overtime version strings, report metadata, documentation, manifests, and cache-busting references.
- Prepared Overtime for v1.0 validation.

---

### Time Off v0.9.9 — Pre-1.0 Cleanup & Report Fix

- Fixed Time Off report helper mismatches.
- Cleaned HTML issues and synchronized documentation.
- Prepared Time Off for v1.0 validation.

---

### Overtime v0.9.8 — UX Flow & Plain-English Polish

- Renamed sections and results for clearer plain-English workflow.
- Reordered deductions before optional pay details.
- Preserved modal suggested-pill fixes.

---

### Overtime v0.9.7.1 — Modal Suggested Pills Placement Fix

- Fixed suggested tax, deduction, and adjustment pills still rendering outside the adjustment modal.

---

## 2026-06-07

### Time Off v0.9.8 — Quick Start + Stacked Layout

- Simplified Time Off onboarding.
- Removed Public Safety preset and question-pill clutter.
- Converted planner layout to stacked full-width sections.

---

### Overtime v0.9.7 — Modal Suggested Pills Fix

- Moved suggested controls into modal content areas.

---

### Overtime v0.9.6.2 — Take-Home Controls Cleanup

- Removed duplicate top-level take-home action buttons.
- Added suggested tax, deduction, and adjustment entry pills.

---

### Time Off v0.9.7 — Planner Identity Overhaul

- Reframed Time Off Calculator as Time Off Planner.
- Added planner presets, clearer sections, and plain-English summary.

---

### Home v0.4.1 — Master Documentation

- Added project-wide master documentation requirements.

---

### Time Off v0.9.6.2 — Category Pill Visibility Fix

- Hid legacy category checkbox/card source while preserving calculation compatibility.

---

### Overtime v0.9.6.1 / Time Off v0.9.6.1 — UI Identity Polish

- Refined info icons and pill UI consistency.

---

### Overtime v0.9.6 / Time Off v0.9.6 — Signal Labs UI Identity

- Added Signal Labs info icon and pill-control systems.

---

### Overtime v0.9.5 / Time Off v0.9.5 — Compact UI Pass

- Tightened cards, forms, result rows, and optional toggles.

---

### Overtime v0.9.4.x / Time Off v0.9.4.x — Optional Toggle Improvements

- Added inline optional toggles, collapse behavior, and toggle polish.

---

### Home v0.4 — Release Standards Update

- Renamed top-level release terminology from Root to Signal Labs Home.
- Added release metadata and backup naming rules.

---

### Home v0.3 — UI Density Refactor

- Added shared compact spacing rules.

---

### Home v0.2.7 — Release Management System

- Added master changelog, master roadmap, and release history.

---

### Home v0.2.6 — Backup & Recovery System

- Added backup and restore documentation.

---

### Overtime v0.9 / Time Off v0.9 — Professional Reports

- Added results-only HTML report generation.

---

### Overtime v0.8.5 / Time Off v0.8 — Share & Export Prep

- Added Copy Results and print/export preparation.

---

### Home v0.2.x — Shared Foundations

- Added navigation, modal UX, ad slot framework, standards, manifests, and versioning guidance.

---

## Notes

MASTER-CHANGELOG.md is intentionally high-level. For detailed tool-specific changes, see each tool's CHANGELOG.md.
