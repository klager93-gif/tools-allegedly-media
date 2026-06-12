## v0.19.0 Database Planning

v0.19.0 does not create database tables yet. It prepares the concepts that v1.0 should persist.

### Minimum table families for v1.0

- agencies and agency_settings
- users and roles
- employees
- employee_assignments
- ranks and qualifications
- shifts and patterns
- pattern_cycle_days
- schedule_events
- requests
- opportunities
- bids
- awards
- benefit_ledger_entries
- coverage_requirements
- rule_evaluations
- explanations
- notifications
- goals
- audit_records

### Design rule

Do not create tables that hide assumptions. Store the fact explicitly, then let engines evaluate it.
