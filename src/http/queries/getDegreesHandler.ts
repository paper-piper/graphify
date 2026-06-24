
import z from 'zod'
import { HTTP_STATUS } from '../httpStatus';
import { node_title_z } from '../schemas';
import { Context } from 'koa';
import { GetDegreesService } from './services/GetDegreesService';

export async function getDegreesHandler(ctx: Context){
    const parsed = node_title_z.safeParse(ctx.params);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { node_title } = parsed.data;
    try {
        const degrees = await GetDegreesService(node_title)
        ctx.status = HTTP_STATUS.OK;
        ctx.body = { node: node_title, neighbors: degrees };
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to get node degrees' };
    }
}