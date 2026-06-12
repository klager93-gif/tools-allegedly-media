# Build Manifest — Signal Schedule v0.17.0 Goal Mode Foundation

## Source

- Source ZIP: `signal-schedule-v0.16.0-notifications-foundation.zip`
- Build type: Architecture foundation release + repair release

## Output

- Output ZIP: `signal-schedule-v0.17.0-goal-mode-foundation.zip`

## Changes

- Added Goal Mode Foundation data arrays, defaults, renderers, registry entries, and preview sections.
- Added goal profiles, goal tradeoffs, recommendations, and audit examples.
- Repaired missing v0.16.0 notification renderer functions.
- Updated Schedule visible version references and cache-busting to v0.17.0.
- Updated README, HOWTO, ROADMAP, RULE-ENGINE, DATABASE-PLAN, public changelog, admin changelog, and master roadmap.

## Validation

- `node --check schedule/script.js` passed.
- Render registry validation passed: every safeRender string has a function and registry entry.
- ZIP integrity check passed.
- SHA256 sums regenerated.
