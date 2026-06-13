/*
Signal Labs Tool File: schedule/api/coolify/server.js
Version: v2.3.0
Purpose: Coolify API with employee CRUD, assignments, minimum staffing, calendar, and read-only leave request, request hours, open shifts, and VOT foundation.

This release intentionally has:
- no committed credentials
- no public writes
- no role-based authentication yet
- no scheduling engine logic
*/
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import {
  areEmployeeWritesEnabled,
  checkPostgresHealth,
  createEmployeeInPostgres,
  getEmployeeFromPostgres,
  listEmployeesFromPostgres,
  shouldUsePostgresEmployees,
  softDeleteEmployeeInPostgres,
  updateEmployeeInPostgres,
  validateEmployeePayload
} from './db/postgres.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const DATA_PATH = resolve(__dirname, '../../data/employees.json');
const ASSIGNMENT_TEMPLATES_PATH = resolve(__dirname, '../../data/assignment-templates.json');
const EMPLOYEE_ASSIGNMENTS_PATH = resolve(__dirname, '../../data/employee-assignments.json');
const MINIMUM_STAFFING_TEMPLATES_PATH = resolve(__dirname, '../../data/minimum-staffing-templates.json');
const MINIMUM_STAFFING_PREVIEW_PATH = resolve(__dirname, '../../data/minimum-staffing-preview.json');
const CALENDAR_PREVIEW_PATH = resolve(__dirname, '../../data/calendar-preview.json');
const CALENDAR_EVENTS_PREVIEW_PATH = resolve(__dirname, '../../data/calendar-events-preview.json');
const LEAVE_REQUEST_TYPES_PATH = resolve(__dirname, '../../data/leave-request-types.json');
const LEAVE_REQUESTS_PREVIEW_PATH = resolve(__dirname, '../../data/leave-requests-preview.json');
const REQUEST_INCREMENT_SETTINGS_PATH = resolve(__dirname, '../../data/request-increment-settings.json');
const OPEN_SHIFTS_PREVIEW_PATH = resolve(__dirname, '../../data/open-shifts-preview.json');
const VOT_REQUESTS_PREVIEW_PATH = resolve(__dirname, '../../data/vot-requests-preview.json');
const REQUEST_REASONS_PATH = resolve(__dirname, '../../data/request-reasons.json');
const BODY_LIMIT_BYTES = 1024 * 128;

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  res.end(JSON.stringify(payload, null, 2));
}

function apiMeta(overrides = {}) {
  return { source: 'coolify-api', version: 'v2.3.0', ...overrides };
}

function notFound(res) {
  sendJson(res, 404, {
    ok: false,
    data: null,
    meta: apiMeta(),
    errors: [{ code: 'NOT_FOUND', message: 'Route not found.' }]
  });
}

function methodNotAllowed(res) {
  sendJson(res, 405, {
    ok: false,
    data: null,
    meta: apiMeta(),
    errors: [{ code: 'METHOD_NOT_ALLOWED', message: 'HTTP method not allowed for this route.' }]
  });
}

function getAdminToken(req) {
  const headerToken = req.headers['x-admin-api-key'];
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : '';
  return String(headerToken || bearerToken || '').trim();
}

function requireEmployeeWriteAccess(req, res) {
  if (!areEmployeeWritesEnabled()) {
    sendJson(res, 403, {
      ok: false,
      data: null,
      meta: apiMeta({ writesEnabled: false }),
      errors: [{ code: 'WRITES_DISABLED', message: 'Employee write routes are disabled. Set EMPLOYEE_WRITES_ENABLED=true to allow protected writes.' }]
    });
    return false;
  }

  const configuredKey = String(process.env.ADMIN_API_KEY || '').trim();
  if (!configuredKey) {
    sendJson(res, 500, {
      ok: false,
      data: null,
      meta: apiMeta({ writesEnabled: true }),
      errors: [{ code: 'ADMIN_API_KEY_MISSING', message: 'ADMIN_API_KEY must be configured before employee writes can be used.' }]
    });
    return false;
  }

  if (getAdminToken(req) !== configuredKey) {
    sendJson(res, 401, {
      ok: false,
      data: null,
      meta: apiMeta({ writesEnabled: true }),
      errors: [{ code: 'UNAUTHORIZED', message: 'Valid admin API key required.' }]
    });
    return false;
  }

  if (!shouldUsePostgresEmployees()) {
    sendJson(res, 409, {
      ok: false,
      data: null,
      meta: apiMeta({ writesEnabled: true, database: 'not-active' }),
      errors: [{ code: 'POSTGRES_REQUIRED', message: 'Employee writes require DATA_MODE=postgres and DATABASE_URL.' }]
    });
    return false;
  }

  return true;
}

