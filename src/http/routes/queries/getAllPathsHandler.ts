import { paths_query_z } from '../schemas';
import { handleQueryStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { GetAllPathsService } from './services/GetAllPathsService';
import { badRequest } from '../sharedStatus/badRequest';
import { Context } from 'koa';

export async function getAllPathsHandler(ctx: Context) {
    const parsed = paths_query_z.safeParse(ctx.query);
    if (!parsed.success) {
        badRequest(ctx, parsed.error);
        return;
    }
    try {
        const [paths, status] = await GetAllPathsService(parsed.data.source_node_title, parsed.data.target_node_title);
        handleQueryStatus(status, ctx, { paths });
    } catch (err) {
        handleServerError(ctx, 'Failed to find paths', err);
    }
}
