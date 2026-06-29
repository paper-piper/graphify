import { Context } from 'koa';
import { createNode } from '@/db/services/nodes/createNode';
import { idToTitle } from '@/db/services/resolvers/idToTitle';
import { HTTP_STATUS } from '@/http/routes/shared/httpStatus';

export async function createNodeController(ctx: Context) {
    const node_id = await createNode();
    const [node_title] = await idToTitle(node_id);

    ctx.status = HTTP_STATUS.CREATED;
    ctx.body = { id: node_title };
}
