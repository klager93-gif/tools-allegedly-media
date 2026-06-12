/*
Signal Labs Tool File: schedule/api/coolify/db/postgres.js
Version: v1.8.0
Purpose: Postgres connection helper for employee read and protected CRUD foundation.

Rules:
- Real credentials must come from Coolify environment variables.
- Employee writes are disabled unless EMPLOYEE_WRITES_ENABLED=true.
- Write routes require ADMIN_API_KEY through Authorization: Bearer or x-admin-api-key.
- Deletes are soft deletes only.
*/
import pg from 'pg';

const { Pool } = pg;

let pool = null;

export function isPostgresConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function shouldUsePostgresEmployees() {
  const explicitFlag = String(process.env.USE_POSTGRES_EMPLOYEES || '').toLowerCase() === 'true';
  const dataModePostgres = String(process.env.DATA_MODE || '').toLowerCase() === 'postgres';
  return (explicitFlag || dataModePostgres) && isPostgresConfigured();
}

export function areEmployeeWritesEnabled() {
  return String(process.env.EMPLOYEE_WRITES_ENABLED || '').toLowerCase() === 'true';
}

export function getPool() {
  if (!isPostgresConfigured()) {
    throw new Error('DATABASE_URL is not configured.');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : undefined
    });
  }

  return pool;
}

export async function checkPostgresHealth() {
  if (!isPostgresConfigured()) {
    return { configured: false, reachable: false, message: 'DATABASE_URL not configured.' };
  }

  const result = await getPool().query('select 1 as ok');
  return { configured: true, reachable: result.rows?.[0]?.ok === 1, message: 'Postgres reachable.' };
}

const EMPLOYEE_SELECT = `
  select
    id,
    agency_id as "agencyId",
    employee_code as "employeeCode",
    first_name as "firstName",
    last_name as "lastName",
    display_name as "displayName",
    minimum_staffing_role as "minimumStaffingRole",
    position,
    rank,
    department,
    division,
    location,
    shift_group as "shiftGroup",
    assigned_pattern as "assignedPattern",
    status,
    gender,
    overtime_eligible as "overtimeEligible",
    mandate_eligible as "mandateEligible",
    qualifications,
    notes,
    created_at as "createdAt",
    updated_at as "updatedAt"
  from employees
`;

function normalizeEmployeePayload(payload = {}) {
  const firstName = String(payload.firstName || '').trim();
  const lastName = String(payload.lastName || '').trim();
  const displayName = String(payload.displayName || `${firstName} ${lastName}`).trim();
  const qualifications = Array.isArray(payload.qualifications) ? payload.qualifications : [];

  return {
    id: String(payload.id || '').trim(),
    agencyId: String(payload.agencyId || '').trim(),
    employeeCode: String(payload.employeeCode || '').trim(),
    firstName,
    middleName: payload.middleName ? String(payload.middleName).trim() : null,
    lastName,
    preferredName: payload.preferredName ? String(payload.preferredName).trim() : null,
    displayName,
    minimumStaffingRole: String(payload.minimumStaffingRole || '').trim(),
    position: String(payload.position || '').trim(),
    rank: payload.rank ? String(payload.rank).trim() : null,
    department: payload.department ? String(payload.department).trim() : null,
    division: payload.division ? String(payload.division).trim() : null,
    location: payload.location ? String(payload.location).trim() : null,
    shiftGroup: payload.shiftGroup ? String(payload.shiftGroup).trim() : null,
    assignedPattern: payload.assignedPattern ? String(payload.assignedPattern).trim() : null,
    status: payload.status ? String(payload.status).trim() : 'active',
    gender: payload.gender ? String(payload.gender).trim() : null,
    overtimeEligible: payload.overtimeEligible !== false,
    mandateEligible: payload.mandateEligible !== false,
    qualifications,
    notes: payload.notes ? String(payload.notes).trim() : null
  };
}

