# Repository Standards

Preserve all live top-level folders during full replacements.

Root front-desk files stay at root. Operational docs live in docs/. Build files live in build/. Standards live in standards/.


## Current Release Workflow

Release archives are backups. Signal Labs stores complete release ZIPs in dated `Releases/` folders and does not require duplicate backup folders for normal releases.


## Tool-Owned Infrastructure

Tools own their infrastructure. Schedule-specific APIs, functions, mock endpoints, adapters, and backend planning files belong inside `/schedule/` unless they are intentionally shared by multiple tools.
