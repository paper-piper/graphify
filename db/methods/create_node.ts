import { NodeId, NodeValue } from "../../graph_services/graph.types";
import { db } from "../index";

export async function create_node(value: NodeValue = ""): Promise<NodeId> {
    const results = await db
        .insertInto('nodes')
        .values({value: value})
        .returning(['id'])
        .executeTakeFirstOrThrow();
    
    const node_id = results.id
    return node_id;
}
