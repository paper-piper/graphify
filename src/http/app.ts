import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from '@koa/bodyparser';
import { nodesRouter } from './nodes/nodesRouter';
import { edgesRouter } from './edges/edgesRouter';
import { queriesRouter } from './queries/queriesRouter';
import { load_env } from '../env/load_env';

export default function setup_app(){
  load_env()

  const app = new Koa();
  const root_router = new Router();

  app.use(bodyParser());

  root_router.use('/nodes', nodesRouter.routes());
  root_router.use('/edges', edgesRouter.routes());
  root_router.use('/queries', queriesRouter.routes());

  app.use(root_router.routes())
  app.use(root_router.allowedMethods());
  return app;
}