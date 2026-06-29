import Router from '@koa/router';
import { hasCycleController } from './controlllers/hasCycleController';
import { getAllPathsController } from './controlllers/getAllPathsController';
import { getComponentsController } from './controlllers/getComponentsController';
import { getDegreesController } from './controlllers/getDegreesController';
import { validate } from '@/http/middlewares/validation/validator';
import { paths_query_z, node_title_z } from '@/http/middlewares/validation/schemas';

export function createQueriesRouter() {
  const router = new Router();
  router.get('/cycles', hasCycleController);
  router.get('/paths', validate(paths_query_z, 'query'), getAllPathsController);
  router.get('/components', getComponentsController);
  router.get('/degrees/:node_title', validate(node_title_z, 'params'), getDegreesController);
  return router;
}
