import { NoResultError } from 'kysely';
import { z } from 'zod';
import { DeleteNodeService } from './services/DeleteNodeService';
import { nodeTitleZ } from '../schemas';
import { HTTP_STATUS } from '../httpStatus';
import { Context } from 'koa';

export async function deleteNode(ctx: Context){
    const parsed = nodeTitleZ.safeParse(ctx.params);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { node_title: nodeTitle } = parsed.data;
    try {
        await DeleteNodeService(nodeTitle);
        ctx.status = HTTP_STATUS.NO_CONTENT;
    } catch (err) {
        if (err instanceof NoResultError) {
            ctx.status = HTTP_STATUS.NOT_FOUND;
            ctx.body = { error: 'Node not found' };
        } else {
            ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
            ctx.body = { error: 'Failed to delete node' };
        }
    }
}