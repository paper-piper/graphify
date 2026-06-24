// Edge endpoints. Edges are undirected and identified by the pair of node
// titles they connect.
window.GraphExplorer = window.GraphExplorer || {};
GraphExplorer.api = GraphExplorer.api || {};

Object.assign(GraphExplorer.api, {
  // POST /edges { source_node_title, target_node_title }
  // Resolves true when created, false on 409 (edge already exists).
  async createEdge(sourceTitle, targetTitle) {
    const { http, config } = GraphExplorer;
    try {
      await http.post(config.EDGES_PATH, {
        body: { source_node_title: sourceTitle, target_node_title: targetTitle },
      });
      return true;
    } catch (err) {
      if (err.status === 409) return false; // already exists — not an error here
      throw err;
    }
  },

  // DELETE /edges/:source_node_title/:target_node_title
  async deleteEdge(sourceTitle, targetTitle) {
    const { http, config } = GraphExplorer;
    await http.del(`${config.EDGES_PATH}/${sourceTitle}/${targetTitle}`);
  },
});
