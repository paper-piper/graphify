import { DeleteNodeService } from './services/DeleteNodeService';
import { node_title_z } from '../validation/schemas';
import { validateRequest } from '../validation/validateRequest';
import { handleNodeStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { Context } from 'koa';

export async function deleteNode(ctx: Context){
    const data = validateRequest(node_title_z, ctx.params, ctx);
    if (!data) return;
    try {
        const status = await DeleteNodeService(data.node_title);
        handleNodeStatus(status, ctx);
    } catch (err) {
        handleServerError(ctx, 'Failed to delete node', err);
    }
}
