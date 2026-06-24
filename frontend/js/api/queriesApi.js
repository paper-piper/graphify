// Graph analysis endpoints. All of these are DFS-powered on the server and
// operate over node titles.
window.GraphExplorer = window.GraphExplorer || {};
GraphExplorer.api = GraphExplorer.api || {};

Object.assign(GraphExplorer.api, {
  // GET /queries/degrees/:node_title -> { node, neighbors: [title] }
  async getNeighbors(title) {
    const { http, config } = GraphExplorer;
    const res = await http.get(`${config.QUERIES_PATH}/degrees/${title}`);
    return (res?.neighbors ?? []).map(Number);
  },

  // GET /queries/components -> { components: [[title]] }
  async getComponents() {
    const { http, config } = GraphExplorer;
    const res = await http.get(`${config.QUERIES_PATH}/components`);
    return (res?.components ?? []).map(group => group.map(Number));
  },

  // GET /queries/cycles -> { has_cycle: boolean }
  async hasCycle() {
    const { http, config } = GraphExplorer;
    const res = await http.get(`${config.QUERIES_PATH}/cycles`);
    return !!res?.has_cycle;
  },

  // STUB — not yet implemented on the backend.
  // Expected: GET /queries/cycle ->
  //   { has_cycle: boolean, cycle: [title], independent_cycles: number }
  // `cycle` is one concrete cycle (ordered node titles); `independent_cycles`
  // is the cyclomatic number (E - N + components).
  async getCycle() {
    const { http, config } = GraphExplorer;
    const res = await http.get(`${config.QUERIES_PATH}/cycle`);
    return {
      hasCycle: !!res?.has_cycle,
      cycle: (res?.cycle ?? []).map(Number),
      independentCycles: Number(res?.independent_cycles ?? 0),
    };
  },

  // GET /queries/paths?source_node_title=&target_node_title= -> { paths: [[title]] }
  async getAllPaths(fromTitle, toTitle) {
    const { http, config } = GraphExplorer;
    const res = await http.get(`${config.QUERIES_PATH}/paths`, {
      query: { source_node_title: fromTitle, target_node_title: toTitle },
    });
    return (res?.paths ?? []).map(path => path.map(Number));
  },
});
