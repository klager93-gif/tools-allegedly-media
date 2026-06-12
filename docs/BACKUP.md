# Release Archives and Restore Points

Signal Labs no longer uses duplicate local backup folders as the normal release workflow.

## Rule 26 — Release Archives Are Backups

Released ZIP files are complete snapshots and are considered the authoritative backup and restore point for each release.

Recommended local structure:

```text
Releases/
  2026-06-11/
    signal-schedule-v0.2.0-core-engine-blueprint.zip
    signal-schedule-v0.2.1-pattern-and-coverage-rule-planning.zip
  2026-06-12/
    signal-labs-home-v0.9.9.6-release-archive-standard.zip
```

Retired normal workflow:

```text
Backups/
  YYYY-MM-DD Before <Build Title>/
```

Manual folder backups are only recommended for risky experiments, large manual edits outside Git, temporary sandboxes, or unreleased testing.

The preferred workflow is:

```text
Current
↓
Release ZIP
↓
GitHub
```

not:

```text
Current
↓
Backup Folder
↓
Release ZIP
↓
GitHub
```
