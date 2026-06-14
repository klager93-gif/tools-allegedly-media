/*
Signal Labs Tool File: schedule/api/coolify/server.js
Version: v5.1.0
Purpose: Coolify API with employee CRUD, snapshot CRUD, protected publish-state action, and read-only foundations including schedule publishing, schedule planning, draft planning, visibility/privacy controls, notifications, coverage spots, daily board, assignment engine, leave banks, OT volunteer board, shift trades, mandation engine, seniority engine, assignment generator, conflict detection, and qualifications/certifications.

This release intentionally has:
- no committed credentials
- no public writes
- snapshot writes require SCHEDULE_WRITES_ENABLED=true and ADMIN_API_KEY
- no role-based authentication yet
- no scheduling engine logic
*/
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import {
  areEmployeeWritesEnabled,
  areScheduleWritesEnabled,
  checkPostgresHealth,
  createEmployeeInPostgres,
  createSavedScheduleInPostgres,
  getEmployeeFromPostgres,
  getSavedScheduleFromPostgres,
  listEmployeesFromPostgres,
  listSavedSchedulesFromPostgres,
  shouldUsePostgresEmployees,
  softDeleteEmployeeInPostgres,
  softDeleteSavedScheduleInPostgres,
  updateEmployeeInPostgres,
  updateSavedScheduleInPostgres,
  publishSavedScheduleInPostgres,
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
const NOTIFICATIONS_PREVIEW_PATH = resolve(__dirname, '../../data/notifications-preview.json');
const COVERAGE_SPOTS_PREVIEW_PATH = resolve(__dirname, '../../data/coverage-spots-preview.json');
const DAILY_BOARD_PREVIEW_PATH = resolve(__dirname, '../../data/daily-board-preview.json');
const ASSIGNMENT_ENGINE_PREVIEW_PATH = resolve(__dirname, '../../data/assignment-engine-preview.json');
const LEAVE_BANKS_PREVIEW_PATH = resolve(__dirname, '../../data/leave-banks-preview.json');
const OT_VOLUNTEER_BOARD_PREVIEW_PATH = resolve(__dirname, '../../data/ot-volunteer-board-preview.json');
const SHIFT_TRADES_PREVIEW_PATH = resolve(__dirname, '../../data/shift-trades-preview.json');
const MANDATION_ENGINE_PREVIEW_PATH = resolve(__dirname, '../../data/mandation-engine-preview.json');
const SENIORITY_ENGINE_PREVIEW_PATH = resolve(__dirname, '../../data/seniority-engine-preview.json');
const ASSIGNMENT_GENERATOR_PREVIEW_PATH = resolve(__dirname, '../../data/assignment-generator-preview.json');
const CONFLICT_DETECTION_PREVIEW_PATH = resolve(__dirname, '../../data/conflict-detection-preview.json');
const QUALIFICATIONS_CERTIFICATIONS_PREVIEW_PATH = resolve(__dirname, '../../data/qualifications-certifications-preview.json');
const WEEKLY_BOARD_PREVIEW_PATH = resolve(__dirname, '../../data/weekly-board-preview.json');
const VISIBILITY_PRIVACY_PREVIEW_PATH = resolve(__dirname, '../../data/visibility-privacy-preview.json');
const DRAFT_PLANNING_PREVIEW_PATH = resolve(__dirname, '../../data/draft-planning-preview.json');
const SCHEDULE_PLANNING_PREVIEW_PATH = resolve(__dirname, '../../data/schedule-planning-preview.json');
const SCHEDULE_PUBLICATION_PREVIEW_PATH = resolve(__dirname, '../../data/schedule-publication-preview.json');
const EMPLOYEE_AVAILABILITY_PREFERENCES_PREVIEW_PATH = resolve(__dirname, '../../data/employee-availability-preferences-preview.json');
const EMPLOYEE_EXPERIENCE_DATA_TOOLS_PREVIEW_PATH = resolve(__dirname, '../../data/employee-experience-data-tools-preview.json');
const REQUEST_APPROVAL_ENGINE_PREVIEW_PATH = resolve(__dirname, '../../data/request-approval-engine-preview.json');
const STAFFING_ENGINE_PREVIEW_PATH = resolve(__dirname, '../../data/staffing-engine-preview.json');
const BODY_LIMIT_BYTES = 1024 * 128;

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  res.end(JSON.stringify(payload, null, 2));
}

