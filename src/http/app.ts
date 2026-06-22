import Koa from 'koa';
import Router from '@koa/router';
import { nodesRouter } from './nodes/nodesRouter';
import { edgesRouter } from './edges/edgesRouter';
import { queriesRouter } from './queries/queriesRouter';

const app = new Koa();
const rootRouter = new Router();

rootRouter.use('/nodes', nodesRouter.routes());
rootRouter.use('/edges', edgesRouter.routes());
rootRouter.use('/queries', queriesRouter.routes());

app.use(rootRouter.allowedMethods());

export default app;