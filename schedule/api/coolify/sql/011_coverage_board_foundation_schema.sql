-- Signal Schedule v2.5.0 Coverage Board foundation schema preview
-- Future production migration for daily coverage rows, minimum gaps, and OT opportunity linkage.

CREATE TABLE IF NOT EXISTS schedule_coverage_blocks (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL,
    coverage_date DATE NOT NULL,
    assignment_name TEXT NOT NULL,
    role_name TEXT NOT NULL,
    shift_name TEXT NOT NULL,
    location_name TEXT,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    minimum_required INTEGER NOT NULL DEFAULT 0,
    target_staffing INTEGER NOT NULL DEFAULT 0,
    maximum_staffing INTEGER NOT NULL DEFAULT 0,
    assigned_count INTEGER NOT NULL DEFAULT 0,
    pending_leave_count INTEGER NOT NULL DEFAULT 0,
    pending_training_count INTEGER NOT NULL DEFAULT 0,
    open_slots INTEGER NOT NULL DEFAULT 0,
    target_open_slots INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL,
    risk TEXT,
    linked_open_shift_id TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_schedule_coverage_blocks_agency_date
ON schedule_coverage_blocks (agency_id, coverage_date);

INSERT INTO schema_migrations (version, name)
VALUES ('011', 'coverage_board_foundation')
ON CONFLICT (version) DO NOTHING;
