import { Context } from 'koa';
import { HTTP_STATUS } from './httpStatus';

export function handleServerError(ctx: Context, message: string): void {
    ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    ctx.body = { error: message };
}
