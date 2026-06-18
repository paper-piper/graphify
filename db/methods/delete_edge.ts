import { NodeId } from "../../graph_services/graph.types";
import { db } from "../buildDb";

export async function delete_edge(source_node: NodeId, target_node: NodeId): Promise<void> {
    await db
        .deleteFrom('edges')
        .where('source_node', '=', source_node)
        .where('target_node', '=', target_node)
        .executeTakeFirstOrThrow();
}
