# Paycheck v0.8.2 Restore Instructions

## Before Upload

Confirm an external backup exists.

Suggested backup folder:

`2026-06-10-before-paycheck-v0.8.2-inline-result-details`

## Upload

Replace the existing `/paycheck/` files with the files from this package.

## Verify

After deployment, check:

- `/paycheck/` loads.
- Footer shows `Signal Labs · Paycheck Calculator · v0.8.2`.
- Build card shows `Build: v0.8.2`.
- Theme shows `Inline Result Details`.
- Results detail rows are visible without opening a Details box.
- Changelog footer link points to `PUBLIC_CHANGELOG.md`.
- Calculator still calculates gross pay, taxes, deductions, net pay, and target pay.

## Rollback

Restore the external backup folder if a critical issue appears.
