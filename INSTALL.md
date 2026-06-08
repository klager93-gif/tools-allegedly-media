# Signal Labs Paycheck v0.2 Release

## Versions

```text
Paycheck: v0.2 — Deductions & Adjustments
Home: v0.5.1 — Navigation Refresh & Paycheck Integration
Overtime: v0.9.9 — Pre-1.0 Sync & Metadata Cleanup
Time Off: v0.9.9 — Pre-1.0 Cleanup & Report Fix
```

## Backup Reminder

Before uploading this release, back up the current live version.

## Backup Folder Name

```text
2026-06-08-before-paycheck-v0.2-deductions-adjustments
```

## GitHub Title

```text
Paycheck v0.2 — Deductions & Adjustments
```

## GitHub Summary

```text
Paycheck Calculator v0.2

- Added itemized taxes, deductions, and other paycheck adjustments.
- Added Add Tax, Add Deduction, and Add Other Adjustment modals.
- Added suggested pills for common taxes, deductions, and adjustments.
- Added Static Amount / Percentage selector support.
- Updated results to show Before Taxes (Gross), Estimated Taxes, Deductions, Other Adjustments, Take-Home Pay (Net), and Effective Hourly Take-Home.
- Updated Copy Results and Print Report output for itemized adjustments.
- Updated Paycheck documentation, manifests, master changelog, master roadmap, and release history.
- Updated STANDARDS.md with Shared Pattern Consistency guidance.
- Preserved hidden ad slots and no-live-ad behavior.
```

## Upload Instructions

Copy the updated Paycheck files into:

```text
/paycheck/
```

Copy the updated Home-level docs into the site root:

```text
STANDARDS.md
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
INSTALL.md
```

## Validation Checklist

- Open `/paycheck/`.
- Confirm footer says `Signal Labs · Paycheck Calculator · v0.2`.
- Confirm build card says `v0.2`.
- Confirm local cache-busting references use `v=0.2`.
- Confirm Add Tax modal works.
- Confirm Add Deduction modal works.
- Confirm Add Other Adjustment modal works.
- Confirm suggested pills appear inside the modal.
- Confirm Static Amount / Percentage selector works.
- Confirm Copy Results works.
- Confirm Print Report opens a populated report window.
- Confirm saved settings load.
- Confirm hidden ad slots do not display.
