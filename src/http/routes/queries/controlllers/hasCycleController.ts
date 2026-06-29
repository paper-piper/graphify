import { Context } from 'koa';
import { hasCycle } from '@/algorithms/hasCycle';
import { AdjacencyList } from '@/algorithms/types';
import { GraphRepository } from '@/repositories/GraphRepository';
import { HTTP_STATUS } from '@/http/routes/shared/httpStatus';

export async function hasCycleController(ctx: Context) {
    const adj: AdjacencyList = await GraphRepository.buildAdjacencyList();
    const cycle_found: boolean = hasCycle(adj);

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { cycle_found };
}
