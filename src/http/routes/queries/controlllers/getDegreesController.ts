import { Context } from 'koa';
import { getDegrees } from '@/algorithms/getDegrees';
import { AdjacencyList } from '@/algorithms/types';
import { NodeTitle } from '@/types';
import { GraphRepository } from '@/repositories/GraphRepository';
import { NodeRepository } from '@/repositories/NodeRepository';
import { NotFoundError } from '@/http/middlewares/error/http_error';
import { HTTP_STATUS } from '@/http/routes/shared/httpStatus';

export async function getDegreesController(ctx: Context) {
    const { node_title } = ctx.state.validated.params;

    const adj: AdjacencyList = await GraphRepository.buildAdjacencyList();
    const [node_id] = await NodeRepository.findByTitles(node_title);
    if (node_id === null) {
        throw new NotFoundError("Node doesn't exist");
    }

    const id_degrees = getDegrees(adj, node_id);
    const title_degrees: NodeTitle[] = await NodeRepository.findByIds(...id_degrees);

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { node: node_title, neighbors: title_degrees };
}
