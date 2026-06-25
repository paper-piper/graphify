import { handleQueryStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { QUERY_STATUS } from './status/statuses';
import { GetComponentsService } from './services/GetComponentsService';
import { Context } from 'koa';

export async function getComponentsHandler(ctx: Context){
    try {
        const components = await GetComponentsService();
        handleQueryStatus(QUERY_STATUS.OK, ctx, { components });
    } catch {
        handleServerError(ctx, 'Failed to find connected components');
    }
}
