/*
Signal Labs Tool File: schedule/api/coolify/server.js
Version: v1.6.0
Purpose: Minimal Coolify API skeleton for read-only health and employee routes.

This skeleton intentionally has:
- no credentials
- no Postgres connection
- no CRUD
- no authentication
- no writes
*/
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

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
    meta: { source: 'coolify-api-skeleton', version: 'v1.6.0' },
    errors: [{ code: 'NOT_FOUND', message: 'Route not found.' }]
  });
}

async function listEmployees() {
  const raw = await readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'GET' && (url.pathname === '/health' || url.pathname === '/api/health')) {
    return sendJson(res, 200, {
      ok: true,
      data: {
        service: 'Signal Schedule API',
        status: 'skeleton-online',
        database: 'not-connected',
        storage: 'static-json-seed-read-only',
        liveWrites: false
      },
      meta: { source: 'coolify-api-skeleton', version: 'v1.6.0' },
      errors: []
    });
  }

  if (req.method === 'GET' && (url.pathname === '/employees' || url.pathname === '/api/employees')) {
    try {
      const employees = await listEmployees();
      return sendJson(res, 200, {
        ok: true,
        data: employees,
        meta: {
          source: 'coolify-api-skeleton',
          version: 'v1.6.0',
          mode: 'read-only',
          database: 'not-connected'
        },
        errors: []
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        data: [],
        meta: { source: 'coolify-api-skeleton', version: 'v1.6.0' },
        errors: [{ code: 'EMPLOYEE_READ_FAILED', message: error.message }]
      });
    }
  }

  return notFound(res);
});

server.listen(PORT, () => {
  console.log(`Signal Schedule API skeleton listening on port ${PORT}`);
});
