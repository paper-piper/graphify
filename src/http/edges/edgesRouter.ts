import Koa from 'koa'
import Router from '@koa/router'
import BodyParser from '@koa/bodyparser'
import { createEdge } from './createEdge';
import { deleteEdge } from './deleteEdge';

export const edgesRouter = new Router();

edgesRouter.post('/', async (ctx) => createEdge(ctx))

edgesRouter.delete('/:source_node_id/:target_node_id', async (ctx) => deleteEdge)