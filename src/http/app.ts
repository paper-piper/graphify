import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from '@koa/bodyparser';
import { nodesRouter } from './routes/nodes/nodesRouter';
import { edgesRouter } from './routes/edges/edgesRouter';
import { queriesRouter } from './routes/queries/queriesRouter';
import { loadEnv } from '../env/load_env';
import { buildDb } from '../db/buildDb';

export default function setupApp(){
  loadEnv();
  buildDb();

  const app = new Koa();
  const root_router = new Router();

  app.use(bodyParser());

  root_router.use('/nodes', nodesRouter.routes());
  root_router.use('/edges', edgesRouter.routes());
  root_router.use('/queries', queriesRouter.routes());

  app.use(root_router.routes());
  app.use(root_router.allowedMethods());
  return app;
}
