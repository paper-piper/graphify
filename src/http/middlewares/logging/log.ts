import { Context, Next } from 'koa';
import pino from 'pino'
import path from 'path'

const logger = pino(
    { level: 'debug' },
    pino.destination(path.resolve(__dirname, '../../../../logs/app.log'))
)

export async function log_requests(ctx: Context, next: Next){
    const start = Date.now()
    await next()
    const ms = Date.now() - start;
    const msg = `${ctx.method} ${ctx.path} ${ctx.status} - ${ms}ms`;

    if (ctx.status >= 500) {
        logger.error(msg);
    } else if (ctx.status >= 400) {
        logger.warn(msg);
    } else {
        logger.info(msg);
    }
}