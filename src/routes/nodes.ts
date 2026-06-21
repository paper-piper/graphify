import { Router } from 'express';
import { NoResultError } from 'kysely';
import { z } from 'zod';
import { create_node } from '../services/createNode'
import { delete_node } from '../services/deleteNode';
import { node_value_z } from './schemas';
import { node_id_z } from './schemas';

export const nodesRouter = Router();



nodesRouter.post('/', async (req, res) => {
    const parsed = node_value_z.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ error: z.treeifyError(parsed.error) });
        return;
    }
    try {
        const node_id = await create_node(parsed.data.value)
        res.status(201).json({ id: node_id })
    } catch (err) {
        res.status(500).json({ error: 'Failed to create node' })
    }
})

nodesRouter.delete('/:nodeId', async (req, res) => {
    const parsed = node_id_z.safeParse(req.params);
    if (!parsed.success) {
        res.status(400).json({ error: z.treeifyError(parsed.error) });
        return;
    }
    const { nodeId } = parsed.data;
    try {
        await delete_node(nodeId)
        res.status(200).send()
    } catch (err) {
        if (err instanceof NoResultError) {
            res.status(404).json({ error: 'Node not found' })
        } else {
            res.status(500).json({ error: 'Failed to delete node' })
        }
    }
})