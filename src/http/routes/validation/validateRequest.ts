import z from 'zod';
import { Context } from 'koa';
import { HTTP_STATUS } from '../sharedStatus/httpStatus';

export function validateRequest<T>(schema: z.ZodType<T>, data: unknown, ctx: Context): T | null {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
        ctx.status = HTTP_STATUS.BAD_REQUEST;
        ctx.body = { error: z.treeifyError(parsed.error) };
        return null;
    }
    return parsed.data;
}
