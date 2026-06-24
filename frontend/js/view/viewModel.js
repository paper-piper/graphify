// Builds the flat view-model the template renders against. Reads the component
// instance (`c`) — its store, highlight set, transient UI state — and produces
// node/edge geometry, control styles, hint text, and the active panel. Also
// wires the template's event handlers to the action / pointer modules.
window.GraphExplorer = window.GraphExplorer || {};

(function () {
  function buildViewModel(c) {
    const K = GraphExplorer.constants;
    const styles = GraphExplorer.styles;
    const { accent, softAccent: softA, red, softRed: softR, palette } = K;
    const store = c.store;
    const hl = c.hl;
    const sel = c.state.selection;
    const st = c.state;

    // --- edges geometry + colour ---
    const edges = store.edges.map(e => {
      const a = store.nodeByTitle(e.a);
      const b = store.nodeByTitle(e.b);
      if (!a || !b) return null;
      let stroke = '#d6d6d1';
      let sw = 1.7;
      if (hl.comp) {
        const ci = hl.comp.get(e.a);
        if (ci != null && ci === hl.comp.get(e.b)) { stroke = palette[ci].stroke; sw = 2.2; }
      }
      if (hl.edges.has(e.id)) {
        if (hl.kind === 'cycle') { stroke = red; sw = 3.4; }
        else if (hl.kind === 'path') { stroke = accent; sw = 3.4; }
        else if (hl.kind === 'select') { stroke = accent; sw = 3.2; }
        else { stroke = accent; sw = 3; }
      }
      return { id: e.id, x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke, sw };
    }).filter(Boolean);

    // --- nodes geometry + colour ---
    const nodes = store.nodes.map(n => {
      let fill = '#ffffff';
      let stroke = '#26262b';
      let lc = '#26262b';
      let sw = 1.7;
      let ring = false;
      let ringColor = accent;
      const ringR = 27;
      if (hl.comp && hl.comp.has(n.title)) {
        const p = palette[hl.comp.get(n.title)];
        fill = p.soft; stroke = p.stroke; lc = p.stroke; sw = 2.2;
      }
      if (hl.nodes.has(n.title)) {
        if (hl.kind === 'cycle') { fill = softR; stroke = red; lc = red; sw = 2.6; }
        else { fill = softA; stroke = accent; lc = accent; sw = 2.6; }
      }
      if (sel && sel.type === 'node' && sel.title === n.title) { stroke = accent; lc = accent; sw = 2.8; }
      if (st.pending === n.title || st.pathSrc === n.title) { ring = true; ringColor = accent; stroke = accent; lc = accent; sw = 2.6; }
      return { id: n.id, label: n.label, x: n.x, y: n.y, fill, stroke, lc, sw, ring, ringColor, ringR };
    });

    // --- control styles ---
    const canDelete = !!sel;
    const physOn = st.physicsOn;

    // --- mode hints ---
    let hintText = '';
    let hintShow = false;
    if (st.mode === 'connect') {
      hintShow = true;
      const p = store.nodeByTitle(st.pending);
      hintText = st.pending ? 'Click a second node to connect ' + (p ? p.label : '') : 'Connect mode — click the first node';
    } else if (st.mode === 'path') {
      hintShow = true;
      hintText = st.pathSrc ? 'Now click the destination node' : 'Find paths — click the start node';
    }

    const p = st.panel;
    const vm = {
      vb: '0 0 ' + c.vw + ' ' + c.vh, vw: c.vw, vh: c.vh,
      nodes, edges,
      stats: { nodeCount: store.nodes.length, edgeCount: store.edges.length },
      isEmpty: store.isEmpty(),

      // handlers -> modules
      addNode: () => GraphExplorer.actions.addNode(c),
      toggleConnect: () => GraphExplorer.actions.toggleConnect(c),
      startPath: () => GraphExplorer.actions.startPath(c),
      detectCycles: () => GraphExplorer.actions.detectCycles(c),
      findComponents: () => GraphExplorer.actions.findComponents(c),
      deleteSelected: () => GraphExplorer.actions.deleteSelected(c),
      togglePhysics: () => GraphExplorer.actions.togglePhysics(c),
      resetGraph: () => GraphExplorer.actions.resetGraph(c),
      cancelMode: () => GraphExplorer.actions.cancelMode(c),
      selectPath: (e) => GraphExplorer.actions.selectPath(c, parseInt(e.currentTarget.dataset.idx, 10)),
      onNodeDown: (e) => GraphExplorer.pointer.onNodeDown(c, e),
      onEdgeDown: (e) => GraphExplorer.pointer.onEdgeDown(c, e),
      onBgDown: () => GraphExplorer.pointer.onBgDown(c),
      setSvg: (el) => { c.svgEl = el; },

      // control styles
      connectStyle: styles.modeButton(st.mode === 'connect'),
      pathStyle: styles.modeButton(st.mode === 'path'),
      deleteStyle: styles.deleteButton(canDelete),
      physicsStyle: styles.physicsButton(physOn),
      physicsDot: physOn ? accent : '#c4c4be',
      physicsLabel: physOn ? 'on' : 'off',

      // hint chips on the controls
      connectHint: st.mode === 'connect' ? (st.pending ? '2nd' : '1st') : 'off',
      pathHint: st.mode === 'path' ? (st.pathSrc ? 'end' : 'start') : '',
      deleteHint: canDelete ? (sel.type === 'node' ? 'node' : 'edge') : '',

      hintText, hintShow,
      panelNone: p.type === 'none',
      panelNeighbors: p.type === 'neighbors',
      panelCycle: p.type === 'cycle',
      panelComponents: p.type === 'components',
      panelPaths: p.type === 'paths',
    };

    if (p.type === 'neighbors') {
      vm.neighbor = { label: p.label, degree: p.degree, chips: p.chips.map(l => ({ label: l })), isolated: p.degree === 0 };
    }
    if (p.type === 'cycle') {
      vm.cycle = {
        hasCycle: p.hasCycle, headline: p.headline, detail: p.detail, chips: p.chips,
        bg: p.hasCycle ? softR : 'oklch(0.96 0.02 150)',
        dot: p.hasCycle ? red : 'oklch(0.58 0.13 150)',
        fg: p.hasCycle ? 'oklch(0.45 0.18 25)' : 'oklch(0.4 0.13 150)',
      };
    }
    if (p.type === 'components') { vm.components = { summary: p.summary, list: p.list }; }
    if (p.type === 'paths') {
      vm.paths = {
        summary: p.summary, subhead: p.subhead,
        list: (c.pathsData || []).map((pd, i) => ({
          idx: i, seq: pd.seq, len: pd.len,
          style: styles.pathRow(i === c.activePath),
        })),
      };
    }
    return vm;
  }

  GraphExplorer.buildViewModel = buildViewModel;
})();
