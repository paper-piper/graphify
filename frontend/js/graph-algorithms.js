window.GraphAlgo = (function () {

  function buildAdj(nodes, edges) {
    const m = new Map();
    for (const n of nodes) m.set(n.id, []);
    for (const e of edges) {
      if (m.has(e.a)) m.get(e.a).push({ node: e.b, edgeId: e.id });
      if (m.has(e.b)) m.get(e.b).push({ node: e.a, edgeId: e.id });
    }
    return m;
  }

  function getComponents(nodes, adj) {
    const seen = new Set();
    const comps = [];
    for (const n of nodes) {
      if (seen.has(n.id)) continue;
      const q = [n.id];
      seen.add(n.id);
      const grp = [];
      while (q.length) {
        const u = q.shift();
        grp.push(u);
        for (const { node: v } of adj.get(u) || [])
          if (!seen.has(v)) { seen.add(v); q.push(v); }
      }
      comps.push(grp);
    }
    return comps;
  }

  function findCycleOne(nodes, adj) {
    const visited = new Set();
    const parent = new Map();
    const pedge = new Map();
    const dfs = (u, viaEdge) => {
      visited.add(u);
      for (const { node: v, edgeId } of adj.get(u) || []) {
        if (edgeId === viaEdge) continue;
        if (!visited.has(v)) {
          parent.set(v, u);
          pedge.set(v, edgeId);
          const r = dfs(v, edgeId);
          if (r) return r;
        } else {
          const cn = [u], ce = [edgeId];
          let x = u;
          while (x !== v && parent.has(x)) { ce.push(pedge.get(x)); x = parent.get(x); cn.push(x); }
          return { nodeIds: cn, edgeIds: ce };
        }
      }
      return null;
    };
    for (const n of nodes) {
      if (!visited.has(n.id)) { const r = dfs(n.id, null); if (r) return r; }
    }
    return null;
  }

  function findAllPaths(adj, src, target) {
    const res = [];
    const seen = new Set([src]);
    const stack = [src];
    const estack = [];
    const dfs = (u) => {
      if (res.length > 200) return;
      if (u === target) { res.push({ nodes: stack.slice(), edges: estack.slice() }); return; }
      for (const { node: v, edgeId } of adj.get(u) || []) {
        if (!seen.has(v)) {
          seen.add(v); stack.push(v); estack.push(edgeId);
          dfs(v);
          estack.pop(); stack.pop(); seen.delete(v);
        }
      }
    };
    dfs(src);
    return res;
  }

  return { buildAdj, getComponents, findCycleOne, findAllPaths };
})();
