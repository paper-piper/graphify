import { Router } from 'express';
import { NoResultError } from 'kysely';
import { z } from 'zod';
import { create_node } from '../../services/createNode'
import { delete_node } from '../../services/deleteNode';
import { node_value_z } from '../schemas';
import { node_id_z } from '../schemas';
import { HTTP_STATUS } from '../httpStatus';

export const nodesRouter = Router();
// TODO: migrate to quas - and also move to functions

nodesRouter.post('/', async (req, res) => {
    const parsed = node_value_z.safeParse(req.body);
    if (!parsed.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: z.treeifyError(parsed.error) });
        return;
    }
    try {
        const node_id = await create_node(parsed.data.value)
        res.status(HTTP_STATUS.CREATED).json({ id: node_id })
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create node' })
    }
})

nodesRouter.delete('/:nodeId', async (req, res) => {
    const parsed = node_id_z.safeParse(req.params);
    if (!parsed.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: z.treeifyError(parsed.error) });
        return;
    }
    const { nodeId } = parsed.data;
    try {
        await delete_node(nodeId)
        res.status(HTTP_STATUS.NO_CONTENT).send()
    } catch (err) {
        if (err instanceof NoResultError) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Node not found' })
        } else {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete node' })
        }
    }
})