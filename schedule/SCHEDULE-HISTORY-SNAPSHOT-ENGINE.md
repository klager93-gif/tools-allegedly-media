# Schedule History & Snapshot Engine — v5.1.0

Signal Schedule v5.1.0 corrects the product model before revision history grows deeper.

## Core principle

```text
One Agency
One Living Schedule
Many Snapshots
```

The product should not feel like an agency creates separate monthly schedule files. The agency has one continuous schedule timeline. Drafts, published versions, and backup versions are snapshots of that same living schedule.

## User-facing changes

- `Schedule History` replaces `legacy saved-schedule list` in navigation and UI language.
- `history.html` replaces `legacy saved-schedule page` as the schedule history workspace.
- The builder links to Schedule History rather than a separate saved schedule list.
- Snapshot language is used for IDs, restore points, publishing, and export helpers.

## Storage note

The existing migration 044 table and `/api/saved-schedules` API remain in place for compatibility. The user-facing model is now schedule history and snapshots. A future migration may rename internal storage after the model stabilizes.

## Not included yet

- Full visual schedule diffing.
- Multi-snapshot compare engine.
- Deep restore audit ledger.
- Employee-facing published schedule timeline.
