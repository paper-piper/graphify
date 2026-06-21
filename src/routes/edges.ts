import { Router } from 'express';
import { z } from 'zod';
import { create_edge } from '../services/createEdge'
import { delete_edge } from '../services/deleteEdge'
import { NoResultError } from 'kysely';
import { edge_z } from '../routes/schemas'
export const edgesRouter = Router();



edgesRouter.post('/', async (req, res) => {
    const parsed = edge_z.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ error: z.treeifyError(parsed.error) });
        return;
    }
    const { source_node_id, target_node_id } = parsed.data;
    try {
        await create_edge(source_node_id, target_node_id)
        res.status(201).send()
    } catch (err) {
        res.status(500).json({ error: 'Failed to create edge' })
    }
})

edgesRouter.delete('/:sourceId/:targetId', async (req, res) => {
    const parsed = edge_z.safeParse(req.params);
    if (!parsed.success) {
        res.status(400).json({ error: z.treeifyError(parsed.error) });
        return;
    }
    const { source_node_id, target_node_id } = parsed.data;
    try {
        await delete_edge(source_node_id, target_node_id)
        res.status(200).send()
    } catch (err) {
        if (err instanceof NoResultError) {
            res.status(404).json({ error: 'edge not found' })
        } else {
            res.status(500).json({ error: 'Failed to delete edge' })
        }
    }
})