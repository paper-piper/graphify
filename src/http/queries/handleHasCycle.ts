import { HTTP_STATUS } from '../httpStatus';
import { hasCycle } from '../../graph/queries/hasCycle'
import { AdjacencyList } from '../../graph/graphTypes';
import { buildAdjacencyList } from '../../graph/buildAdjacencyList';
import { Context } from 'koa';

export async function handleHasCycle(ctx: Context){
    try{
        const adj: AdjacencyList = await buildAdjacencyList()
        const cycleFound: boolean = hasCycle(adj)
        ctx.status = HTTP_STATUS.OK;
        ctx.body = {cycleFound};
    }
    catch{
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to find cycles' };
    }
}