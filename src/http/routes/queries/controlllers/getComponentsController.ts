import { Context } from 'koa';
import { getConnectedComponents } from '@/algorithms/getConnectedComponents';
import { AdjacencyList } from '@/algorithms/types';
import { NodeId, NodeTitle } from '@/types';
import { GraphRepository } from '@/repositories/GraphRepository';
import { HTTP_STATUS } from '@/http/shared/status/httpStatus';
import { nestedIdToTitle } from '@/http/routes/utils/nestedIdToTitle';

export async function getComponentsController(ctx: Context) {
    const adj: AdjacencyList = await GraphRepository.buildAdjacencyList();
    const id_components: NodeId[][] = getConnectedComponents(adj);
    const title_components: NodeTitle[][] = await nestedIdToTitle(id_components)

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { components: title_components };
}
