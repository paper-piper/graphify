import { Router } from 'express';
import { hasCycle } from '../graph/queries/hasCycle'
import { getAllNodePaths } from '../graph/queries/getAllNodePaths';
import { getConnectedComponents } from '../graph/queries/getConnectedComponents';
import { getNodeDegrees } from '../graph/queries/getNodeDegrees';
import { AdjacencyList } from '../graph/graph.types';
import { buildAdjacencyList } from '../graph/buildAdjacencyList';
export const queriesRouter = Router();

queriesRouter.get('/cycles', async (_req, res) => {
    try{
        const adj: AdjacencyList = await buildAdjacencyList()
        const has_cycle: boolean = hasCycle(adj)
        res.status(201).json({has_cycle})
    }
    catch{
        res.status(500).json({ error: 'Failed to find cycles' })
    }
})

queriesRouter.get('/paths', async (req, res) => {
    const { from, to } = req.query;
    if (!from || !to) {
        res.status(400).json({ error: 'from and to query params are required' });
        return;
    }
    try {
        const adj: AdjacencyList = await buildAdjacencyList();
        const paths = getAllNodePaths(adj, from as string, to as string);
        res.status(200).json({ paths });
    } catch {
        res.status(500).json({ error: 'Failed to find paths' });
    }
})

queriesRouter.get('/components', async (_req, res) => {
    try {
        const adj: AdjacencyList = await buildAdjacencyList();
        const components = getConnectedComponents(adj);
        res.status(200).json({ components: components.map(s => [...s]) });
    } catch {
        res.status(500).json({ error: 'Failed to find connected components' });
    }
})

queriesRouter.get('/degrees/:nodeId', async (req, res) => {
    const { nodeId } = req.params;
    try {
        const adj: AdjacencyList = await buildAdjacencyList();
        const degrees = getNodeDegrees(adj, nodeId);
        res.status(200).json({ node: nodeId, neighbors: [...degrees] });
    } catch {
        res.status(500).json({ error: 'Failed to get node degrees' });
    }
})