import { Context } from 'koa';
import { titleToId } from '@/db/services/resolvers/titleToId';
import { deleteEdge } from '@/db/services/edges/deleteEdge';
import { NotFoundError } from '@/http/middlewares/error/http_error';
import { HTTP_STATUS } from '@/http/routes/shared/httpStatus';

export async function deleteEdgeController(ctx: Context) {
    const { source_node_title, target_node_title } = ctx.state.validated.params;

    const [source_node_id, target_node_id] = await titleToId(source_node_title, target_node_title);
    if (source_node_id === null || target_node_id === null) {
        throw new NotFoundError("One or more nodes doesn't exist");
    }

    const found = await deleteEdge(source_node_id, target_node_id);
    if (!found) {
        throw new NotFoundError("Edge doesn't exist");
    }

    ctx.status = HTTP_STATUS.NO_CONTENT;
}
