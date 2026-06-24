import { NodeId, NodeTitle } from "../../../types";
import { db } from "../../buildDb";

export async function idToTitle(...ids: NodeId[]): Promise<NodeTitle[]>{
    const nodes = await db
        .selectFrom('nodes')
        .select(['nodes.title', 'nodes.id'])
        .where('nodes.id', 'in', ids)
        .execute();

    const id_to_title = new Map(nodes.map(n => [n.id, n.title]));
    // validation isn't required since it is internal function only.
    return ids.map(id => id_to_title.get(id)!); 
}