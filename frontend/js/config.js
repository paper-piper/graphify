// Server connection config for the Graph Explorer frontend.
// All paths mirror the Graphify Postman collection / Koa routers.
window.GraphExplorer = window.GraphExplorer || {};

GraphExplorer.config = {
  BASE_URL: 'http://127.0.0.1:3000',
  NODES_PATH: '/nodes',
  EDGES_PATH: '/edges',
  QUERIES_PATH: '/queries',
};
