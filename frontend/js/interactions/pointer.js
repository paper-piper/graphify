// Pointer handling: node dragging, edge selection, background clicks. Operates
// on the live component instance (`c`). Click-vs-drag is disambiguated by a
// small movement threshold; a non-drag release routes to actions.handleNodeClick.
window.GraphExplorer = window.GraphExplorer || {};

(function () {
  function svgPoint(c, e) {
    const r = c.svgEl.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function onNodeDown(c, e) {
    e.stopPropagation();
    const title = Number(e.currentTarget.dataset.id);
    const n = c.store.nodeByTitle(title);
    if (!n) return;
    const p = svgPoint(c, e);
    c.drag = { title, moved: false, sx: e.clientX, sy: e.clientY, offx: n.x - p.x, offy: n.y - p.y };
  }

  function onMove(c, e) {
    if (!c.drag) return;
    if (!c.drag.moved && Math.hypot(e.clientX - c.drag.sx, e.clientY - c.drag.sy) > 4) c.drag.moved = true;
    if (c.drag.moved) {
      const n = c.store.nodeByTitle(c.drag.title);
      if (!n) { c.drag = null; return; }
      const p = svgPoint(c, e);
      n.x = p.x + c.drag.offx;
      n.y = p.y + c.drag.offy;
      n.vx = 0;
      n.vy = 0;
      c.forceUpdate();
    }
  }

  function onUp(c) {
    if (!c.drag) return;
    const d = c.drag;
    c.drag = null;
    if (!d.moved) GraphExplorer.actions.handleNodeClick(c, d.title);
  }

  function onEdgeDown(c, e) {
    e.stopPropagation();
    if (c.state.mode !== 'idle') return;
    const id = e.currentTarget.dataset.id;
    c.hl = { nodes: new Set(), edges: new Set([id]), kind: 'select', comp: null };
    c.setState({ selection: { type: 'edge', id }, panel: { type: 'none' } });
  }

  function onBgDown(c) {
    if (c.state.mode === 'connect') { c.setState({ pending: null }); return; }
    if (c.state.mode === 'path') { c.setState({ pathSrc: null }); return; }
    GraphExplorer.actions.clearAnalysis(c, true);
  }

  GraphExplorer.pointer = { svgPoint, onNodeDown, onMove, onUp, onEdgeDown, onBgDown };
})();
