/*
Signal Labs Tool File: schedule/api/coolify/server.js
Version: v1.7.0
Purpose: Minimal Coolify API with read-only health and employee routes plus optional Postgres reads.

This release intentionally has:
- no committed credentials
- no CRUD
- no authentication
- no writes
*/
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { checkPostgresHealth, listEmployeesFromPostgres, shouldUsePostgresEmployees } from './db/postgres.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const DATA_PATH = resolve(__dirname, '../../data/employees.json');

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  res.end(JSON.stringify(payload, null, 2));
}

function notFound(res) {
  sendJson(res, 404, {
    ok: false,
    data: null,
    meta: { source: 'coolify-api', version: 'v1.7.0' },
    errors: [{ code: 'NOT_FOUND', message: 'Route not found.' }]
  });
}

async function listEmployeesFromJsonSeed() {
  const raw = await readFile(DATA_PATH, 'utf8');
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
        database: shouldUsePostgresEmployees() ? 'postgres-read-only' : 'json-seed-read-only',
        postgres,
        liveWrites: false
      },
      meta: { source: 'coolify-api', version: 'v1.7.0' },
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
          version: 'v1.7.0',
          mode: 'read-only',
          database: result.database,
          writesEnabled: false
        },
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: [],
        meta: { source: 'coolify-api', version: 'v1.7.0' },
        errors: [{ code: 'EMPLOYEE_READ_FAILED', message: error.message }]
      });
    }
  }

  return notFound(res);
});

server.listen(PORT, () => {
  console.log(`Signal Schedule API listening on port ${PORT}`);
});
