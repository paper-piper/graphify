import { NodeId } from "../graph/graph.types";
import { db } from "../db/buildDb";

export async function delete_node(node_id: NodeId): Promise<void> {
    await db
        .deleteFrom('nodes')
        .where('id', '=', node_id)
        .executeTakeFirstOrThrow();
}
