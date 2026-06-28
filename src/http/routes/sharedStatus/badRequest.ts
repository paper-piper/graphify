import { HTTP_STATUS } from '../sharedStatus/httpStatus';
import z from 'zod'
import { Context } from 'koa';

export function badRequest<T>(ctx: Context, z_error: z.ZodError<T>): void{
    ctx.status = HTTP_STATUS.BAD_REQUEST;
    ctx.body = { error: z.treeifyError(z_error) };
}