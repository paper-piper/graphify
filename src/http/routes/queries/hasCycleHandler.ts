import { handleQueryStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { QUERY_STATUS } from './status/statuses';
import { hasCycle } from '../../../graph/algorithms/hasCycle';
import { AdjacencyList } from '../../../graph/types';
import { buildAdjacencyList } from '../../../db/services/queries/buildAdjacencyList';
import { Context } from 'koa';

export async function hasCycleHandler(ctx: Context){
    try {
        const adj: AdjacencyList = await buildAdjacencyList();
        const cycle_found: boolean = hasCycle(adj);
        handleQueryStatus(QUERY_STATUS.OK, ctx, { cycle_found });
    } catch {
        handleServerError(ctx, 'Failed to find cycles');
    }
}
