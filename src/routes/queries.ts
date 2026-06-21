import { Router } from 'express';
import { z } from 'zod';
import { hasCycle } from '../graph/queries/hasCycle'
import { getAllNodePaths } from '../graph/queries/getAllNodePaths';
import { getConnectedComponents } from '../graph/queries/getConnectedComponents';
import { getNodeDegrees } from '../graph/queries/getNodeDegrees';
import { AdjacencyList } from '../graph/graph.types';
import { buildAdjacencyList } from '../graph/buildAdjacencyList';
import { paths_query_z } from './schemas';
import { node_id_z } from './schemas';

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
    const parsed = paths_query_z.safeParse(req.query);
    if (!parsed.success) {
        res.status(400).json({ error: z.treeifyError(parsed.error) });
        return;
    }
    const { from, to } = parsed.data;
    try {
        const adj: AdjacencyList = await buildAdjacencyList();
        const paths = getAllNodePaths(adj, from, to);
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
    const parsed = node_id_z.safeParse(req.params);
    if (!parsed.success) {
        res.status(400).json({ error: z.treeifyError(parsed.error) });
        return;
    }
    const { nodeId } = parsed.data;
    try {
        const adj: AdjacencyList = await buildAdjacencyList();
        const degrees = getNodeDegrees(adj, nodeId);
        res.status(200).json({ node: nodeId, neighbors: [...degrees] });
    } catch {
        res.status(500).json({ error: 'Failed to get node degrees' });
    }
})