## v0.17.0 Goal Mode Foundation

Signal Schedule v0.17.0 adds Goal Mode Foundation while preserving v0.16 Notifications, v0.15 Analytics, v0.14 Bidding/Opportunity, and v0.14.1 render registry protections.

This release remains browser-only and architecture-first. Goal Mode defines what the engine is trying to accomplish before it recommends schedule actions.

Goal Mode planning includes:

- Goal profiles such as reduce mandates, improve fairness, maximize leave approvals, and stabilize coverage.
- Tradeoff rules that explain which goal wins when goals conflict.
- Recommendation examples that connect goals to source facts and possible actions.
- Audit examples for losing goals, human overrides, and no-safe-action outcomes.

Important repair included in this release:

- v0.16.0 had notification preview renderers registered but not defined. v0.17.0 restores those notification render functions and adds a validation check to prevent this class of breakage.

Goal Mode must use stored facts, rule outcomes, analytics, notifications, coverage, fairness, bidding, mandation, and explainability. It should never make hidden recommendations from assumptions.
