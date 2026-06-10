# Paycheck v0.8.4 Restore Instructions

## Before Upload

Confirm an external backup exists.

Suggested backup folder:

`2026-06-10-before-paycheck-v0.8.4-result-density-cleanup`

## Upload

Replace the existing `/paycheck/` files with the files from this package.

## Verify

After deployment, check:

- `/paycheck/` loads.
- Footer shows `Signal Labs · Paycheck Calculator · v0.8.4`.
- Build card shows `Build: v0.8.4`.
- Theme shows `Result Density Cleanup`.
- Results do not show zero-value clutter rows.
- Rows appear when premium hours, paid leave, other earnings, taxes, deductions, or target values exist.
- Pills are smaller on desktop and mobile.
- Mobile layout requires less vertical scrolling.
- Changelog footer link points to `PUBLIC_CHANGELOG.md`.
- Calculator still calculates gross pay, taxes, deductions, net pay, and target pay.

## Rollback

Restore the external backup folder if a critical issue appears.
