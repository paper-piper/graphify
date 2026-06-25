import { Context } from 'koa';
import { EdgeStatus, edge_status_to_http_map, edge_status_to_body } from './statuses';

export function handleEdgeStatus(status: EdgeStatus, ctx: Context): void {
    ctx.status = edge_status_to_http_map.get(status)!;
    ctx.body = edge_status_to_body.get(status);
}
