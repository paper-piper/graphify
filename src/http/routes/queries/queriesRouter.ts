import Router from '@koa/router';
import { hasCycleHandler } from './hasCycleHandler';
import { getAllPathsHandler } from './getAllPathsHandler';
import { getComponentsHandler } from './getComponentsHandler';
import { getDegreesHandler } from './getDegreesHandler';

export function createQueriesRouter() {
  const router = new Router();
  router.get('/cycles', async (ctx) => hasCycleHandler(ctx));
  router.get('/paths', async (ctx) => getAllPathsHandler(ctx));
  router.get('/components', async (ctx) => getComponentsHandler(ctx));
  router.get('/degrees/:node_title', async (ctx) => getDegreesHandler(ctx));
  return router;
}
