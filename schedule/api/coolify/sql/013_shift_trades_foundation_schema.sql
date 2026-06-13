-- Signal Schedule v2.7.1 — Shift Trades & Swap Requests Foundation
-- Preview schema for future production trade/swap approval tracking.
CREATE TABLE IF NOT EXISTS schedule_shift_trade_requests (
    id text PRIMARY KEY,
    agency_id text NOT NULL,
    request_type text NOT NULL,
    status text NOT NULL,
    from_employee_id text NOT NULL,
    to_employee_id text,
    from_assignment_id text,
    to_assignment_id text,
    requested_start timestamptz,
    requested_end timestamptz,
    reason text,
    coverage_impact text,
    eligibility_status text,
    warnings jsonb DEFAULT '[]'::jsonb,
    qualification_checks jsonb DEFAULT '[]'::jsonb,
    admin_recommendation text,
    audit_events jsonb DEFAULT '[]'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

INSERT INTO schema_migrations (version, name)
VALUES ('013', 'shift_trades_foundation')
ON CONFLICT (version) DO NOTHING;
