import { HTTP_STATUS } from '../httpStatus';
import { hasCycle } from '../../graph/algorithms/hasCycle'
import { AdjacencyList } from '../../graph/types';
import { buildAdjacencyList } from '../../db/services/queries/buildAdjacencyList';
import { Context } from 'koa';

export async function hasCycleHandler(ctx: Context){
    try{
        const adj: AdjacencyList = await buildAdjacencyList()
        const cycle_found: boolean = hasCycle(adj)
        ctx.status = HTTP_STATUS.OK;
        ctx.body = {cycle_found};
    }
    catch{
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to find cycles' };
    }
}