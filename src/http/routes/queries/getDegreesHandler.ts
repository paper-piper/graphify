import { node_title_z } from '../schemas';
import { handleQueryStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { GetDegreesService } from './services/GetDegreesService';
import { badRequest } from '../sharedStatus/badRequest';
import { Context } from 'koa';

export async function getDegreesHandler(ctx: Context){
    const parsed = node_title_z.safeParse(ctx.params);
    if (!parsed.success) {
        badRequest(ctx, parsed.error);
        return;
    }
    try {
        const [degrees, status] = await GetDegreesService(parsed.data.node_title);
        handleQueryStatus(status, ctx, { node: parsed.data.node_title, neighbors: degrees });
    } catch (err) {
        handleServerError(ctx, 'Failed to get node degrees', err);
    }
}
