import Router from '@koa/router'
import { createEdge } from './createEdge';
import { deleteEdge } from './deleteEdge';

export const edgesRouter = new Router();

edgesRouter.post('/', async (ctx) => createEdge(ctx))

edgesRouter.delete('/:source_node_title/:target_node_title', async (ctx) => deleteEdge(ctx))
