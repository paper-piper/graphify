import Koa from 'koa';
import Router from '@koa/router';
import { createNodesRouter } from './http/routes/nodes/nodesRouter';
import { createEdgesRouter } from './http/routes/edges/edgesRouter';
import { createQueriesRouter } from './http/routes/queries/queriesRouter';
import { loadEnv } from './env/load_env';
import { buildDb } from './db/buildDb';
import { handleErrors } from './http/middlewares/error/errorHandler';
import { log_requests } from './http/middlewares/logging/log';

export default function setupApp(){
  loadEnv();
  buildDb();

  const app = new Koa();
  const root_router = new Router();

  app.use(log_requests)
  app.use(handleErrors);

  root_router.use('/nodes', createNodesRouter().routes());
  root_router.use('/edges', createEdgesRouter().routes());
  root_router.use('/queries', createQueriesRouter().routes());

  app.use(root_router.routes());
  app.use(root_router.allowedMethods());
  return app;
}
