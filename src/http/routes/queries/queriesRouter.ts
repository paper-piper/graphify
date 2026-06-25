import Router from '@koa/router';
import { hasCycleHandler } from './hasCycleHandler';
import { getAllPathsHandler } from './getAllPathsHandler';
import { getComponentsHandler } from './getComponentsHandler';
import { getDegreesHandler } from './getDegreesHandler';

export const queriesRouter = new Router();

queriesRouter.get('/cycles', async (ctx) => hasCycleHandler(ctx));

queriesRouter.get('/paths', async (ctx) => getAllPathsHandler(ctx));

queriesRouter.get('/components', async (ctx) => getComponentsHandler(ctx));

queriesRouter.get('/degrees/:node_title', async (ctx) => getDegreesHandler(ctx));
