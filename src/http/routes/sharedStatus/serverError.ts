import { Context } from 'koa';
import { HTTP_STATUS } from './httpStatus';

export function handleServerError(ctx: Context, message: string, err?: unknown): void {
    ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    ctx.body = { error: message };
    if (err !== undefined) console.log(`${message}\n${err}`);
}
