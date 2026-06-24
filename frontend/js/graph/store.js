// Local, positional mirror of the server-side graph. The server owns identity
// (node titles, which edges exist); this store only adds the x/y/velocity that
// rendering and physics need. It performs no graph algorithms — those live on
// the server (see GraphExplorer.api).
window.GraphExplorer = window.GraphExplorer || {};

(function () {
  class GraphStore {
    constructor() {
      this.nodes = []; // { title, label, id, x, y, vx, vy }
      this.edges = []; // { a, b, id }   (a/b are titles, id is order-independent)
    }

    // Undirected edge id, independent of endpoint order.
    static edgeId(a, b) {
      return a < b ? `${a}_${b}` : `${b}_${a}`;
    }

    nodeByTitle(title) {
      return this.nodes.find(n => n.title === title);
    }

    edgeBetween(a, b) {
      const id = GraphStore.edgeId(a, b);
      return this.edges.find(e => e.id === id);
    }

    // Insert a node carrying a server-assigned title at a canvas position.
    addNode(title, x, y) {
      const node = { title, label: String(title), id: title, x, y, vx: 0, vy: 0 };
      this.nodes.push(node);
      return node;
    }

    addEdge(a, b) {
      if (a === b || this.edgeBetween(a, b)) return null;
      const edge = { a, b, id: GraphStore.edgeId(a, b) };
      this.edges.push(edge);
      return edge;
    }

    removeNode(title) {
      this.nodes = this.nodes.filter(n => n.title !== title);
      this.edges = this.edges.filter(e => e.a !== title && e.b !== title);
    }

    removeEdge(a, b) {
      const id = GraphStore.edgeId(a, b);
      this.edges = this.edges.filter(e => e.id !== id);
    }

    removeEdgeById(id) {
      this.edges = this.edges.filter(e => e.id !== id);
    }

    // Adjacency map keyed by title -> [{ title, edgeId }], built locally for
    // rendering highlights (not for analysis).
    adjacency() {
      const map = new Map();
      for (const n of this.nodes) map.set(n.title, []);
      for (const e of this.edges) {
        if (map.has(e.a)) map.get(e.a).push({ title: e.b, edgeId: e.id });
        if (map.has(e.b)) map.get(e.b).push({ title: e.a, edgeId: e.id });
      }
      return map;
    }

    isEmpty() {
      return this.nodes.length === 0;
    }
  }

  GraphExplorer.GraphStore = GraphStore;
})();
