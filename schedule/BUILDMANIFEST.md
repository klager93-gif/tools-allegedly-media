# Signal Schedule v3.3.0 Build Manifest

Release: Signal Schedule v3.3.0 — Desktop UX Refinement
Date: 2026-06-15
Database migration required: No

## Summary

Refines the desktop application shell introduced in v3.2.0. The main UX change is replacing separated pill-style sidebar hover menus with connected, box-style flyout panels and setting Midnight as the default Schedule theme when no user preference exists.

## Key Changes

- Replaced floating/separated pill flyouts with connected box-style flyout panels.
- Tightened sidebar hover/focus behavior for desktop use.
- Reduced visual gaps between submenu items.
- Kept one-column sidebar navigation with grouped flyouts.
- Set Midnight as the default theme for new users/no saved preference.
- Preserved Schedule-only scope; no Paycheck, Overtime, Timeoff, or root shared asset styling changes.

## Files Affected

- schedule/app-shell.css
- schedule/app-shell.js
- schedule/assets/themes/*.css
- schedule/*.html (version/cache metadata only where applicable)
- schedule/README.md
- schedule/ROADMAP.md
- schedule/CHANGELOG.md
- schedule/PUBLIC_CHANGELOG.md
- schedule/ADMIN_CHANGELOG.md
- schedule/FILEMANIFEST.md
- schedule/FILEMANIFEST.generated.txt
- schedule/BUILDMANIFEST.md
- schedule/LATEST_RELEASE.md

## Files Not Touched

- overtime/**
- paycheck/**
- timeoff/**
- assets/**

## Validation

- JavaScript syntax checked.
- JSON parsed.
- HTML asset references checked.
- ZIP integrity checked.
- Confirmed non-Schedule files were not modified compared with v3.2.0 baseline.
