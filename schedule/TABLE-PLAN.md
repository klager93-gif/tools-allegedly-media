# Signal Schedule Table Plan — v0.99.1

## Core tables for early v1.x

### agencies
Stores agency identity, type, timezone, week start, pay period start, terminology profile, and default rules.

### users
Stores login identity later. Users are not employees. A user may be linked to one employee, multiple employees, or no employee.

### employees
Stores employee identity, status, seniority, agency relationship, and base employment facts.

### employee_assignments
Stores department, unit, position, shift group, assigned pattern, supervisor relationships, and effective dates.

### shift_definitions
Stores named shifts, start/end times, paid minutes, break rules, and agency-specific labels.

### schedule_events
Stores actual schedule-changing events: work, leave, training, overtime, mandation, trades, callback, court, details, and overrides.

### requests
Stores employee-initiated requests such as leave, trade, and voluntary overtime interest.

### opportunities
Stores management-posted opportunities such as open overtime, special assignments, bids, or details.

### bids
Stores employee responses to opportunities.

### awards
Stores the selected result of a bid or opportunity process.

### benefit_ledger
Stores accruals, usage, corrections, payouts, carryovers, and manual adjustments. Balances are calculated from entries.

### rules
Stores named rules, source/policy references, priority, effective dates, and evaluation type.

### coverage_requirements
Stores staffing needs by role, time block, location/unit, qualifications, and minimum count.

### explanations
Stores machine-readable and human-readable explanation chains.

### notifications
Stores future notification events, audience, channel, status, suppression, escalation, and delivery history.

### goals
Stores optimization goals such as reduce mandates, improve fairness, reduce overtime cost, or maximize leave approvals.

### audit_logs
Stores who changed what, when, from where, and why.
