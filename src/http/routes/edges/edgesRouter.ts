import Router from '@koa/router';
import { createEdge } from './createEdge';
import { deleteEdge } from './deleteEdge';

export function createEdgesRouter() {
  const router = new Router();
  router.post('/', async (ctx) => createEdge(ctx));
  router.delete('/:source_node_title/:target_node_title', async (ctx) => deleteEdge(ctx));
  return router;
}
