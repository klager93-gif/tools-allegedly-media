# Signal Labs Overtime v0.9.9.1 Release

## Versions

```text
Overtime: v0.9.9.1 — Deductions & Adjustments Pattern Sync
Paycheck: v0.2 — Deductions & Adjustments
Home: v0.5.1 — Navigation Refresh & Paycheck Integration
Time Off: v0.9.9 — Pre-1.0 Cleanup & Report Fix
```

## Backup Reminder

Before uploading this release, back up the current live version.

## Backup Folder Name

```text
2026-06-08-before-overtime-v0.9.9.1-deductions-adjustments-pattern-sync
```

## GitHub Title

```text
Overtime v0.9.9.1 — Deductions & Adjustments Pattern Sync
```

## GitHub Summary

```text
Overtime Calculator v0.9.9.1

- Synced Overtime adjustment modal styling and behavior with the Paycheck v0.2 shared Deductions & Adjustments pattern.
- Added shared suggested pill and amount-type pill class aliases while preserving existing Overtime class names.
- Updated deduction and other adjustment suggestions to better match Paycheck defaults.
- Added percentage display support for deduction and other adjustment list items.
- Standardized Static Amount / Percentage modal wording and behavior.
- Updated Overtime documentation, manifests, master changelog, master roadmap, and release history.
- Preserved Overtime-specific calculations, saved settings, Print Report, Copy Results, optional sections, and Target Pay behavior.
```

## Upload Instructions

Copy the updated Overtime files into the matching live location:

```text
overtime/* -> /overtime/
```

Also copy the updated Home-level documentation files into the site root:

```text
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
INSTALL.md
```

## Validation Checklist

- Open `/overtime/`.
- Confirm footer says `Signal Labs · Overtime Calculator · v0.9.9.1`.
- Confirm build card says `v0.9.9.1`.
- Confirm stylesheet and script cache-busting references use `v=0.9.9.1`.
- Confirm Add Tax modal suggested pills appear inside the modal.
- Confirm Add Deduction modal suggested pills appear inside the modal.
- Confirm Add Other Adjustment modal suggested pills appear inside the modal.
- Confirm Static Amount / Percentage controls appear inside the modal for deductions and other adjustments.
- Confirm percentage deductions display as percentages in the added item list.
- Confirm Copy Results works.
- Confirm Print Report opens a populated report window.
- Confirm saved settings still load.
