import { NodeId, NodeTitle } from "../../graph/graphTypes";
import { db } from "../buildDb";

export async function resolveToId(titleList: NodeTitle[]): Promise<Map<NodeTitle, NodeId>>{
    const nodes = await db
        .selectFrom('nodes')
        .select(['nodes.id', 'nodes.title'])
        .where('nodes.title', 'in', titleList)
        .execute();

    const result = new Map<NodeTitle, NodeId>();
    for (const node of nodes) {
        result.set(node.title, node.id);
    }
    return result;
}