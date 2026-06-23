import z from 'zod';
import { CreateEdgeService } from './services/CreateEdgeService';
import { edgeZ } from '../schemas';
import { HTTP_STATUS } from '../httpStatus';
import { Context } from 'koa';

export async function createEdge(ctx: Context){
    const parsed = edgeZ.safeParse(ctx.request.body);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { source_node_title: sourceNodeTitle, target_node_title: targetNodeTitle } = parsed.data;
    try {
        await CreateEdgeService(sourceNodeTitle, targetNodeTitle);
        ctx.status = HTTP_STATUS.CREATED;
    } catch (err) {
        if (typeof err === 'object' && err !== null && 'code' in err && err.code === '23505') {
            ctx.status = HTTP_STATUS.CONFLICT;
            ctx.body = { error: 'Edge already exists' };
        } else {
            ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
            ctx.body = { error: 'Failed to create edge' };
        }
    }
}