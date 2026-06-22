import { HTTP_STATUS } from '../../httpStatus';
import { NodeTitle } from '../../../graph/types';
import { pathsQueryZ } from '../../schemas';
import { Context } from 'koa';
import { parseAndGetAllPaths } from '../parsers/parseAndGetAllPaths';
import z from 'zod'

export async function handleGetAllPaths(ctx: Context) {
    const parsed = pathsQueryZ.safeParse(ctx.query);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { source_node_title, target_node_title } = parsed.data;
    try {
        const paths: NodeTitle[][] = await parseAndGetAllPaths(source_node_title, target_node_title)
        ctx.status = HTTP_STATUS.OK;
        ctx.body = { paths };
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to find paths' };
    }
}
