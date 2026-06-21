import { Router } from 'express';
import { z } from 'zod';
import { create_edge } from '../../services/createEdge'
import { delete_edge } from '../../services/deleteEdge'
import { NoResultError } from 'kysely';
import { edge_z } from '../schemas'
import { HTTP_STATUS } from '../httpStatus';
export const edgesRouter = Router();


edgesRouter.post('/', async (req, res) => {
    const parsed = edge_z.safeParse(req.body);
    if (!parsed.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: z.treeifyError(parsed.error) });
        return;
    }
    const { source_node_id, target_node_id } = parsed.data;
    try {
        await create_edge(source_node_id, target_node_id)
        res.status(HTTP_STATUS.CREATED).send()
    } catch (err) {
        if (typeof err === 'object' && err !== null && 'code' in err && err.code === '23505') {
            res.status(HTTP_STATUS.CONFLICT).json({ error: 'Edge already exists' })
        } else {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create edge' })
        }
    }
})

edgesRouter.delete('/:sourceId/:targetId', async (req, res) => {
    const parsed = edge_z.safeParse(req.params);
    if (!parsed.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: z.treeifyError(parsed.error) });
        return;
    }
    const { source_node_id, target_node_id } = parsed.data;
    try {
        await delete_edge(source_node_id, target_node_id)
        res.status(HTTP_STATUS.NO_CONTENT).send()
    } catch (err) {
        if (err instanceof NoResultError) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'edge not found' })
        } else {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete edge' })
        }
    }
})