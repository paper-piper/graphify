import { CreateEdgeService } from './services/CreateEdgeService';
import { edge_z } from '../validation/schemas';
import { validateRequest } from '../validation/validateRequest';
import { handleEdgeStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { Context } from 'koa';

export async function createEdge(ctx: Context){
    const data = validateRequest(edge_z, ctx.request.body, ctx);
    if (!data) {
        return;
    }
    try {
        const status = await CreateEdgeService(data.source_node_title, data.target_node_title);
        handleEdgeStatus(status, ctx);
    } catch (err) {
        handleServerError(ctx, 'Failed to create edge', err);
    }
}
