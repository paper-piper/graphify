import { z } from 'zod';
import { DeleteEdgeService } from './services/DeleteEdgeService';
import { NoResultError } from 'kysely';
import { edge_z } from '../schemas';
import { HTTP_STATUS } from '../httpStatus';
import { Context } from 'koa';

export async function deleteEdge(ctx: Context){
    const parsed = edge_z.safeParse(ctx.params);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { source_node_title, target_node_title } = parsed.data;
    try {
        const result = await DeleteEdgeService(source_node_title, target_node_title);
        if (result === null) {
            ctx.status = HTTP_STATUS.NOT_FOUND;
            ctx.body = { error: 'Edge not found' };
        } else if (result) {
            ctx.status = HTTP_STATUS.NO_CONTENT;
        } else {
            ctx.status = HTTP_STATUS.NOT_FOUND;
            ctx.body = { error: 'Edge not found' };
        }
    } catch (err) {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to delete edge' };
    }
}