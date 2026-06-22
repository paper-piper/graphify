
import z from 'zod'
import { HTTP_STATUS } from '../httpStatus';
import { getNodeDegrees } from '../../graph/algorithms/getNodeDegrees';
import { AdjacencyList } from '../../graph/graphTypes';
import { buildAdjacencyList } from '../../graph/buildAdjacencyList';
import { nodeTitleZ } from '../schemas';
import { Context } from 'koa';

export async function handleGetDegrees(ctx: Context){
    const parsed = nodeTitleZ.safeParse(ctx.params);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { nodeTitle: nodeTitle } = parsed.data;
    try {
        const adj: AdjacencyList = await buildAdjacencyList();
        const degrees = getNodeDegrees(adj, nodeTitle);
        ctx.status = HTTP_STATUS.OK;
        ctx.body = { node: nodeTitle, neighbors: [...degrees] };
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to get node degrees' };
    }
}