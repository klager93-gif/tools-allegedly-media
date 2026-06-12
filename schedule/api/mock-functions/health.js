export async function onRequestGet() {
  return Response.json({
    ok: true,
    data: {
      service: 'Signal Schedule API',
      status: 'mock-online',
      database: 'not-connected',
      version: 'v1.2.1'
    },
    meta: {
      source: 'schedule-owned-api-mock',
      liveWrites: false
    },
    errors: []
  });
}
