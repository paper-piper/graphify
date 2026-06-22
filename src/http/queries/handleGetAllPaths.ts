import { HTTP_STATUS } from '../httpStatus';
import { getAllNodePaths } from '../../graph/queries/getAllNodePaths';
import { AdjacencyList } from '../../graph/graphTypes';
import { buildAdjacencyList } from '../../graph/buildAdjacencyList';
import { pathsQueryZ } from '../schemas';
import { Context } from 'koa';
import z from 'zod'

export async function handleGetAllPaths(ctx: Context) {
    const parsed = pathsQueryZ.safeParse(ctx.query);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { from, to } = parsed.data;
    try {
        const adj: AdjacencyList = await buildAdjacencyList();
        const paths = getAllNodePaths(adj, from, to);
        ctx.status = HTTP_STATUS.OK;
        ctx.body = { paths };
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to find paths' };
    }
}