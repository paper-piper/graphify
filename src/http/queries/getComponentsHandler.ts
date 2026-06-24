import { HTTP_STATUS } from '../httpStatus';
import { NodeTitle } from '../../types';
import { Context } from 'koa';
import { GetComponentsService } from './services/GetComponentsService';

export async function getComponentsHandler(ctx: Context){
    try {
        const components: NodeTitle[][] = await GetComponentsService()
        ctx.status = HTTP_STATUS.OK;
        ctx.body = { components };
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to find connected components' };
    }
}