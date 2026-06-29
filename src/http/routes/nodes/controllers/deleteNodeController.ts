import { Context } from 'koa';
import { NodeRepository } from '@/repositories/NodeRepository';
import { NotFoundError } from '@/http/middlewares/error/http_error';
import { HTTP_STATUS } from '@/http/shared/status/httpStatus';

export async function deleteNodeController(ctx: Context) {
    const { node_title } = ctx.state.validated.params;

    const [node_id] = await NodeRepository.findByTitles(node_title);
    if (node_id === null) {
        throw new NotFoundError("Node doesn't exist");
    }

    await NodeRepository.delete(node_id);
    ctx.status = HTTP_STATUS.NO_CONTENT;
}
