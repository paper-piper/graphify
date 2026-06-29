import { bodyParser } from "@koa/bodyparser";
import { Context, Next } from "koa";
import { BadRequestError } from "../error/http_error";
const parser = bodyParser();

export async function parseBody(ctx: Context, next: Next) {
    try {
        await parser(ctx, async () => {});
    } catch {
        throw new BadRequestError('Invalid JSON in request body');
    }
    await next();
};