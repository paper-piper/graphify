import { CreateNodeService } from './services/CreateNodeService';
import { handleNodeStatus } from './status/mapper';
import { handleServerError } from '../sharedStatus/serverError';
import { NODE_STATUS } from './status/statuses';
import { Context } from 'koa';

export async function createNode(ctx: Context){
    try {
        const node_title = await CreateNodeService();
        handleNodeStatus(NODE_STATUS.CREATED, ctx, { id: node_title });
    } catch (err) {
        console.error('[createNode]', err);
        handleServerError(ctx, 'Failed to create node');
    }
}
