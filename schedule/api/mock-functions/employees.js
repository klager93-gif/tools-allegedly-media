export async function onRequestGet() {
  return Response.json({
    ok: true,
    data: [],
    meta: {
      source: 'schedule-owned-api-mock',
      version: 'v1.3.0',
      note: 'Schedule-owned mock endpoint shape only. D1 schema exists, but the active app still reads /schedule/data/employees.json through the JSON adapter.'
    },
    errors: []
  });
}
