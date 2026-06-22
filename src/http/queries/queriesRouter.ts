import Router from '@koa/router'
import { handleHasCycle } from './handleHasCycle';
import { handleGetAllPaths } from './handleGetAllPaths';
import { handleGetComponents } from './HandleGetComponents';
import { handleGetDegrees } from './handleGetDegrees';

export const queriesRouter = new Router();

queriesRouter.get('/cycles', async (ctx) => handleHasCycle(ctx))

queriesRouter.get('/paths', async (ctx) => handleGetAllPaths(ctx))

queriesRouter.get('/components', async (ctx) => handleGetComponents(ctx))

queriesRouter.get('/degrees/:nodeId', async (ctx) => handleGetDegrees(ctx))