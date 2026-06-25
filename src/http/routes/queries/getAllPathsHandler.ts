import { paths_query_z } from '../validation/schemas';
import { validateRequest } from '../validation/validateRequest';
import { handleQueryStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { GetAllPathsService } from './services/GetAllPathsService';
import { Context } from 'koa';

export async function getAllPathsHandler(ctx: Context) {
    const data = validateRequest(paths_query_z, ctx.query, ctx);
    if (!data) return;
    try {
        const [paths, status] = await GetAllPathsService(data.source_node_title, data.target_node_title);
        handleQueryStatus(status, ctx, { paths });
    } catch (err) {
        handleServerError(ctx, 'Failed to find paths', err);
    }
}
