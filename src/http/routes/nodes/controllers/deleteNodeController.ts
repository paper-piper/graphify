import { Context } from 'koa';
import { titleToId } from '@/db/services/resolvers/titleToId';
import { deleteNode } from '@/db/services/nodes/deleteNode';
import { NotFoundError } from '@/http/middlewares/error/http_error';
import { HTTP_STATUS } from '@/http/routes/shared/httpStatus';

export async function deleteNodeController(ctx: Context) {
    const { node_title } = ctx.state.validated.params;

    const [node_id] = await titleToId(node_title);
    if (node_id === null) {
        throw new NotFoundError("Node doesn't exist");
    }

    await deleteNode(node_id);
    ctx.status = HTTP_STATUS.NO_CONTENT;
}
