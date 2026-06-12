## v0.15.0 Analytics Data Planning

No database is introduced in this release.

Future database planning should support analytics without recalculating everything from screen text.

Likely future tables/modules:

- analytics_metric_definitions
- analytics_report_definitions
- analytics_report_runs
- analytics_trend_signals
- analytics_forecasts
- analytics_forecast_inputs
- analytics_audit_links

Source tables will likely include:

- employees
- employee_traits
- assignments
- schedule_events
- benefit_ledger
- coverage_requirements
- bid_rounds
- bid_awards
- voluntary_overtime_requests
- posted_overtime_opportunities
- mandation_history
- fairness_history
- explanation_logs

The goal is traceable reporting: every number should link back to the facts that produced it.
