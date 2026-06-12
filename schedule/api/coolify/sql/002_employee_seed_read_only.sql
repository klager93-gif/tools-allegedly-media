-- Signal Schedule v1.7.0 sample employee seed
-- Optional seed for local/Coolify test databases.

insert into employees (
  id, agency_id, employee_code, first_name, last_name, display_name,
  minimum_staffing_role, position, rank, department, division, location,
  shift_group, assigned_pattern, status, gender, overtime_eligible, mandate_eligible, qualifications
) values
('emp-kcso-001', 'agency-kcso-corrections', 'KCSO-1001', 'Alex', 'Rivera', 'Alex Rivera', 'Corrections Officer', 'Correctional Officer', 'Officer', 'Corrections', 'Operations', 'Main Jail', 'A Nights', '12-hour nights', 'active', null, true, true, '["Booking", "Transport"]'::jsonb),
('emp-dispatch-001', 'agency-central-dispatch', 'CCD-301', 'Morgan', 'Price', 'Morgan Price', 'Dispatcher', 'Dispatcher', null, 'Communications', 'Operations', 'Main Center', 'A Days', '2-2-3 days', 'active', null, true, true, '["Calltaking", "Police Radio", "NCIC"]'::jsonb),
('emp-fire-001', 'agency-metro-fire', 'MFD-201', 'Jordan', 'Smith', 'Jordan Smith', 'Paramedic', 'Firefighter / Paramedic', 'Firefighter', 'Suppression', 'Operations', 'Station 1', 'Gold', '24/48', 'active', null, true, true, '["Paramedic", "Driver"]'::jsonb),
('emp-police-001', 'agency-north-park-police', 'NPPD-401', 'Sam', 'Carter', 'Sam Carter', 'Patrol Officer', 'Patrol Officer', 'Officer', 'Patrol', 'Afternoons', 'District 1', 'Afternoons', '5-2', 'active', null, true, true, '["FTO"]'::jsonb)
on conflict (id) do nothing;
