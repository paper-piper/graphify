import { HTTP_STATUS } from '../httpStatus';
import { getConnectedComponents } from '../../graph/algorithms/getConnectedComponents';
import { AdjacencyList } from '../../graph/graphTypes';
import { buildAdjacencyList } from '../../graph/buildAdjacencyList';
import { Context } from 'koa';


export async function handleGetComponents(ctx: Context){
    try {
        const adj: AdjacencyList = await buildAdjacencyList();
        const components = getConnectedComponents(adj);
        ctx.status = HTTP_STATUS.OK;
        ctx.body = { components: components.map(s => [...s]) };
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to find connected components' };
    }
}