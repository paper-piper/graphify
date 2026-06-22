import Koa from 'koa'
import Router from '@koa/router'
import BodyParser from '@koa/bodyparser'
import { hasCycle } from './hasCycles';
import { getAllPaths } from './getAllPaths';
import { getComponents } from './getComponents';
import { getDegrees } from './getDegrees';

export const queriesRouter = new Router();

queriesRouter.get('/cycles', async (ctx) => hasCycle(ctx))

queriesRouter.get('/paths', async (ctx) => getAllPaths(ctx))

queriesRouter.get('/components', async (ctx) => getComponents(ctx))

queriesRouter.get('/degrees/:nodeId', async (ctx) => getDegrees(ctx))