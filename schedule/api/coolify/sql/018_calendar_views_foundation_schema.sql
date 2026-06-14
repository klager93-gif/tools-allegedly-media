-- Signal Schedule v2.12.0 — Calendar Views Foundation
-- Creates preview-ready tables for week/day calendar display and shortcode rendering.

CREATE TABLE IF NOT EXISTS calendar_view_presets (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'agency-default',
    name TEXT NOT NULL,
    view_type TEXT NOT NULL CHECK (view_type IN ('month', 'week', 'day')),
    filter_scope TEXT NOT NULL DEFAULT 'all_employees',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS calendar_view_events (
    id TEXT PRIMARY KEY,
    agency_id TEXT NOT NULL DEFAULT 'agency-default',
    employee_id TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    shortcode TEXT NOT NULL,
    display_title TEXT NOT NULL,
    detail_text TEXT,
    status TEXT NOT NULL DEFAULT 'preview',
    source_type TEXT NOT NULL DEFAULT 'manual',
    source_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schema_migrations (version, name)
VALUES ('018', 'calendar_views_foundation')
ON CONFLICT DO NOTHING;
