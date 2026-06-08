# Signal Labs Paycheck v0.3 Release

## Versions

```text
Paycheck: v0.3 — Hours & Earnings
Home: v0.5.1 — Navigation Refresh & Paycheck Integration
Overtime: Frozen except critical fixes / pattern conflicts
Time Off: v0.9.9 — Pre-1.0 Cleanup & Report Fix
```

## Backup Reminder

Before uploading this release, back up the current live version.

## Backup Folder Name

```text
2026-06-08-before-paycheck-v0.3-hours-earnings
```

## GitHub Title

```text
Paycheck v0.3 — Hours & Earnings
```

## GitHub Summary

```text
Paycheck Calculator v0.3

- Rebuilt the first input section as Hours & Earnings.
- Added separate Regular Hours, Overtime Hours, and Double Time Hours inputs.
- Added Benefit / Paid Leave hour pills for Vacation, Sick, Personal, Holiday, Comp Time, Bereavement, Training, and Other.
- Added dynamic paid-leave hour rows that appear only when selected.
- Added a smoother empty state when no benefit time is entered.
- Added a Pay Details section for hourly rate, pay period, currency, overtime multiplier, and double time multiplier.
- Added custom multiplier support for overtime and double time.
- Updated gross pay, Copy Results, and Print Report output for the new hours and earnings structure.
- Updated Paycheck documentation, manifests, master changelog, master roadmap, and release history.
- Preserved Deductions & Adjustments, saved settings, hidden ad slots, shared navigation, and no-live-ad behavior.
```

## Upload Instructions

Copy the updated Paycheck files into:

```text
/paycheck/
```

Copy the updated Home-level docs into the site root:

```text
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
INSTALL.md
```

## Validation Checklist

- Open `/paycheck/`.
- Confirm footer says `Signal Labs · Paycheck Calculator · v0.3`.
- Confirm build card says `v0.3`.
- Confirm local cache-busting references use `v=0.3`.
- Confirm Regular Hours, Overtime Hours, and Double Time Hours inputs work.
- Confirm Benefit / Paid Leave pills render.
- Confirm benefit hour rows appear only when selected.
- Confirm empty benefit-time state appears when no benefit hours are selected.
- Confirm hourly rate, pay period, currency, overtime multiplier, and double time multiplier work.
- Confirm custom multiplier fields show only when custom is selected.
- Confirm Deductions & Adjustments still work.
- Confirm Copy Results works.
- Confirm Print Report opens a populated report window.
- Confirm saved settings load.
- Confirm hidden ad slots do not display.
