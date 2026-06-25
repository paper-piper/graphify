import { z } from 'zod';
import { DeleteNodeService } from './services/DeleteNodeService';
import { node_title_z } from '../schemas';
import { HTTP_STATUS } from '../httpStatus';
import { NODE_STATUS } from './nodeStatus';
import { Context } from 'koa';

export async function deleteNode(ctx: Context){
    const parsed = node_title_z.safeParse(ctx.params);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { node_title } = parsed.data;
    try {
        const status = await DeleteNodeService(node_title);
        if (status === NODE_STATUS.DELETED) {
            ctx.status = HTTP_STATUS.NO_CONTENT;
        } else {
            ctx.status = HTTP_STATUS.NOT_FOUND;
            ctx.body = { error: 'Node does not exist' };
        }
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to delete node' };
    }
}