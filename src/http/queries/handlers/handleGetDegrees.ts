
import z from 'zod'
import { HTTP_STATUS } from '../../httpStatus';
import { nodeTitleZ } from '../../schemas';
import { Context } from 'koa';
import { parseAndGetDegrees } from '../parsers/parseAndGetDegrees';

export async function handleGetDegrees(ctx: Context){
    const parsed = nodeTitleZ.safeParse(ctx.params);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return;
    }
    const { node_title: nodeTitle } = parsed.data;
    try {
        const degrees = await parseAndGetDegrees(nodeTitle)
        ctx.status = HTTP_STATUS.OK;
        ctx.body = { node: nodeTitle, neighbors: degrees };
    } catch {
        ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = { error: 'Failed to get node degrees' };
    }
}