import { HTTP_STATUS } from '../../httpStatus';
import { NodeTitle } from '../../../graph/types';
import { Context } from 'koa';
import { parseAndGetComponents } from '../parsers/parseAndGetComponents';

export async function handleGetComponents(ctx: Context){
    try {
        const components: NodeTitle[][] = await parseAndGetComponents()
        ctx.status = HTTP_STATUS.OK;
        ctx.body = { components };
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to find connected components' };
    }
}