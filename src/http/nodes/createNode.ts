import { CreateNodeService } from './services/CreateNodeService';
import { HTTP_STATUS } from '../httpStatus';
import { Context } from 'koa';

export async function createNode(ctx: Context){
    try {
        const node_title = await CreateNodeService();
        ctx.status = HTTP_STATUS.CREATED;
        ctx.body = { id: node_title };
    } catch (err) {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        console.error('[createNode]', err);
    }
}