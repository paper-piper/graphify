import { z } from 'zod';
import { delete_edge } from '../../db/services/deleteEdge'
import { NoResultError } from 'kysely';
import { edgeZ } from '../schemas'
import { HTTP_STATUS } from '../httpStatus';
import { Context } from 'koa';

export async function deleteEdge(ctx: Context){
    const parsed = edgeZ.safeParse(ctx.params);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error)};
        return;
    }
    const { source_node_title: sourceNodeTitle, target_node_title: targetNodeTitle } = parsed.data;
    try {
        await delete_edge(sourceNodeTitle, targetNodeTitle)
        ctx.status = HTTP_STATUS.NO_CONTENT;
    } catch (err) {
        if (err instanceof NoResultError) {
            ctx.status = HTTP_STATUS.NOT_FOUND;
            ctx.body = { error: 'edge not found' };
        } else {
            ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
            ctx.body = { error: 'Failed to delete edge' };
        }
    }
}