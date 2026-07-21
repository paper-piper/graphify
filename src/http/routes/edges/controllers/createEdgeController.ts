import { Context } from 'koa';
import { NodeRepository } from '@/db/repositories/NodeRepository';
import { EdgeRepository } from '@/db/repositories/EdgeRepository';
import { NotFoundError, ConflictError } from '@/http/shared/error/http_error';
import { HTTP_STATUS } from '@/http/shared/status/httpStatus';

export async function createEdgeController(ctx: Context){
    const { source_node_title, target_node_title } = ctx.state.validated.body

    const [source_node_id, target_node_id] = await NodeRepository.TitleToId(source_node_title, target_node_title);
    if (source_node_id === null || target_node_id === null) {
        throw new NotFoundError("One or more nodes doesn't exist")
    }

    const success = await EdgeRepository.create(source_node_id, target_node_id);
    if (!success) {
        throw new ConflictError("Edge already exist")
    }
    ctx.status = HTTP_STATUS.CREATED


}
