import { Context } from 'koa';
import { titleToId } from '@/db/services/resolvers/titleToId';
import { createEdge } from '@/db/services/edges/createEdge';
import { NotFoundError, ConflictError } from '@/http/middlewares/error/http_error';
import { HTTP_STATUS } from '@/http/routes/shared/httpStatus';

export async function createEdgeController(ctx: Context){
    const { source_node_title, target_node_title } = ctx.state.validated.body

    const [source_node_id, target_node_id] = await titleToId(source_node_title, target_node_title);
    if (source_node_id === null || target_node_id === null) {
        throw new NotFoundError("One or more nodes doesn't exist")
    }

    const success = await createEdge(source_node_id, target_node_id);
    if (!success) {
        throw new ConflictError("Edge already exist")
    }
    ctx.status = HTTP_STATUS.CREATED


}
