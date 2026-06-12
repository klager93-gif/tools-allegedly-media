export async function onRequestGet() {
  return Response.json({
    ok: true,
    data: [],
    meta: {
      source: 'schedule-owned-api-mock',
      version: 'v1.2.1',
      note: 'Schedule-owned mock endpoint shape only. The active app still reads /schedule/data/employees.json through the JSON adapter.'
    },
    errors: []
  });
}
