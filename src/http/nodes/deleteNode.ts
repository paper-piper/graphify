import { Router } from 'express';
import { NoResultError } from 'kysely';
import { z } from 'zod';
import { create_node } from '../../services/createNode'
import { delete_node } from '../../services/deleteNode';
import { nodeTitleZ } from '../schemas';
import { HTTP_STATUS } from '../httpStatus';
import { Context } from 'koa';

export async function deleteNode(ctx: Context){
    const parsed = nodeTitleZ.safeParse(ctx.params);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) }; //TODO; understand treeify and how to float error
        return;
    }
    const { nodeTitle } = parsed.data;
    try {
        await delete_node(nodeTitle)
        ctx.status = HTTP_STATUS.NO_CONTENT;
    } catch (err) {
        if (err instanceof NoResultError) {
            ctx.status = HTTP_STATUS.NOT_FOUND;
            ctx.body = { error: 'Node not found' };
        } else {
            ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
            ctx.body = { error: 'Failed to delete node' };
        }
    }
}