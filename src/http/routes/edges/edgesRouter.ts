import Router from '@koa/router';
import { createEdgeController } from './controllers/createEdgeController';
import { deleteEdgeController } from './controllers/deleteEdgeController';
import { validate } from '@/http/middlewares/validation/validator';
import { edge_z } from '@/http/middlewares/validation/schemas';
import { parseBody } from '@/http/middlewares/parsing/parseBody';

export function createEdgesRouter() {
  const router = new Router();
  router.post('/', parseBody, validate(edge_z, 'body'), createEdgeController);
  router.delete('/:source_node_title/:target_node_title', validate(edge_z, 'params'), deleteEdgeController);
  return router;
}
