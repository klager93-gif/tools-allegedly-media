/*
Signal Labs Tool File: schedule/api/coolify/db/postgres.js
Version: v1.7.0
Purpose: Read-only Postgres connection helper for the Coolify API.

Rules:
- Real credentials must come from Coolify environment variables.
- No writes are exposed in v1.7.0.
- The API must preserve the employee read response wrapper.
*/
import pg from 'pg';

const { Pool } = pg;

let pool = null;

export function isPostgresConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function shouldUsePostgresEmployees() {
  return String(process.env.USE_POSTGRES_EMPLOYEES || '').toLowerCase() === 'true' && isPostgresConfigured();
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

export async function listEmployeesFromPostgres() {
  const result = await getPool().query(`
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
      created_at as "createdAt",
      updated_at as "updatedAt"
    from employees
    where status <> 'deleted'
    order by agency_id, last_name, first_name, employee_code
  `);

  return result.rows;
}
