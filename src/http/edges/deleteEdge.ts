import { z } from 'zod';
import { DeleteEdgeService } from './services/DeleteEdgeService';
import { edge_z } from '../schemas';
import { HTTP_STATUS } from '../httpStatus';
import { EDGE_STATUS } from './edgeStatus';
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
        const status = await DeleteEdgeService(source_node_title, target_node_title);
        if (status === EDGE_STATUS.DELETED) {
            ctx.status = HTTP_STATUS.NO_CONTENT;
        } 
        else if (status === EDGE_STATUS.NODE_NOT_FOUND) {
            ctx.status = HTTP_STATUS.NOT_FOUND;
            ctx.body = { error: 'Node not found' };
        } 
        else {
            ctx.status = HTTP_STATUS.NOT_FOUND;
            ctx.body = { error: 'Edge not found' };
        }
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to delete edge' };
    }
}