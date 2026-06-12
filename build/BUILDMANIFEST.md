# Signal Schedule v0.6.0 — Event Foundation

Build date: 2026-06-11
Source: signal-schedule-v0.5.0-pattern-foundation.zip

## Purpose

Adds the Event Foundation to Signal Schedule. This release introduces behavior-aware event type definitions and sample schedule events that modify expected pattern work.

## Files Changed

root/
- index.html
- README.md
- ROADMAP.md
- MASTER-CHANGELOG.md

schedule/
- index.html
- script.js
- style.css
- README.md
- ROADMAP.md
- DATABASE-PLAN.md
- RULE-ENGINE.md
- HOWTO.md
- CHANGELOG.md

build/
- BUILDMANIFEST.md
- FILEMANIFEST.md
- SHA256SUMS.txt

## Changed

- Added Event Foundation panels.
- Added Event Behavior Preview panels.
- Added event type definitions for vacation, sick, overtime, mandation, training, and trades.
- Expanded sample schedule events with category, status, start/end, paid minutes, coverage impact, benefit impact, behavior categories, reason, and source.
- Updated visible Schedule version references to v0.6.0.
- Updated root and Schedule documentation.

## Not Changed

- No database storage was added.
- No event CRUD was added.
- No approval workflow was added.
- No benefit ledger automation was added.
- No mandation rotation or trade workflow was added.
- No final schedule generation was added.
