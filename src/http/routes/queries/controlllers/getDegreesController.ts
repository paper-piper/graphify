import { Context } from 'koa';
import { getDegrees } from '@/algorithms/getDegrees';
import { AdjacencyList } from '@/algorithms/types';
import { NodeTitle } from '@/types';
import { buildAdjacencyList } from '@/db/services/queries/buildAdjacencyList';
import { titleToId } from '@/db/services/resolvers/titleToId';
import { idToTitle } from '@/db/services/resolvers/idToTitle';
import { NotFoundError } from '@/http/middlewares/error/http_error';
import { HTTP_STATUS } from '@/http/routes/shared/httpStatus';

export async function getDegreesController(ctx: Context) {
    const { node_title } = ctx.state.validated.params;

    const adj: AdjacencyList = await buildAdjacencyList();
    const [node_id] = await titleToId(node_title);
    if (node_id === null) {
        throw new NotFoundError("Node doesn't exist");
    }

    const id_degrees = getDegrees(adj, node_id);
    const title_degrees: NodeTitle[] = await idToTitle(...id_degrees);

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { node: node_title, neighbors: title_degrees };
}
