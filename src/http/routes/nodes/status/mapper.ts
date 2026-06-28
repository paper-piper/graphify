import { Context } from 'koa';
import { NodeStatus, node_status_to_http_map, node_status_to_body } from './statuses';

export function resolveStatus(status: NodeStatus, ctx: Context, body?: object): void {
    ctx.status = node_status_to_http_map.get(status)!;
    if (body){
       ctx.body = body 
    }
    else{
        ctx.body = node_status_to_body.get(status); 
    }
}
