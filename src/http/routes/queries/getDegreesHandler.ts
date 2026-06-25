import { node_title_z } from '../validation/schemas';
import { validateRequest } from '../validation/validateRequest';
import { handleQueryStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { GetDegreesService } from './services/GetDegreesService';
import { Context } from 'koa';

export async function getDegreesHandler(ctx: Context){
    const data = validateRequest(node_title_z, ctx.params, ctx);
    if (!data) {
        return;
    }
    try {
        const [degrees, status] = await GetDegreesService(data.node_title);
        handleQueryStatus(status, ctx, { node: data.node_title, neighbors: degrees });
    } catch (err) {
        handleServerError(ctx, 'Failed to get node degrees', err);
    }
}
