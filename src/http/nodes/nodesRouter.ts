import Koa from 'koa'
import Router from '@koa/router'
import BodyParser from '@koa/bodyparser'
import { createNode } from './createNode';
import { deleteNode } from './deleteNode';

export const nodesRouter = new Router();

nodesRouter.post('/', async (req, res) => createNode)

nodesRouter.delete('/:nodeId', async (req, res) => deleteNode)