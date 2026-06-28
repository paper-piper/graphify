import Router from '@koa/router';
import { createNode } from './createNode';
import { deleteNode } from './deleteNode';

export function createNodesRouter() {
  const router = new Router();
  router.post('/', async (ctx) => createNode(ctx));
  router.delete('/:node_title', async (ctx) => deleteNode(ctx));
  return router;
}
