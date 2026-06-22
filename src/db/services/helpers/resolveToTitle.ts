import { NodeId, NodeTitle } from "../../../graph/types";
import { db } from "../../buildDb";

export async function resolveToTitle(...ids: NodeId[]): Promise<NodeTitle[]>{
    const nodes = await db
        .selectFrom('nodes')
        .select(['nodes.title', 'nodes.id'])
        .where('nodes.id', 'in', ids)
        .execute();

    const map = new Map(nodes.map(n => [n.id, n.title]));
    // validation isn't required since it is internal function only.
    return ids.map(id => map.get(id)!); 
}