import { Router } from 'express';
import { NoResultError } from 'kysely';
import { create_node } from '../services/createNode'
import { delete_node } from '../services/deleteNode';

export const nodesRouter = Router();

nodesRouter.post('/', async (req, res) => {
    const { value } = req.body
    try {
        const node_id = await create_node(typeof value === 'string' ? value : undefined)
        res.status(201).json({ id: node_id })
    } catch (err) {
        res.status(500).json({ error: 'Failed to create node' })
    }
})

nodesRouter.delete('/:nodeId', async (req, res) => {
    const { nodeId } = req.params
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