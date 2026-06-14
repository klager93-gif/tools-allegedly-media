/*
Signal Labs Tool File: schedule/api/coolify/db/postgres.js
Version: v5.1.0
Purpose: Optional Postgres employee, snapshot, and publish-state adapter for the Coolify API skeleton.

JSON seed mode remains the default. Postgres functions only run when DATA_MODE=postgres and DATABASE_URL are set.
*/

function isEnabled(value) {
  return String(value || '').trim().toLowerCase() === 'true';
}

export function shouldUsePostgresEmployees() {
  return String(process.env.DATA_MODE || '').trim().toLowerCase() === 'postgres' && Boolean(String(process.env.DATABASE_URL || '').trim());
}

export function areEmployeeWritesEnabled() {
  return isEnabled(process.env.EMPLOYEE_WRITES_ENABLED);
}

export function areScheduleWritesEnabled() {
  return isEnabled(process.env.SCHEDULE_WRITES_ENABLED);
}

async function getPgPool() {
  if (!shouldUsePostgresEmployees()) {
    throw new Error('Postgres mode is not active. Set DATA_MODE=postgres and DATABASE_URL.');
  }
  const pg = await import('pg').catch(() => {
    throw new Error('Postgres driver dependency "pg" is not installed in this API container.');
  });
  const Pool = pg.Pool || (pg.default && pg.default.Pool);
  if (!Pool) throw new Error('Unable to initialize pg Pool.');
  if (!globalThis.__signalSchedulePgPool) {
    globalThis.__signalSchedulePgPool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return globalThis.__signalSchedulePgPool;
}

export async function checkPostgresHealth() {
  if (!shouldUsePostgresEmployees()) return { configured: false, reachable: false, message: 'Postgres mode is not active.' };
  const pool = await getPgPool();
  await pool.query('select 1 as ok');
  return { configured: true, reachable: true, message: 'Postgres reachable.' };
}

function mapEmployeeRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    agencyId: row.agency_id,
    employeeCode: row.employee_code,
    firstName: row.first_name,
    middleName: row.middle_name,
    lastName: row.last_name,
    preferredName: row.preferred_name,
    displayName: row.display_name,
    name: row.display_name || [row.first_name, row.last_name].filter(Boolean).join(' '),
    minimumStaffingRole: row.minimum_staffing_role,
    position: row.position,
    rank: row.rank,
    department: row.department,
    division: row.division,
    location: row.location,
    shiftGroup: row.shift_group,
    assignedPattern: row.assigned_pattern,
    status: row.status,
    gender: row.gender,
    overtimeEligible: Boolean(row.overtime_eligible),
    mandateEligible: Boolean(row.mandate_eligible),
    qualifications: Array.isArray(row.qualifications) ? row.qualifications : [],
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function validateEmployeePayload(payload) {
  const body = payload && typeof payload === 'object' ? payload : {};
  const errors = [];
  if (!String(body.agencyId || body.agency_id || '').trim()) errors.push('agencyId is required.');
  if (!String(body.employeeCode || body.employee_code || '').trim()) errors.push('employeeCode is required.');
  if (!String(body.firstName || body.first_name || '').trim()) errors.push('firstName is required.');
  if (!String(body.lastName || body.last_name || '').trim()) errors.push('lastName is required.');
  if (!String(body.minimumStaffingRole || body.minimum_staffing_role || body.role || '').trim()) errors.push('minimumStaffingRole is required.');
  if (errors.length) {
    const error = new Error(errors.join(' '));
    error.validationErrors = errors;
    throw error;
  }
  return body;
}

function employeeValues(body, existingId) {
  const firstName = String(body.firstName || body.first_name || '').trim();
  const lastName = String(body.lastName || body.last_name || '').trim();
  const displayName = String(body.displayName || body.display_name || [firstName, lastName].filter(Boolean).join(' ')).trim();
  return {
    id: existingId || String(body.id || (globalThis.crypto && crypto.randomUUID ? crypto.randomUUID() : `emp-${Date.now()}`)),
    agency_id: String(body.agencyId || body.agency_id || '').trim(),
    employee_code: String(body.employeeCode || body.employee_code || '').trim(),
    first_name: firstName,
    middle_name: body.middleName || body.middle_name || null,
    last_name: lastName,
    preferred_name: body.preferredName || body.preferred_name || null,
    display_name: displayName,
    minimum_staffing_role: body.minimumStaffingRole || body.minimum_staffing_role || body.role || null,
    position: body.position || null,
    rank: body.rank || null,
    department: body.department || null,
    division: body.division || null,
    location: body.location || null,
    shift_group: body.shiftGroup || body.shift_group || null,
    assigned_pattern: body.assignedPattern || body.assigned_pattern || null,
    status: body.status || 'active',
    gender: body.gender || null,
    overtime_eligible: body.overtimeEligible !== false,
    mandate_eligible: body.mandateEligible !== false,
    qualifications: JSON.stringify(Array.isArray(body.qualifications) ? body.qualifications : []),
    notes: body.notes || null
  };
}

export async function listEmployeesFromPostgres() {
  const pool = await getPgPool();
  const result = await pool.query('select * from employees where status <> $1 order by display_name asc, employee_code asc', ['deleted']);
  return result.rows.map(mapEmployeeRow);
}

export async function getEmployeeFromPostgres(id) {
  const pool = await getPgPool();
  const result = await pool.query('select * from employees where id = $1 limit 1', [id]);
  return mapEmployeeRow(result.rows[0]);
}

export async function createEmployeeInPostgres(payload) {
  const body = validateEmployeePayload(payload);
  const v = employeeValues(body);
  const pool = await getPgPool();
  const result = await pool.query(`insert into employees (id, agency_id, employee_code, first_name, middle_name, last_name, preferred_name, display_name, minimum_staffing_role, position, rank, department, division, location, shift_group, assigned_pattern, status, gender, overtime_eligible, mandate_eligible, qualifications, notes) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21::jsonb,$22) returning *`, [v.id,v.agency_id,v.employee_code,v.first_name,v.middle_name,v.last_name,v.preferred_name,v.display_name,v.minimum_staffing_role,v.position,v.rank,v.department,v.division,v.location,v.shift_group,v.assigned_pattern,v.status,v.gender,v.overtime_eligible,v.mandate_eligible,v.qualifications,v.notes]);
  return mapEmployeeRow(result.rows[0]);
}

export async function updateEmployeeInPostgres(id, payload) {
  const body = validateEmployeePayload(payload);
  const v = employeeValues(body, id);
  const pool = await getPgPool();
  const result = await pool.query(`update employees set agency_id=$2, employee_code=$3, first_name=$4, middle_name=$5, last_name=$6, preferred_name=$7, display_name=$8, minimum_staffing_role=$9, position=$10, rank=$11, department=$12, division=$13, location=$14, shift_group=$15, assigned_pattern=$16, status=$17, gender=$18, overtime_eligible=$19, mandate_eligible=$20, qualifications=$21::jsonb, notes=$22, updated_at=now() where id=$1 returning *`, [v.id,v.agency_id,v.employee_code,v.first_name,v.middle_name,v.last_name,v.preferred_name,v.display_name,v.minimum_staffing_role,v.position,v.rank,v.department,v.division,v.location,v.shift_group,v.assigned_pattern,v.status,v.gender,v.overtime_eligible,v.mandate_eligible,v.qualifications,v.notes]);
  return mapEmployeeRow(result.rows[0]);
}

export async function softDeleteEmployeeInPostgres(id) {
  const pool = await getPgPool();
  const result = await pool.query('update employees set status=$2, updated_at=now() where id=$1 returning *', [id, 'deleted']);
  return mapEmployeeRow(result.rows[0]);
}


function mapSavedScheduleRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    agencyId: row.agency_id,
    name: row.name,
    status: row.status,
    scheduleStartDate: row.schedule_start_date,
    scheduleEndDate: row.schedule_end_date,
    source: row.source,
    payload: row.payload || {},
    validationSummary: row.validation_summary || {},
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function validateSavedSchedulePayload(payload) {
  const body = payload && typeof payload === 'object' ? payload : {};
  const errors = [];
  if (!String(body.agencyId || body.agency_id || '').trim()) errors.push('agencyId is required.');
  if (!String(body.name || '').trim()) errors.push('name is required.');
  if (!String(body.scheduleStartDate || body.schedule_start_date || '').trim()) errors.push('scheduleStartDate is required.');
  if (!String(body.scheduleEndDate || body.schedule_end_date || '').trim()) errors.push('scheduleEndDate is required.');
  if (!body.payload || typeof body.payload !== 'object' || Array.isArray(body.payload)) errors.push('payload object is required.');
  if (errors.length) {
    const error = new Error(errors.join(' '));
    error.validationErrors = errors;
    throw error;
  }
  return body;
}

function savedScheduleValues(body, existingId) {
  return {
    id: existingId || String(body.id || (globalThis.crypto && crypto.randomUUID ? crypto.randomUUID() : `sched-${Date.now()}`)),
    agency_id: String(body.agencyId || body.agency_id || '').trim(),
    name: String(body.name || '').trim(),
    status: String(body.status || 'draft').trim(),
    schedule_start_date: String(body.scheduleStartDate || body.schedule_start_date || '').trim(),
    schedule_end_date: String(body.scheduleEndDate || body.schedule_end_date || '').trim(),
    source: String(body.source || 'builder').trim(),
    payload: JSON.stringify(body.payload || {}),
    validation_summary: JSON.stringify(body.validationSummary || body.validation_summary || {}),
    created_by: body.createdBy || body.created_by || null,
    updated_by: body.updatedBy || body.updated_by || body.createdBy || body.created_by || null,
    published_at: body.publishedAt || body.published_at || null
  };
}

export async function listSavedSchedulesFromPostgres() {
  const pool = await getPgPool();
  const result = await pool.query('select * from schedule_saved_schedules where status <> $1 order by updated_at desc, created_at desc', ['deleted']);
  return result.rows.map(mapSavedScheduleRow);
}

export async function getSavedScheduleFromPostgres(id) {
  const pool = await getPgPool();
  const result = await pool.query('select * from schedule_saved_schedules where id = $1 and status <> $2 limit 1', [id, 'deleted']);
  return mapSavedScheduleRow(result.rows[0]);
}

export async function createSavedScheduleInPostgres(payload) {
  const body = validateSavedSchedulePayload(payload);
  const v = savedScheduleValues(body);
  const pool = await getPgPool();
  const result = await pool.query(`insert into schedule_saved_schedules (id, agency_id, name, status, schedule_start_date, schedule_end_date, source, payload, validation_summary, created_by, updated_by, published_at) values ($1,$2,$3,$4,$5::date,$6::date,$7,$8::jsonb,$9::jsonb,$10,$11,$12::timestamptz) returning *`, [v.id,v.agency_id,v.name,v.status,v.schedule_start_date,v.schedule_end_date,v.source,v.payload,v.validation_summary,v.created_by,v.updated_by,v.published_at]);
  return mapSavedScheduleRow(result.rows[0]);
}

export async function updateSavedScheduleInPostgres(id, payload) {
  const body = validateSavedSchedulePayload({ ...payload, id });
  const v = savedScheduleValues(body, id);
  const pool = await getPgPool();
  const result = await pool.query(`update schedule_saved_schedules set agency_id=$2, name=$3, status=$4, schedule_start_date=$5::date, schedule_end_date=$6::date, source=$7, payload=$8::jsonb, validation_summary=$9::jsonb, updated_by=$10, published_at=$11::timestamptz, updated_at=now() where id=$1 and status <> 'deleted' returning *`, [v.id,v.agency_id,v.name,v.status,v.schedule_start_date,v.schedule_end_date,v.source,v.payload,v.validation_summary,v.updated_by,v.published_at]);
  return mapSavedScheduleRow(result.rows[0]);
}


export async function publishSavedScheduleInPostgres(id, payload = {}) {
  const pool = await getPgPool();
  const actor = payload.publishedBy || payload.updatedBy || payload.updated_by || payload.createdBy || payload.created_by || 'browser-publisher';
  const result = await pool.query(`update schedule_saved_schedules set status=$2, published_at=now(), updated_by=$3, updated_at=now() where id=$1 and status <> 'deleted' returning *`, [id, 'published', actor]);
  return mapSavedScheduleRow(result.rows[0]);
}

export async function softDeleteSavedScheduleInPostgres(id) {
  const pool = await getPgPool();
  const result = await pool.query('update schedule_saved_schedules set status=$2, updated_at=now() where id=$1 returning *', [id, 'deleted']);
  return mapSavedScheduleRow(result.rows[0]);
}
