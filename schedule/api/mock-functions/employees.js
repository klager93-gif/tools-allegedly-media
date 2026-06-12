export async function onRequestGet() {
  return Response.json({
    ok: true,
    data: [],
    meta: {
      source: 'legacy-cloudflare-mock',
      version: 'legacy-v1.3.0',
      note: 'Schedule-owned mock endpoint shape only. Legacy Cloudflare mock only. Coolify API skeleton is the active planning direction; the browser app still reads static JSON.'
    },
    errors: []
  });
}
