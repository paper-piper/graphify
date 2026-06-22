import Router from '@koa/router'
import { handleHasCycle } from './handlers/handleHasCycle';
import { handleGetAllPaths } from './handlers/handleGetAllPaths';
import { handleGetComponents } from './handlers/handleGetComponents';
import { handleGetDegrees } from './handlers/handleGetDegrees';

export const queriesRouter = new Router();

queriesRouter.get('/cycles', async (ctx) => handleHasCycle(ctx))

queriesRouter.get('/paths', async (ctx) => handleGetAllPaths(ctx))

queriesRouter.get('/components', async (ctx) => handleGetComponents(ctx))

queriesRouter.get('/degrees/:nodeId', async (ctx) => handleGetDegrees(ctx))