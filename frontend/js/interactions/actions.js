// User actions. Every graph mutation and every query is a server round-trip
// (see GraphExplorer.api); the local store is updated only to mirror what the
// server now holds. Physics, selection and highlighting stay client-side.
window.GraphExplorer = window.GraphExplorer || {};

(function () {
  const api = () => GraphExplorer.api;
  const panels = () => GraphExplorer.panels;

  // Reset the highlight overlay (and optionally the sidebar panel/selection).
  function clearAnalysis(c, resetPanel) {
    c.hl = { nodes: new Set(), edges: new Set(), kind: null, comp: null };
    c.pathsData = null;
    if (resetPanel) c.setState({ panel: { type: 'none' }, selection: null });
    else c.forceUpdate();
  }

  function spawnPosition(c) {
    return {
      x: c.vw / 2 + (Math.random() * 140 - 70),
      y: c.vh / 2 + (Math.random() * 140 - 70),
    };
  }

  // Hydrate the canvas from the server. Falls back to an empty graph if the
  // backend is unreachable so the UI still renders.
  async function loadGraph(c) {
    let data = { nodes: [], edges: [] };
    try {
      data = await api().getAllNodes();
    } catch (err) {
      console.error('[GraphExplorer] failed to load graph', err);
    }
    c.store.nodes = [];
    c.store.edges = [];
    for (const title of data.nodes) {
      const p = spawnPosition(c);
      c.store.addNode(title, p.x, p.y);
    }
    for (const [a, b] of data.edges) c.store.addEdge(a, b);
    clearAnalysis(c, true);
  }

  // --- build ---
  async function addNode(c) {
    try {
      const title = await api().createNode();
      const p = spawnPosition(c);
      c.store.addNode(title, p.x, p.y);
      clearAnalysis(c, true);
      if (c.state.physicsOn === false) c.forceUpdate();
    } catch (err) {
      console.error('[GraphExplorer] createNode failed', err);
    }
  }

  async function createEdge(c, a, b) {
    if (a === b || c.store.edgeBetween(a, b)) return;
    try {
      await api().createEdge(a, b); // false (409) still means the edge exists
      c.store.addEdge(a, b);
      clearAnalysis(c, false);
    } catch (err) {
      console.error('[GraphExplorer] createEdge failed', err);
    }
  }

  async function deleteSelected(c) {
    const sel = c.state.selection;
    if (!sel) return;
    try {
      if (sel.type === 'node') {
        await api().deleteNode(sel.title);
        c.store.removeNode(sel.title);
      } else if (sel.type === 'edge') {
        const e = c.store.edges.find(x => x.id === sel.id);
        if (e) {
          await api().deleteEdge(e.a, e.b);
          c.store.removeEdgeById(sel.id);
        }
      }
      clearAnalysis(c, true);
    } catch (err) {
      console.error('[GraphExplorer] delete failed', err);
    }
  }

  // --- modes ---
  function toggleConnect(c) {
    const on = c.state.mode === 'connect';
    c.setState({ mode: on ? 'idle' : 'connect', pending: null, pathSrc: null });
    if (!on) clearAnalysis(c, true);
  }
  function startPath(c) {
    const on = c.state.mode === 'path';
    c.setState({ mode: on ? 'idle' : 'path', pathSrc: null, pending: null });
    if (!on) clearAnalysis(c, true);
  }
  function cancelMode(c) { c.setState({ mode: 'idle', pending: null, pathSrc: null }); }
  function togglePhysics(c) { c.setState(s => ({ physicsOn: !s.physicsOn })); }
  async function resetGraph(c) {
    await loadGraph(c);
    c.setState({ mode: 'idle', pending: null, pathSrc: null, physicsOn: true });
  }

  // Route a node click depending on the active mode.
  function handleNodeClick(c, title) {
    const { mode, pending, pathSrc } = c.state;
    if (mode === 'connect') {
      if (!pending) c.setState({ pending: title });
      else if (pending !== title) { createEdge(c, pending, title); c.setState({ pending: null }); }
      else c.setState({ pending: null });
      return;
    }
    if (mode === 'path') {
      if (!pathSrc) c.setState({ pathSrc: title });
      else runPaths(c, pathSrc, title);
      return;
    }
    neighborsQuery(c, title);
  }

  // --- queries (server-side analysis) ---
  async function neighborsQuery(c, title) {
    try {
      const neighborTitles = await api().getNeighbors(title);
      const { hl, panel } = panels().neighbors(c.store, title, neighborTitles);
      c.hl = hl;
      c.setState({ selection: { type: 'node', title }, panel });
    } catch (err) {
      console.error('[GraphExplorer] getNeighbors failed', err);
    }
  }

  async function findComponents(c) {
    try {
      const comps = await api().getComponents();
      const { hl, panel } = panels().components(c.store, comps);
      c.hl = hl;
      c.setState({ selection: null, panel });
    } catch (err) {
      console.error('[GraphExplorer] getComponents failed', err);
    }
  }

  async function detectCycles(c) {
    try {
      const res = await api().getCycle();
      const { hl, panel } = panels().cycle(c.store, res);
      c.hl = hl;
      c.setState({ selection: null, panel });
    } catch (err) {
      console.error('[GraphExplorer] getCycle failed', err);
    }
  }

  async function runPaths(c, from, to) {
    try {
      const raw = await api().getAllPaths(from, to);
      const r = panels().pathsResult(c.store, from, to, raw);
      c.pathsData = r.pathsData;
      c.activePath = r.activePath;
      c.hl = r.hl;
      c.setState({ mode: 'idle', pathSrc: null, selection: null, panel: r.panel });
    } catch (err) {
      console.error('[GraphExplorer] getAllPaths failed', err);
    }
  }

  function applyPath(c, idx) {
    c.hl = panels().pathHighlight(c.pathsData[idx]);
  }
  function selectPath(c, idx) {
    c.activePath = idx;
    applyPath(c, idx);
    c.forceUpdate();
  }

  GraphExplorer.actions = {
    clearAnalysis, loadGraph, addNode, createEdge, deleteSelected,
    toggleConnect, startPath, cancelMode, togglePhysics, resetGraph,
    handleNodeClick, neighborsQuery, findComponents, detectCycles,
    runPaths, applyPath, selectPath,
  };
})();
