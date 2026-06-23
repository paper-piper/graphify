import { z } from 'zod';
import { DeleteEdgeService } from './services/DeleteEdgeService';
import { NoResultError } from 'kysely';
import { edgeZ } from '../schemas';
import { HTTP_STATUS } from '../httpStatus';
import { Context } from 'koa';

export async function deleteEdge(ctx: Context){
    const parsed = edgeZ.safeParse(ctx.params);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { source_node_title: sourceNodeTitle, target_node_title: targetNodeTitle } = parsed.data;
    try {
        const found_edge: boolean = await DeleteEdgeService(sourceNodeTitle, targetNodeTitle);
        if (found_edge){
            ctx.status = HTTP_STATUS.NO_CONTENT;
        }
        else{
            ctx.status = HTTP_STATUS.NOT_FOUND
            ctx.body = { error: 'edge not found' };
        }
    } catch (err) {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to delete edge' };
    }
}