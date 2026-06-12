## v0.17.1 UI Debt Audit

Signal Schedule v0.17.1 cleans up UI debt introduced during the foundation releases.

This release removes nonessential dashboard-style preview panels for Analytics, Notifications, and Goal Mode. Those concepts remain part of the architecture, but they now live primarily in documentation, text output, and future data-model planning instead of requiring separate render functions.

### Why this release exists

The same failure kept recurring: a section would be registered for rendering, but the matching render function would be missing or undefined. v0.17.1 reduces that risk by shrinking the render registry and adding explicit validation before packaging.

### Rule 23

Foundation releases should not create new preview panels unless the UI itself is the purpose of the release. Prefer documentation, data-model notes, workflow standards, manifests, and small conceptual changes.
