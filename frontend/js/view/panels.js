// Formatters that turn raw server query results (arrays of node titles) into
// the sidebar panel state plus the canvas highlight set. Pure functions: they
// read the store for labels but mutate nothing.
window.GraphExplorer = window.GraphExplorer || {};

(function () {
  const Store = () => GraphExplorer.GraphStore;
  const labelOf = (store, title) => {
    const n = store.nodeByTitle(title);
    return n ? n.label : String(title);
  };

  // --- neighbors / degree (GET /queries/degrees/:title) ---
  function neighbors(store, title, neighborTitles) {
    const nodeSet = new Set([title]);
    const edgeSet = new Set();
    const sorted = neighborTitles.slice().sort((a, b) => a - b);
    for (const nt of sorted) {
      nodeSet.add(nt);
      edgeSet.add(Store().edgeId(title, nt));
    }
    return {
      hl: { nodes: nodeSet, edges: edgeSet, kind: 'neighbors', comp: null },
      panel: {
        type: 'neighbors',
        label: String(title),
        degree: neighborTitles.length,
        chips: sorted.map(nt => labelOf(store, nt)),
      },
    };
  }

  // --- connected components (GET /queries/components) ---
  function components(store, comps) {
    const palette = GraphExplorer.constants.palette;
    const compMap = new Map();
    comps.forEach((grp, i) => { for (const t of grp) compMap.set(t, i % palette.length); });

    const list = comps.map((grp, i) => {
      const pal = palette[i % palette.length];
      const members = grp.slice().sort((a, b) => a - b)
        .map(t => ({ label: labelOf(store, t), bg: pal.soft, fg: pal.stroke }));
      return {
        color: pal.stroke,
        title: 'Component ' + (i + 1),
        count: grp.length + ' node' + (grp.length === 1 ? '' : 's'),
        members,
      };
    });

    return {
      hl: { nodes: new Set(), edges: new Set(), kind: 'components', comp: compMap },
      panel: {
        type: 'components',
        summary: comps.length + ' connected ' + (comps.length === 1
          ? 'component (the whole graph is reachable).'
          : 'components (separate neighborhoods).'),
        list,
      },
    };
  }

  // --- cycle (GET /queries/cycle, stub) ---
  function cycle(store, { hasCycle, cycle: cycleTitles, independentCycles }) {
    if (hasCycle && cycleTitles.length) {
      const edgeSet = new Set();
      for (let i = 0; i < cycleTitles.length; i++) {
        const a = cycleTitles[i];
        const b = cycleTitles[(i + 1) % cycleTitles.length];
        edgeSet.add(Store().edgeId(a, b));
      }
      const chips = cycleTitles.map(t => labelOf(store, t));
      return {
        hl: { nodes: new Set(cycleTitles), edges: edgeSet, kind: 'cycle', comp: null },
        panel: {
          type: 'cycle', hasCycle: true, headline: 'Cycle detected',
          detail: independentCycles + ' independent cycle' + (independentCycles === 1 ? '' : 's')
            + ' (cyclomatic number = E − N + components). The graph is not a forest.',
          chips: [...chips, chips[0]].map(l => ({ label: l })),
        },
      };
    }
    return {
      hl: { nodes: new Set(), edges: new Set(), kind: null, comp: null },
      panel: {
        type: 'cycle', hasCycle: false, headline: 'No cycles',
        detail: 'Every component is a tree — this graph is a forest. There is no way back to a node without re-using an edge.',
        chips: [],
      },
    };
  }

  // --- all paths (GET /queries/paths) ---
  function buildPaths(store, paths) {
    return paths.map(p => {
      const edges = [];
      for (let i = 0; i < p.length - 1; i++) edges.push(Store().edgeId(p[i], p[i + 1]));
      return {
        nodes: p,
        edges,
        seq: p.map(t => labelOf(store, t)).join('  →  '),
        len: edges.length + ' hop' + (edges.length === 1 ? '' : 's'),
      };
    });
  }

  function pathHighlight(pathData) {
    return { nodes: new Set(pathData.nodes), edges: new Set(pathData.edges), kind: 'path', comp: null };
  }

  function pathsResult(store, fromTitle, toTitle, rawPaths) {
    const sorted = rawPaths.slice().sort((a, b) => a.length - b.length);
    const pathsData = buildPaths(store, sorted);
    const sl = String(fromTitle);
    const tl = String(toTitle);

    if (pathsData.length) {
      return {
        pathsData, activePath: 0,
        hl: pathHighlight(pathsData[0]),
        panel: {
          type: 'paths',
          summary: pathsData.length + ' simple path' + (pathsData.length === 1 ? '' : 's') + ' from ' + sl + ' to ' + tl + '.',
          subhead: 'TAP A PATH TO HIGHLIGHT',
        },
      };
    }
    return {
      pathsData: [], activePath: 0,
      hl: { nodes: new Set([fromTitle, toTitle]), edges: new Set(), kind: 'path', comp: null },
      panel: {
        type: 'paths',
        summary: 'No path connects ' + sl + ' to ' + tl + ' — they are in different components.',
        subhead: '',
      },
    };
  }

  GraphExplorer.panels = { neighbors, components, cycle, pathHighlight, pathsResult };
})();
