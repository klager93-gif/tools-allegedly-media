## v0.15.0 Analytics Foundation

Signal Schedule v0.15.0 adds the Analytics Foundation while preserving the v0.14 Bidding and Opportunity Foundation and v0.14.1 render registry repair.

This release is still browser-only and architecture-first. Analytics are modeled as facts, report families, trend signals, forecasts, and explanations rather than finished dashboards.

### Added

- Analytics metric planning for hours, benefits, overtime/fairness, and coverage trends.
- Report family previews for pay-period summaries, mandation history, benefit ledgers, and coverage review.
- Trend signal previews for weekend load concentration, repeated shortages, and benefit burn rate.
- Forecast planning for coverage risk, mandate risk, and benefit liability.
- Data-model preview now includes Analytics Foundation object counts.

### Preserved

- Agency Profile Foundation.
- Employee Profile Foundation.
- Pattern Foundation.
- Event Foundation.
- Benefit Ledger Foundation.
- Rule Engine Foundation.
- Coverage Engine Foundation.
- Schedule Views Foundation.
- Fairness Foundation.
- Explainability Foundation.
- Mandation Foundation.
- Bidding and Opportunity Foundation.
- Guarded render registry from v0.14.1.

### Principle

Analytics must be built from stored facts, not assumptions. Reports should explain where totals came from and what rule or event caused them.
