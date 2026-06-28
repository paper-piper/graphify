import { deleteNodeService } from './services/DeleteNodeService';
import { node_title_z } from '../schemas';
import { resolveStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { badRequest } from '../sharedStatus/badRequest';
import { Context } from 'koa';

export async function deleteNode(ctx: Context){
    const parsed = node_title_z.safeParse(ctx.params);
    if (!parsed.success) {
        badRequest(ctx, parsed.error);
        return;
    }
    try {
        const status = await deleteNodeService(parsed.data.node_title);
        resolveStatus(status, ctx);
    } catch (err) {
        handleServerError(ctx, 'Failed to delete node', err);
    }
}
