import { Context } from 'koa';
import { NodeRepository } from '@/db/repositories/NodeRepository';
import { HTTP_STATUS } from '@/http/shared/status/httpStatus';

export async function createNodeController(ctx: Context) {
    const node_id = await NodeRepository.create();
    const [node_title] = await NodeRepository.findByIds(node_id);

    ctx.status = HTTP_STATUS.CREATED;
    ctx.body = { id: node_title };
}
