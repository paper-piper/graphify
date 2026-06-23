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
  const rootRouter = new Router();
  // TODO: handle erros
  // TODO: understand body parser
  app.use(bodyParser());

  rootRouter.use('/nodes', nodesRouter.routes());
  rootRouter.use('/edges', edgesRouter.routes());
  rootRouter.use('/queries', queriesRouter.routes());

  app.use(rootRouter.routes())
  app.use(rootRouter.allowedMethods());
  return app;
}