function apiMeta(overrides = {}) {
  return { source: 'coolify-api', version: 'v5.1.0', ...overrides };
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


function requireScheduleWriteAccess(req, res) {
  if (!areScheduleWritesEnabled()) {
    sendJson(res, 403, {
      ok: false,
      data: null,
      meta: apiMeta({ writesEnabled: false }),
      errors: [{ code: 'WRITES_DISABLED', message: 'Saved schedule write routes are disabled. Set SCHEDULE_WRITES_ENABLED=true to allow protected writes.' }]
    });
    return false;
  }

  const configuredKey = String(process.env.ADMIN_API_KEY || '').trim();
  if (!configuredKey) {
    sendJson(res, 500, {
      ok: false,
      data: null,
      meta: apiMeta({ writesEnabled: true }),
      errors: [{ code: 'ADMIN_API_KEY_MISSING', message: 'ADMIN_API_KEY must be configured before snapshot writes can be used.' }]
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
      errors: [{ code: 'POSTGRES_REQUIRED', message: 'Saved schedule writes require DATA_MODE=postgres and DATABASE_URL.' }]
    });
    return false;
  }

  return true;
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

function getSavedScheduleIdFromPath(pathname) {
  const match = pathname.match(/^\/(?:api\/)?saved-schedules\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getSavedSchedulePublishIdFromPath(pathname) {
  const match = pathname.match(/^\/(?:api\/)?saved-schedules\/([^/]+)\/publish$/);
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


async function listNotificationsFromJsonSeed() {
  const raw = await readFile(NOTIFICATIONS_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listCoverageSpotsFromJsonSeed() {
  const raw = await readFile(COVERAGE_SPOTS_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listDailyBoardFromJsonSeed() {
  const raw = await readFile(DAILY_BOARD_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listAssignmentEngineFromJsonSeed() {
  const raw = await readFile(ASSIGNMENT_ENGINE_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listLeaveBanksFromJsonSeed() {
  const raw = await readFile(LEAVE_BANKS_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listOtVolunteerBoardFromJsonSeed() {
  const raw = await readFile(OT_VOLUNTEER_BOARD_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listShiftTradesFromJsonSeed() {
  const raw = await readFile(SHIFT_TRADES_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listMandationEngineFromJsonSeed() {
  const raw = await readFile(MANDATION_ENGINE_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listSeniorityEngineFromJsonSeed() {
  const raw = await readFile(SENIORITY_ENGINE_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listAssignmentGeneratorFromJsonSeed() {
  const raw = await readFile(ASSIGNMENT_GENERATOR_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listConflictDetectionFromJsonSeed() {
  const raw = await readFile(CONFLICT_DETECTION_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listQualificationsCertificationsFromJsonSeed() {
  const raw = await readFile(QUALIFICATIONS_CERTIFICATIONS_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listVisibilityPrivacyFromJsonSeed() {
  const raw = await readFile(VISIBILITY_PRIVACY_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listDraftPlanningFromJsonSeed() {
  const raw = await readFile(DRAFT_PLANNING_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listSchedulePlanningFromJsonSeed() {
  const raw = await readFile(SCHEDULE_PLANNING_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listSchedulePublicationFromJsonSeed() {
  const raw = await readFile(SCHEDULE_PUBLICATION_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listEmployeeAvailabilityPreferencesFromJsonSeed() {
  const raw = await readFile(EMPLOYEE_AVAILABILITY_PREFERENCES_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listRequestApprovalEngineFromJsonSeed() {
  const raw = await readFile(REQUEST_APPROVAL_ENGINE_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listStaffingEngineFromJsonSeed() {
  const raw = await readFile(STAFFING_ENGINE_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
}

async function listEmployeeExperienceDataToolsFromJsonSeed() {
  const raw = await readFile(EMPLOYEE_EXPERIENCE_DATA_TOOLS_PREVIEW_PATH, 'utf8');
  return JSON.parse(raw);
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
        liveWrites: areEmployeeWritesEnabled(),
        savedScheduleWritesEnabled: areScheduleWritesEnabled()
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
          version: 'v5.1.0',
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


  if (req.method === 'GET' && (url.pathname === '/notifications' || url.pathname === '/api/notifications')) {
    try {
      const data = await listNotificationsFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-notification-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { summary: {}, channels: [], rules: [], queue: [], preferences: [], policyNotes: [] },
        meta: apiMeta(),
        errors: [{ code: 'NOTIFICATION_READ_FAILED', message: error.message }]
      });
    }
  }

  if (req.method === 'GET' && (url.pathname === '/coverage-spots' || url.pathname === '/api/coverage-spots')) {
    try {
      const data = await listCoverageSpotsFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-coverage-spots-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { summary: {}, days: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'COVERAGE_SPOTS_READ_FAILED', message: error.message }]
      });
    }
  }

  if (req.method === 'GET' && (url.pathname === '/daily-board' || url.pathname === '/api/daily-board')) {
    try {
      const data = await listDailyBoardFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-daily-board-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { summary: {}, filters: {}, days: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'DAILY_BOARD_READ_FAILED', message: error.message }]
      });
    }
  }

  if (req.method === 'GET' && (url.pathname === '/assignment-engine' || url.pathname === '/api/assignment-engine')) {
    try {
      const data = await listAssignmentEngineFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-assignment-engine-integration', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { summary: {}, filters: {}, records: [], sourceTypes: [], history: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'ASSIGNMENT_ENGINE_READ_FAILED', message: error.message }]
      });
    }
  }



  if (req.method === 'GET' && (url.pathname === '/assignment-generator' || url.pathname === '/api/assignment-generator')) {
    try {
      const data = await listAssignmentGeneratorFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-assignment-generator-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, summary: {}, filters: {}, inputs: [], runs: [], drafts: [], rolePanels: [], publishChecklist: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'ASSIGNMENT_GENERATOR_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/conflict-detection' || url.pathname === '/api/conflict-detection')) {
    try {
      const data = await listConflictDetectionFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-conflict-detection-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, summary: {}, filters: {}, sources: [], conflicts: [], ruleChecks: [], rolePanels: [], resolutionQueue: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'CONFLICT_DETECTION_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/qualifications-certifications' || url.pathname === '/api/qualifications-certifications')) {
    try {
      const data = await listQualificationsCertificationsFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-qualifications-certifications', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, summary: {}, policyProfile: {}, qualificationTypes: [], employeeCredentials: [], roleRequirements: [], expirationWarnings: [], integrationChecks: [], rolePanels: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'QUALIFICATIONS_CERTIFICATIONS_READ_FAILED', message: error.message }]
      });
    }
  }



  if (req.method === 'GET' && (url.pathname === '/visibility-privacy' || url.pathname === '/api/visibility-privacy')) {
    try {
      const data = await listVisibilityPrivacyFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-schedule-visibility-privacy', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, summary: {}, userGroups: [], scheduleVisibilityRules: [], leaveVisibilityRules: [], displayExamples: [], adminControls: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'VISIBILITY_PRIVACY_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/schedule-planning' || url.pathname === '/api/schedule-planning' || url.pathname === '/planning' || url.pathname === '/api/planning')) {
    try {
      const data = await listSchedulePlanningFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-schedule-planning-forecast-horizon', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, summary: {}, forecastRuns: [], forecastIssues: [], recommendedActions: [], heatmap: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'SCHEDULE_PLANNING_READ_FAILED', message: error.message }]
      });
    }
  }



  if (req.method === 'GET' && (url.pathname === '/employee-availability-preferences' || url.pathname === '/api/employee-availability-preferences' || url.pathname === '/availability' || url.pathname === '/api/availability')) {
    try {
      const data = await listEmployeeAvailabilityPreferencesFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-availability-preferences-restrictions', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, summary: {}, employees: [], availability: [], preferences: [], restrictions: [], viewGroups: [], builderIntegration: [] },
        meta: apiMeta(),
        errors: [{ code: 'EMPLOYEE_AVAILABILITY_PREFERENCES_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/schedule-publication' || url.pathname === '/api/schedule-publication' || url.pathname === '/publishing' || url.pathname === '/api/publishing')) {
    try {
      const data = await listSchedulePublicationFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-schedule-publication-beta-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, summary: {}, versions: [], checklist: [], snapshots: [], events: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'SCHEDULE_PUBLICATION_READ_FAILED', message: error.message }]
      });
    }
  }

  if (req.method === 'GET' && (url.pathname === '/draft-planning' || url.pathname === '/api/draft-planning')) {
    try {
      const data = await listDraftPlanningFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-drag-drop-draft-planning', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, summary: {}, draftRuns: [], moveQueue: [], publishChecklist: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'DRAFT_PLANNING_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/weekly-board' || url.pathname === '/api/weekly-board')) {
    try {
      const raw = await readFile(WEEKLY_BOARD_PREVIEW_PATH, 'utf8');
      sendJson(res, 200, {
        ok: true,
        data: JSON.parse(raw),
        meta: apiMeta({ endpoint: 'weekly-board', mode: 'read-only-preview' })
      });
    } catch (error) {
      sendJson(res, 500, {
        ok: false,
        data: null,
        meta: apiMeta({ endpoint: 'weekly-board' }),
        errors: [{ code: 'WEEKLY_BOARD_READ_FAILED', message: error.message }]
      });
    }
    return;
  }

  if (req.method === 'GET' && (url.pathname === '/leave-banks' || url.pathname === '/api/leave-banks')) {
    try {
      const data = await listLeaveBanksFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-leave-banks-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { summary: {}, bankTypes: [], employeeBalances: [], pendingImpacts: [], adjustments: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'LEAVE_BANKS_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/ot-volunteer-board' || url.pathname === '/api/ot-volunteer-board')) {
    try {
      const data = await listOtVolunteerBoardFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-ot-volunteer-board-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { summary: {}, filters: {}, opportunities: [], volunteers: [], awardQueue: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'OT_VOLUNTEER_BOARD_READ_FAILED', message: error.message }]
      });
    }
  }



  if (req.method === 'GET' && (url.pathname === '/shift-trades' || url.pathname === '/api/shift-trades')) {
    try {
      const data = await listShiftTradesFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-shift-trades-ui', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, requests: [], workflowStages: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'SHIFT_TRADES_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/mandation-engine' || url.pathname === '/api/mandation-engine')) {
    try {
      const data = await listMandationEngineFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-mandation-engine-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, summary: {}, policyProfile: {}, shortages: [], rotation: [], evaluations: [], overrideLog: [], employeeView: {}, rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'MANDATION_ENGINE_READ_FAILED', message: error.message }]
      });
    }
  }



  if (req.method === 'GET' && (url.pathname === '/seniority-engine' || url.pathname === '/api/seniority-engine')) {
    try {
      const data = await listSeniorityEngineFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-seniority-engine', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { meta: {}, summary: {}, policyProfile: {}, rankTypes: [], employees: [], lists: [], scenarios: [], overrides: [], audit: [], rules: [] },
        meta: apiMeta(),
        errors: [{ code: 'SENIORITY_ENGINE_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/saved-schedules' || url.pathname === '/api/saved-schedules')) {
    if (!shouldUsePostgresEmployees()) {
      return sendJson(res, 409, {
        ok: false,
        data: [],
        meta: apiMeta({ mode: 'saved-schedules-foundation', database: 'not-active', writesEnabled: areScheduleWritesEnabled() }),
        errors: [{ code: 'POSTGRES_REQUIRED', message: 'Schedule history require DATA_MODE=postgres and DATABASE_URL.' }]
      });
    }

    try {
      const data = await listSavedSchedulesFromPostgres();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'saved-schedules-foundation', database: 'postgres', writesEnabled: areScheduleWritesEnabled() }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, { ok: false, data: [], meta: apiMeta(), errors: [{ code: 'SAVED_SCHEDULE_READ_FAILED', message: error.message }] });
    }
  }

  const savedSchedulePublishId = getSavedSchedulePublishIdFromPath(url.pathname);
  if (savedSchedulePublishId && req.method === 'POST') {
    if (!requireScheduleWriteAccess(req, res)) return;
    try {
      const body = await readJsonBody(req);
      const published = await publishSavedScheduleInPostgres(savedSchedulePublishId, body);
      if (!published) return sendJson(res, 404, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'SAVED_SCHEDULE_NOT_FOUND', message: 'Saved schedule not found.' }] });
      return sendJson(res, 200, { ok: true, data: published, meta: apiMeta({ database: 'postgres', writesEnabled: true, publishState: 'published' }), errors: [] });
    } catch (error) {
      return sendJson(res, 500, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'SAVED_SCHEDULE_PUBLISH_FAILED', message: error.message }] });
    }
  }

  const savedScheduleId = getSavedScheduleIdFromPath(url.pathname);
  if (savedScheduleId && req.method === 'GET') {
    if (!shouldUsePostgresEmployees()) {
      return sendJson(res, 409, { ok: false, data: null, meta: apiMeta({ database: 'not-active' }), errors: [{ code: 'POSTGRES_REQUIRED', message: 'Saved schedule lookup requires Postgres mode.' }] });
    }
    try {
      const savedSchedule = await getSavedScheduleFromPostgres(savedScheduleId);
      if (!savedSchedule) return sendJson(res, 404, { ok: false, data: null, meta: apiMeta({ database: 'postgres' }), errors: [{ code: 'SAVED_SCHEDULE_NOT_FOUND', message: 'Saved schedule not found.' }] });
      return sendJson(res, 200, { ok: true, data: savedSchedule, meta: apiMeta({ database: 'postgres' }), errors: [] });
    } catch (error) {
      return sendJson(res, 500, { ok: false, data: null, meta: apiMeta({ database: 'postgres' }), errors: [{ code: 'SAVED_SCHEDULE_READ_FAILED', message: error.message }] });
    }
  }

  if ((url.pathname === '/saved-schedules' || url.pathname === '/api/saved-schedules') && req.method === 'POST') {
    if (!requireScheduleWriteAccess(req, res)) return;
    try {
      const body = await readJsonBody(req);
      const created = await createSavedScheduleInPostgres(body);
      return sendJson(res, 201, { ok: true, data: created, meta: apiMeta({ database: 'postgres', writesEnabled: true }), errors: [] });
    } catch (error) {
      const validation = error.validationErrors || null;
      return sendJson(res, validation ? 400 : 500, { ok: false, data: null, meta: apiMeta(), errors: validation ? validation.map(message => ({ code: 'VALIDATION_ERROR', message })) : [{ code: 'SAVED_SCHEDULE_CREATE_FAILED', message: error.message }] });
    }
  }

  if (savedScheduleId && (req.method === 'PUT' || req.method === 'PATCH')) {
    if (!requireScheduleWriteAccess(req, res)) return;
    try {
      const body = await readJsonBody(req);
      const updated = await updateSavedScheduleInPostgres(savedScheduleId, body);
      if (!updated) return sendJson(res, 404, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'SAVED_SCHEDULE_NOT_FOUND', message: 'Saved schedule not found.' }] });
      return sendJson(res, 200, { ok: true, data: updated, meta: apiMeta({ database: 'postgres', writesEnabled: true }), errors: [] });
    } catch (error) {
      const validation = error.validationErrors || null;
      return sendJson(res, validation ? 400 : 500, { ok: false, data: null, meta: apiMeta(), errors: validation ? validation.map(message => ({ code: 'VALIDATION_ERROR', message })) : [{ code: 'SAVED_SCHEDULE_UPDATE_FAILED', message: error.message }] });
    }
  }

  if (savedScheduleId && req.method === 'DELETE') {
    if (!requireScheduleWriteAccess(req, res)) return;
    try {
      const deleted = await softDeleteSavedScheduleInPostgres(savedScheduleId);
      if (!deleted) return sendJson(res, 404, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'SAVED_SCHEDULE_NOT_FOUND', message: 'Saved schedule not found.' }] });
      return sendJson(res, 200, { ok: true, data: { id: savedScheduleId, status: 'deleted' }, meta: apiMeta({ database: 'postgres', writesEnabled: true, deleteMode: 'soft-delete' }), errors: [] });
    } catch (error) {
      return sendJson(res, 500, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'SAVED_SCHEDULE_DELETE_FAILED', message: error.message }] });
    }
  }

  if ((url.pathname === '/saved-schedules' || url.pathname === '/api/saved-schedules' || savedScheduleId || savedSchedulePublishId) && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method || '')) {
    return methodNotAllowed(res);
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
      const employee = validateEmployeePayload(body);
      const created = await createEmployeeInPostgres(employee);
      return sendJson(res, 201, { ok: true, data: created, meta: apiMeta({ database: 'postgres', writesEnabled: true }), errors: [] });
    } catch (error) {
      const validation = error.validationErrors || null;
      return sendJson(res, validation ? 400 : 500, { ok: false, data: null, meta: apiMeta(), errors: validation ? validation.map(message => ({ code: 'VALIDATION_ERROR', message })) : [{ code: 'EMPLOYEE_CREATE_FAILED', message: error.message }] });
    }
  }

  if (employeeId && (req.method === 'PUT' || req.method === 'PATCH')) {
    if (!requireEmployeeWriteAccess(req, res)) return;

    try {
      const body = await readJsonBody(req);
      const employee = validateEmployeePayload({ ...body, id: employeeId });
      const updated = await updateEmployeeInPostgres(employeeId, employee);
      if (!updated) {
        return sendJson(res, 404, { ok: false, data: null, meta: apiMeta(), errors: [{ code: 'EMPLOYEE_NOT_FOUND', message: 'Employee not found.' }] });
      }
      return sendJson(res, 200, { ok: true, data: updated, meta: apiMeta({ database: 'postgres', writesEnabled: true }), errors: [] });
    } catch (error) {
      const validation = error.validationErrors || null;
      return sendJson(res, validation ? 400 : 500, { ok: false, data: null, meta: apiMeta(), errors: validation ? validation.map(message => ({ code: 'VALIDATION_ERROR', message })) : [{ code: 'EMPLOYEE_UPDATE_FAILED', message: error.message }] });
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



  if (req.method === 'GET' && (url.pathname === '/staffing-engine' || url.pathname === '/api/staffing-engine' || url.pathname === '/staffing' || url.pathname === '/api/staffing')) {
    try {
      const data = await listStaffingEngineFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-staffing-engine-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { summary: {}, coverage: [], candidates: [], queues: [], integrityChecks: [] },
        meta: apiMeta(),
        errors: [{ code: 'STAFFING_ENGINE_READ_FAILED', message: error.message }]
      });
    }
  }


  if (req.method === 'GET' && (url.pathname === '/request-approval-engine' || url.pathname === '/api/request-approval-engine' || url.pathname === '/requests' || url.pathname === '/api/requests')) {
    try {
      const data = await listRequestApprovalEngineFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-request-approval-engine-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { summary: {}, queues: [], requests: [], workflow: [], policyChecks: [] },
        meta: apiMeta(),
        errors: [{ code: 'REQUEST_APPROVAL_ENGINE_READ_FAILED', message: error.message }]
      });
    }
  }

  if (req.method === 'GET' && (url.pathname === '/employee-experience-data-tools' || url.pathname === '/api/employee-experience-data-tools')) {
    try {
      const data = await listEmployeeExperienceDataToolsFromJsonSeed();
      return sendJson(res, 200, {
        ok: true,
        data,
        meta: apiMeta({ mode: 'read-only-employee-experience-data-tools-foundation', database: 'json-seed-read-only' }),
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: { templates: [], imports: [], exports: [], profileFields: [] },
        meta: apiMeta(),
        errors: [{ code: 'EMPLOYEE_EXPERIENCE_DATA_TOOLS_READ_FAILED', message: error.message }]
      });
    }
  }

  return notFound(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Signal Schedule API listening on 0.0.0.0:${PORT}`);
});
