import { CreateEdgeService } from './services/CreateEdgeService';
import { edge_z } from '../schemas';
import { resolve_status } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { badRequest } from '../sharedStatus/badRequest';
import { Context } from 'koa';

export async function createEdge(ctx: Context){
    const parsed = edge_z.safeParse(ctx.request.body);
    if (!parsed.success) {
        badRequest(ctx, parsed.error);
        return;
    }
    try {
        const status = await CreateEdgeService(parsed.data.source_node_title, parsed.data.target_node_title);
        resolve_status(status, ctx);
    } catch (err) {
        handleServerError(ctx, 'Failed to create edge', err);
    }
}
