// Node endpoints. Nodes are identified by `title` — an ascending number the
// server generates on creation.
window.GraphExplorer = window.GraphExplorer || {};
GraphExplorer.api = GraphExplorer.api || {};

Object.assign(GraphExplorer.api, {
  // POST /nodes -> { id: <title> }  (the field is named `id` server-side but
  // it carries the node title). Returns the new node's title as a number.
  async createNode() {
    const { http, config } = GraphExplorer;
    const res = await http.post(config.NODES_PATH);
    return Number(res.id);
  },

  // DELETE /nodes/:node_title
  async deleteNode(title) {
    const { http, config } = GraphExplorer;
    await http.del(`${config.NODES_PATH}/${title}`);
  },

  // STUB — not yet implemented on the backend.
  // Expected: GET /nodes -> { nodes: [{ title }], edges: [{ source_node_title, target_node_title }] }
  // Used to hydrate the canvas on load / reset.
  async getAllNodes() {
    const { http, config } = GraphExplorer;
    const res = await http.get(config.NODES_PATH);
    return {
      nodes: (res?.nodes ?? []).map(n => Number(n.title)),
      edges: (res?.edges ?? []).map(e => [
        Number(e.source_node_title),
        Number(e.target_node_title),
      ]),
    };
  },
});
