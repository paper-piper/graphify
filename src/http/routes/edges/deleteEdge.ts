import { DeleteEdgeService } from './services/DeleteEdgeService';
import { edge_z } from '../schemas';
import { resolve_status } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { badRequest } from '../sharedStatus/badRequest';
import { Context } from 'koa';

export async function deleteEdge(ctx: Context){
    const parsed = edge_z.safeParse(ctx.params);
    if (!parsed.success) {
        badRequest(ctx, parsed.error);
        return;
    }
    try {
        const status = await DeleteEdgeService(parsed.data.source_node_title, parsed.data.target_node_title);
        resolve_status(status, ctx);
    } catch (err) {
        handleServerError(ctx, 'Failed to delete edge', err);
    }
}
