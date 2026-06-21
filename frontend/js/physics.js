// Force-directed layout — one simulation tick.
// Mutates x/y/vx/vy on each node object in-place.
window.PhysicsStep = function (nodes, edges, vw, vh, dragId) {
  const cx = vw / 2, cy = vh / 2;
  const rep = 11000, spring = 0.018, rest = 130, center = 0.006, damp = 0.86;
  const nodeById = (id) => nodes.find((n) => n.id === id);

  // Repulsion + center gravity
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    if (a.id === dragId) continue;
    let fx = 0, fy = 0;
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d2 = dx * dx + dy * dy || 0.01;
      const d = Math.sqrt(d2);
      const f = rep / d2;
      fx += (dx / d) * f;
      fy += (dy / d) * f;
    }
    fx += (cx - a.x) * center;
    fy += (cy - a.y) * center;
    a.vx = (a.vx + fx * 0.08) * damp;
    a.vy = (a.vy + fy * 0.08) * damp;
  }

  // Spring attraction along edges
  for (const e of edges) {
    const a = nodeById(e.a), b = nodeById(e.b);
    if (!a || !b) continue;
    const dx = b.x - a.x, dy = b.y - a.y;
    const d = Math.hypot(dx, dy) || 0.01;
    const f = (d - rest) * spring;
    const ux = dx / d, uy = dy / d;
    if (a.id !== dragId) { a.vx += ux * f; a.vy += uy * f; }
    if (b.id !== dragId) { b.vx -= ux * f; b.vy -= uy * f; }
  }

  // Integrate + clamp to canvas
  const margin = 28;
  for (const a of nodes) {
    if (a.id === dragId) continue;
    a.x += Math.max(-24, Math.min(24, a.vx));
    a.y += Math.max(-24, Math.min(24, a.vy));
    a.x = Math.max(margin, Math.min(vw - margin, a.x));
    a.y = Math.max(margin, Math.min(vh - margin, a.y));
  }
};
