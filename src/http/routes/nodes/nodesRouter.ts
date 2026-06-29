import Router from '@koa/router';
import { createNodeController } from './controllers/createNodeController';
import { deleteNodeController } from './controllers/deleteNodeController';
import { validate } from '@/http/middlewares/validation/validator';
import { node_title_z } from '@/http/middlewares/validation/schemas';
import { parseBody } from '@/http/middlewares/parsing/parseBody';

export function createNodesRouter() {
  const router = new Router();
  router.post('/', parseBody, createNodeController);
  router.delete('/:node_title', validate(node_title_z, 'params'), deleteNodeController);
  return router;
}
