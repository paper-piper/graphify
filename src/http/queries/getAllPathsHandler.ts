import { HTTP_STATUS } from '../httpStatus';
import { NodeTitle } from '../../types';
import { paths_query_z } from '../schemas';
import { Context } from 'koa';
import { GetAllPathsService } from './services/GetAllPathsService';
import z from 'zod'

export async function getAllPathsHandler(ctx: Context) {
    const parsed = paths_query_z.safeParse(ctx.query);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { source_node_title, target_node_title } = parsed.data;
    try {
        const paths = await GetAllPathsService(source_node_title, target_node_title)
        if (paths === null) {
            ctx.status = HTTP_STATUS.NOT_FOUND;
            ctx.body = { error: 'Node not found' };
            return;
        }
        ctx.status = HTTP_STATUS.OK;
        ctx.body = { paths };
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to find paths' };
    }
}
