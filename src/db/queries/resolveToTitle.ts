import { NodeId, NodeTitle } from "../../graph/graphTypes";
import { db } from "../buildDb";

export async function resolveToTitle(idList: NodeId[]): Promise<Map<NodeId,NodeTitle>>{
    const nodes = await db
        .selectFrom('nodes')
        .select(['nodes.title', 'nodes.id'])
        .where('nodes.id', 'in', idList)
        .execute();

    const result = new Map<NodeId, NodeTitle>();
    for (const node of nodes) {
        result.set(node.id, node.title);
    }
    return result;
}