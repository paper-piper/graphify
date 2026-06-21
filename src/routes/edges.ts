import { Router } from 'express';
import { create_edge } from '../services/createEdge'
import { delete_edge } from '../services/deleteEdge'
import { NoResultError } from 'kysely';


export const edgesRouter = Router();

edgesRouter.post('/', async (req, res) => {
const { source_node_id, target_node_id } = req.body
try {
    await create_edge(source_node_id, target_node_id)
    res.status(201).send()
} catch (err) {
    res.status(500).json({ error: 'Failed to create edge' })
}
})

edgesRouter.delete('/:sourceId/:targetId', async (req, res) => {
    const { sourceId, targetId } = req.params
    try {
        await delete_edge(sourceId, targetId)
        res.status(200).send()
    } catch (err) {
        if (err instanceof NoResultError) {
            res.status(404).json({ error: 'edge not found' })
        } else {
            res.status(500).json({ error: 'Failed to delete edge' })
        }
    }
})