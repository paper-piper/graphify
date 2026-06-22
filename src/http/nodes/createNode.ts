import { create_node } from '../../services/createNode'
import { HTTP_STATUS } from '../httpStatus';
import { Context } from 'koa';

export async function createNode(ctx: Context){
    try {
        const node_title = await create_node()
        ctx.status = HTTP_STATUS.CREATED;
        ctx.body = { id: node_title };
    } catch (err) {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to create node' };
    }
}