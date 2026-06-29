import { Context } from 'koa';
import { getConnectedComponents } from '@/algorithms/getConnectedComponents';
import { AdjacencyList } from '@/algorithms/types';
import { NodeId, NodeTitle } from '@/types';
import { buildAdjacencyList } from '@/db/services/queries/buildAdjacencyList';
import { HTTP_STATUS } from '@/http/routes/shared/httpStatus';
import { nestedIdToTitle } from '@/http/routes/shared/utils/nestedIdToTitle';

export async function getComponentsController(ctx: Context) {
    const adj: AdjacencyList = await buildAdjacencyList();
    const id_components: NodeId[][] = getConnectedComponents(adj);
    const title_components: NodeTitle[][] = await nestedIdToTitle(id_components)

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { components: title_components };
}
