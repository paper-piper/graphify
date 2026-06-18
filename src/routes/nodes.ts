import { Router } from 'express';
import { create_node } from '../services/createNode'
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

nodesRouter.