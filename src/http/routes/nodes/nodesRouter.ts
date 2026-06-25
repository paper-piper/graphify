import Router from '@koa/router';
import { createNode } from './createNode';
import { deleteNode } from './deleteNode';

export const nodesRouter = new Router();

nodesRouter.post('/', async (ctx) => createNode(ctx));

nodesRouter.delete('/:node_title', async (ctx) => deleteNode(ctx));