async function readJsonBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (Buffer.byteLength(raw, 'utf8') > BODY_LIMIT_BYTES) {
        rejectBody(new Error('Request body is too large.'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw.trim()) return resolveBody({});
      try {
        resolveBody(JSON.parse(raw));
      } catch (_error) {
        rejectBody(new Error('Request body must be valid JSON.'));
      }
    });
    req.on('error', rejectBody);
  });
}

function getEmployeeIdFromPath(pathname) {
  const match = pathname.match(/^\/(?:api\/)?employees\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

async function listEmployeesFromJsonSeed() {
  const raw = await readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}


async function listAssignmentsFromJsonSeed() {
  const [templatesRaw, assignmentsRaw] = await Promise.all([
    readFile(ASSIGNMENT_TEMPLATES_PATH, 'utf8'),
    readFile(EMPLOYEE_ASSIGNMENTS_PATH, 'utf8')
  ]);
  return {
    templates: JSON.parse(templatesRaw),
    assignments: JSON.parse(assignmentsRaw)
  };
}


async function listMinimumStaffingFromJsonSeed() {
  const [templatesRaw, previewRaw] = await Promise.all([
    readFile(MINIMUM_STAFFING_TEMPLATES_PATH, 'utf8'),
    readFile(MINIMUM_STAFFING_PREVIEW_PATH, 'utf8')
  ]);
  return {
    templates: JSON.parse(templatesRaw),
    preview: JSON.parse(previewRaw)
  };
}

async function listCalendarFromJsonSeed() {
  const [previewRaw, eventsRaw] = await Promise.all([
    readFile(CALENDAR_PREVIEW_PATH, 'utf8'),
    readFile(CALENDAR_EVENTS_PREVIEW_PATH, 'utf8')
  ]);
  return {
    preview: JSON.parse(previewRaw),
    events: JSON.parse(eventsRaw)
  };
}

async function listLeaveRequestsFromJsonSeed() {
  const [typesRaw, requestsRaw, settingsRaw] = await Promise.all([
    readFile(LEAVE_REQUEST_TYPES_PATH, 'utf8'),
    readFile(LEAVE_REQUESTS_PREVIEW_PATH, 'utf8'),
    readFile(REQUEST_INCREMENT_SETTINGS_PATH, 'utf8')
  ]);
  return {
    types: JSON.parse(typesRaw),
    requests: JSON.parse(requestsRaw),
    incrementSettings: JSON.parse(settingsRaw)
  };
}

async function listRequestIncrementSettingsFromJsonSeed() {
  const settingsRaw = await readFile(REQUEST_INCREMENT_SETTINGS_PATH, 'utf8');
  return JSON.parse(settingsRaw);
}


async function listOpenShiftsFromJsonSeed() {
  const [openShiftsRaw, votRequestsRaw, reasonsRaw] = await Promise.all([
    readFile(OPEN_SHIFTS_PREVIEW_PATH, 'utf8'),
    readFile(VOT_REQUESTS_PREVIEW_PATH, 'utf8'),
    readFile(REQUEST_REASONS_PATH, 'utf8')
  ]);
  return {
    openShifts: JSON.parse(openShiftsRaw),
    votRequests: JSON.parse(votRequestsRaw),
    requestReasons: JSON.parse(reasonsRaw)
  };
}


async function listEmployees() {
  if (shouldUsePostgresEmployees()) {
    return {
      source: 'coolify-api-postgres',
      database: 'postgres',
      employees: await listEmployeesFromPostgres()
    };
  }

  return {
    source: 'coolify-api-json-seed',
    database: 'not-active',
    employees: await listEmployeesFromJsonSeed()
  };
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'GET' && (url.pathname === '/health' || url.pathname === '/api/health')) {
    let postgres = { configured: false, reachable: false, message: 'Postgres health check not requested.' };

    if (shouldUsePostgresEmployees()) {
      try {
        postgres = await checkPostgresHealth();
      } catch (error) {
        postgres = { configured: true, reachable: false, message: error.message };
      }
    }

    return sendJson(res, 200, {
      ok: true,
      data: {
        service: 'Signal Schedule API',
        status: 'online',
        database: shouldUsePostgresEmployees() ? 'postgres' : 'json-seed-read-only',
        postgres,
        employeeWritesEnabled: areEmployeeWritesEnabled(),
        liveWrites: areEmployeeWritesEnabled()
      },
      meta: apiMeta(),
      errors: []
    });
  }

  if (req.method === 'GET' && (url.pathname === '/employees' || url.pathname === '/api/employees')) {
    try {
      const result = await listEmployees();
      return sendJson(res, 200, {
        ok: true,
        data: result.employees,
        meta: {
          source: result.source,
          version: 'v1.9.0',
          mode: 'read-with-protected-crud-foundation',
          database: result.database,
          writesEnabled: areEmployeeWritesEnabled()
        },
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: [],
        meta: apiMeta(),
        errors: [{ code: 'EMPLOYEE_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/assignments' || url.pathname === '/api/assignments')) {
    try {
      const data = await listAssignmentsFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-assignments-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { templates: [], assignments: [] },
        meta: apiMeta(),
        errors: [{ code: 'ASSIGNMENT_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/minimum-staffing' || url.pathname === '/api/minimum-staffing')) {
    try {
      const data = await listMinimumStaffingFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-minimum-staffing-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { templates: [], preview: [] },
        meta: apiMeta(),
        errors: [{ code: 'MINIMUM_STAFFING_READ_FAILED', message: error.message }]
      });
    }
  }

  if (req.method === 'GET' && (url.pathname === '/calendar' || url.pathname === '/api/calendar')) {
    try {
      const data = await listCalendarFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-calendar-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { preview: [], events: [] },
        meta: apiMeta(),
        errors: [{ code: 'CALENDAR_READ_FAILED', message: error.message }]
      });
    }
  }

  if (req.method === 'GET' && (url.pathname === '/leave-requests' || url.pathname === '/api/leave-requests')) {
    try {
      const data = await listLeaveRequestsFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-leave-requests-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { types: [], requests: [] },
        meta: apiMeta(),
        errors: [{ code: 'LEAVE_REQUEST_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/request-increment-settings' || url.pathname === '/api/request-increment-settings')) {
    try {
      const data = await listRequestIncrementSettingsFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-request-hours-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: [],
        meta: apiMeta(),
        errors: [{ code: 'REQUEST_INCREMENT_SETTINGS_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/open-shifts' || url.pathname === '/api/open-shifts')) {
    try {
      const data = await listOpenShiftsFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-open-shifts-vot-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { openShifts: [], votRequests: [], requestReasons: [] },
        meta: apiMeta(),
        errors: [{ code: 'OPEN_SHIFTS_READ_FAILED', message: error.message }]
      });
    }
  }

  if (req.method === 'GET' && (url.pathname === '/request-reasons' || url.pathname === '/api/request-reasons')) {
    try {
      const reasonsRaw = await readFile(REQUEST_REASONS_PATH, 'utf8');
      return sendJson(res, 200, {
        ok: true,
        data: JSON.parse(reasonsRaw),
        meta: apiMeta({ mode: 'read-only-request-reasons-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: [],
        meta: apiMeta(),
        errors: [{ code: 'REQUEST_REASONS_READ_FAILED', message: error.message }]
      });
    }
  }

  const employeeId = getEmployeeIdFromPath(url.pathname);
  if (employeeId && req.method === 'GET') {
    if (!shouldUsePostgresEmployees()) {
      return sendJson(res, 409, {
        ok: false,
        data: null,
        meta: apiMeta({ database: 'not-active' }),
        errors: [{ code: 'POSTGRES_REQUIRED', message: 'Single employee lookup currently requires Postgres mode.' }]
      });
    }

    try {
      const employee = await getEmployeeFromPostgres(employeeId);
      if (!employee) {
        return sendJson(res, 404, {
          ok: false,
          data: null,
          meta: apiMeta({ database: 'postgres' }),
          errors: [{ code: 'EMPLOYEE_NOT_FOUND', message: 'Employee not found.' }]
        });
      }
      return sendJson(res, 200, { ok: true, data: employee, meta: apiMeta({ database: 'postgres' }), errors: [] });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: null,
        meta: apiMeta({ database: 'postgres' }),
        errors: [{ code: 'EMPLOYEE_READ_FAILED', message: error.message }]
      });
    }
  }

  if ((url.pathname === '/employees' || url.pathname === '/api/employees') && req.method === 'POST') {
    if (!requireEmployeeWriteAccess(req, res)) return;

    try {
      const body = await readJsonBody(req);
      const { employee, errors } = validateEmployeePayload(body, { requireId: true });
      if (errors.length) {
        return sendJson(res, 400, { ok: false, data: null, meta: apiMeta(), errors: errors.map(message => ({ code: 'VALIDATION_ERROR', message })) });
      }
      const created = await createEmployeeInPostgres(employee);
      return sendJson(res, 201, { ok: true, data: created, meta: apiMeta({ database: 'postgres', writesEnabled: true }), errors: [] });
    } catch (error) {
      return sendJson(res, 500, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'EMPLOYEE_CREATE_FAILED', message: error.message }] });
    }
  }

  if (employeeId && (req.method === 'PUT' || req.method === 'PATCH')) {
    if (!requireEmployeeWriteAccess(req, res)) return;

    try {
      const body = await readJsonBody(req);
      const { employee, errors } = validateEmployeePayload({ ...body, id: employeeId }, { requireId: true });
      if (errors.length) {
        return sendJson(res, 400, { ok: false, data: null, meta: apiMeta(), errors: errors.map(message => ({ code: 'VALIDATION_ERROR', message })) });
      }
      const updated = await updateEmployeeInPostgres(employeeId, employee);
      if (!updated) {
        return sendJson(res, 404, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'EMPLOYEE_NOT_FOUND', message: 'Employee not found.' }] });
      }
      return sendJson(res, 200, { ok: true, data: updated, meta: apiMeta({ database: 'postgres', writesEnabled: true }), errors: [] });
    } catch (error) {
      return sendJson(res, 500, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'EMPLOYEE_UPDATE_FAILED', message: error.message }] });
    }
  }

  if (employeeId && req.method === 'DELETE') {
    if (!requireEmployeeWriteAccess(req, res)) return;

    try {
      const deleted = await softDeleteEmployeeInPostgres(employeeId);
      if (!deleted) {
        return sendJson(res, 404, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'EMPLOYEE_NOT_FOUND', message: 'Employee not found.' }] });
      }
      return sendJson(res, 200, { ok: true, data: { id: employeeId, status: 'deleted' }, meta: apiMeta({ database: 'postgres', writesEnabled: true, deleteMode: 'soft-delete' }), errors: [] });
    } catch (error) {
      return sendJson(res, 500, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'EMPLOYEE_DELETE_FAILED', message: error.message }] });
    }
  }

  if ((url.pathname === '/employees' || url.pathname === '/api/employees' || employeeId) && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method || '')) {
    return methodNotAllowed(res);
  }

  return notFound(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Signal Schedule API listening on 0.0.0.0:${PORT}`);
});
