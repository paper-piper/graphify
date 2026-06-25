import { Context } from 'koa';
import { QueryStatus, query_status_to_body, query_status_to_http_map } from './statuses';

export function handleQueryStatus(status: QueryStatus, ctx: Context, body?: object): void {
    ctx.status = query_status_to_http_map.get(status)!;
    ctx.body = query_status_to_body.get(status) ?? body;
}