export function validateEmployeePayload(payload = {}, { requireId = true } = {}) {
  const employee = normalizeEmployeePayload(payload);
  const errors = [];

  if (requireId && !employee.id) errors.push('id is required.');
  if (!employee.agencyId) errors.push('agencyId is required.');
  if (!employee.employeeCode) errors.push('employeeCode is required.');
  if (!employee.firstName) errors.push('firstName is required.');
  if (!employee.lastName) errors.push('lastName is required.');
  if (!employee.displayName) errors.push('displayName is required.');
  if (!employee.minimumStaffingRole) errors.push('minimumStaffingRole is required.');
  if (!employee.position) errors.push('position is required.');

  const allowedStatuses = new Set(['active', 'probationary', 'leave', 'inactive', 'retired', 'separated', 'deleted']);
  if (!allowedStatuses.has(employee.status)) errors.push('status is invalid.');

  return { employee, errors };
}

export async function listEmployeesFromPostgres() {
  const result = await getPool().query(`
    ${EMPLOYEE_SELECT}
    where status <> 'deleted'
    order by agency_id, last_name, first_name, employee_code
  `);

  return result.rows;
}

export async function getEmployeeFromPostgres(id) {
  const result = await getPool().query(`
    ${EMPLOYEE_SELECT}
    where id = $1 and status <> 'deleted'
    limit 1
  `, [id]);

  return result.rows[0] || null;
}

export async function createEmployeeInPostgres(employee) {
  const result = await getPool().query(`
    insert into employees (
      id, agency_id, employee_code, first_name, middle_name, last_name, preferred_name, display_name,
      minimum_staffing_role, position, rank, department, division, location, shift_group, assigned_pattern,
      status, gender, overtime_eligible, mandate_eligible, qualifications, notes
    ) values (
      $1, $2, $3, $4, $5, $6, $7, $8,
      $9, $10, $11, $12, $13, $14, $15, $16,
      $17, $18, $19, $20, $21::jsonb, $22
    )
    returning *
  `, [
    employee.id,
    employee.agencyId,
    employee.employeeCode,
    employee.firstName,
    employee.middleName,
    employee.lastName,
    employee.preferredName,
    employee.displayName,
    employee.minimumStaffingRole,
    employee.position,
    employee.rank,
    employee.department,
    employee.division,
    employee.location,
    employee.shiftGroup,
    employee.assignedPattern,
    employee.status,
    employee.gender,
    employee.overtimeEligible,
    employee.mandateEligible,
    JSON.stringify(employee.qualifications),
    employee.notes
  ]);

  return getEmployeeFromPostgres(result.rows[0].id);
}

export async function updateEmployeeInPostgres(id, employee) {
  const result = await getPool().query(`
    update employees set
      agency_id = $2,
      employee_code = $3,
      first_name = $4,
      middle_name = $5,
      last_name = $6,
      preferred_name = $7,
      display_name = $8,
      minimum_staffing_role = $9,
      position = $10,
      rank = $11,
      department = $12,
      division = $13,
      location = $14,
      shift_group = $15,
      assigned_pattern = $16,
      status = $17,
      gender = $18,
      overtime_eligible = $19,
      mandate_eligible = $20,
      qualifications = $21::jsonb,
      notes = $22,
      updated_at = now()
    where id = $1 and status <> 'deleted'
    returning id
  `, [
    id,
    employee.agencyId,
    employee.employeeCode,
    employee.firstName,
    employee.middleName,
    employee.lastName,
    employee.preferredName,
    employee.displayName,
    employee.minimumStaffingRole,
    employee.position,
    employee.rank,
    employee.department,
    employee.division,
    employee.location,
    employee.shiftGroup,
    employee.assignedPattern,
    employee.status,
    employee.gender,
    employee.overtimeEligible,
    employee.mandateEligible,
    JSON.stringify(employee.qualifications),
    employee.notes
  ]);

  if (!result.rows[0]) return null;
  return getEmployeeFromPostgres(result.rows[0].id);
}

export async function softDeleteEmployeeInPostgres(id) {
  const result = await getPool().query(`
    update employees
    set status = 'deleted', updated_at = now()
    where id = $1 and status <> 'deleted'
    returning id
  `, [id]);

  return Boolean(result.rows[0]);
}
