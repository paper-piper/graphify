import { DeleteEdgeService } from './services/DeleteEdgeService';
import { edge_z } from '../validation/schemas';
import { validateRequest } from '../validation/validateRequest';
import { handleEdgeStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { Context } from 'koa';

export async function deleteEdge(ctx: Context){
    const data = validateRequest(edge_z, ctx.params, ctx);
    if (!data) return;
    try {
        const status = await DeleteEdgeService(data.source_node_title, data.target_node_title);
        handleEdgeStatus(status, ctx);
    } catch {
        handleServerError(ctx, 'Failed to delete edge');
    }
}
