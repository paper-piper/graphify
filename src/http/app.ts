import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from '@koa/bodyparser';
import { createNodesRouter } from './routes/nodes/nodesRouter';
import { createEdgesRouter } from './routes/edges/edgesRouter';
import { createQueriesRouter } from './routes/queries/queriesRouter';
import { loadEnv } from '../env/load_env';
import { buildDb } from '../db/buildDb';

export default function setupApp(){
  loadEnv();
  buildDb();

  const app = new Koa();
  const root_router = new Router();

  app.use(bodyParser());

  root_router.use('/nodes', createNodesRouter().routes());
  root_router.use('/edges', createEdgesRouter().routes());
  root_router.use('/queries', createQueriesRouter().routes());

  app.use(root_router.routes());
  app.use(root_router.allowedMethods());
  return app;
}
