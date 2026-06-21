/**
 * Backend API client.
 *
 * Expected endpoints
 * ──────────────────
 * GET  /api/graph
 *   → { nodes: [{id, label}], edges: [{id, a, b}] }
 *
 * POST /api/graph/nodes
 *   → { id, label }
 *
 * DELETE /api/graph/nodes/:id
 *   → 204
 *
 * POST /api/graph/edges          body: { a, b }
 *   → { id, a, b }
 *
 * DELETE /api/graph/edges/:id
 *   → 204
 *
 * GET  /api/graph/components
 *   → Array<{ ids: string[] }>
 *
 * GET  /api/graph/cycles
 *   → { hasCycle: boolean, cyclomaticNumber: number, nodeIds: string[], edgeIds: string[] }
 *
 * GET  /api/graph/paths?from=:id&to=:id
 *   → Array<{ nodeIds: string[], edgeIds: string[] }>
 *
 * POST /api/graph/reset
 *   → { nodes: [{id, label}], edges: [{id, a, b}] }
 *
 * The backend must send CORS headers (Access-Control-Allow-Origin: *) so the
 * browser will accept cross-origin requests from the frontend dev server.
 */

const API_BASE = 'http://localhost:3000';

async function request(method, path, body) {
  const opts = { method, headers: {} };
  if (body !== undefined) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(API_BASE + path, opts);
  if (!res.ok) throw new Error(`${method} ${path} → HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
}

window.Api = {
  graph:      ()         => request('GET',    '/api/graph'),
  createNode: ()         => request('POST',   '/api/graph/nodes'),
  deleteNode: (id)       => request('DELETE', `/api/graph/nodes/${id}`),
  createEdge: (a, b)     => request('POST',   '/api/graph/edges', { a, b }),
  deleteEdge: (id)       => request('DELETE', `/api/graph/edges/${id}`),
  components: ()         => request('GET',    '/api/graph/components'),
  cycles:     ()         => request('GET',    '/api/graph/cycles'),
  paths:      (from, to) => request('GET',    `/api/graph/paths?from=${from}&to=${to}`),
  reset:      ()         => request('POST',   '/api/graph/reset'),
};
