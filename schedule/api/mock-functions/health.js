export async function onRequestGet() {
  return Response.json({
    ok: true,
    data: {
      service: 'Signal Schedule API',
      status: 'mock-online',
      database: 'legacy-cloudflare-mock-not-active',
      version: 'legacy-v1.3.0'
    },
    meta: {
      source: 'legacy-cloudflare-mock',
      liveWrites: false
    },
    errors: []
  });
}
