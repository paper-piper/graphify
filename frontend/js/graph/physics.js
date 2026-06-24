// Force-directed layout. Pure client-side concern: positions are never sent to
// the server. Operates in place on the store's node array.
window.GraphExplorer = window.GraphExplorer || {};

(function () {
  // One simulation step. `drag` is the currently dragged node descriptor (or
  // null); the dragged node is pinned and excluded from forces.
  function step(store, vw, vh, drag) {
    const p = GraphExplorer.constants.physics;
    const ns = store.nodes;
    const cx = vw / 2;
    const cy = vh / 2;

    // Node-node repulsion + centring.
    for (let i = 0; i < ns.length; i++) {
      const a = ns[i];
      if (drag && drag.title === a.title) continue;
      let fx = 0;
      let fy = 0;
      for (let j = 0; j < ns.length; j++) {
        if (i === j) continue;
        const b = ns[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy || 0.01;
        const d = Math.sqrt(d2);
        const f = p.rep / d2;
        fx += (dx / d) * f;
        fy += (dy / d) * f;
      }
      fx += (cx - a.x) * p.center;
      fy += (cy - a.y) * p.center;
      a.vx = (a.vx + fx * 0.08) * p.damp;
      a.vy = (a.vy + fy * 0.08) * p.damp;
    }

    // Edge springs.
    for (const e of store.edges) {
      const a = store.nodeByTitle(e.a);
      const b = store.nodeByTitle(e.b);
      if (!a || !b) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 0.01;
      const f = (d - p.rest) * p.spring;
      const ux = dx / d;
      const uy = dy / d;
      if (!(drag && drag.title === a.title)) { a.vx += ux * f; a.vy += uy * f; }
      if (!(drag && drag.title === b.title)) { b.vx -= ux * f; b.vy -= uy * f; }
    }

    // Integrate + clamp to canvas.
    const m = p.margin;
    for (const a of ns) {
      if (drag && drag.title === a.title) continue;
      a.x += Math.max(-p.maxStep, Math.min(p.maxStep, a.vx));
      a.y += Math.max(-p.maxStep, Math.min(p.maxStep, a.vy));
      a.x = Math.max(m, Math.min(vw - m, a.x));
      a.y = Math.max(m, Math.min(vh - m, a.y));
    }
  }

  GraphExplorer.physics = { step };
})();
