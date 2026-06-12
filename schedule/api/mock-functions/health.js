export async function onRequestGet() {
  return Response.json({
    ok: true,
    data: {
      service: 'Signal Schedule API',
      status: 'mock-online',
      database: 'd1-schema-planned-not-bound',
      version: 'v1.3.0'
    },
    meta: {
      source: 'schedule-owned-api-mock',
      liveWrites: false
    },
    errors: []
  });
}
