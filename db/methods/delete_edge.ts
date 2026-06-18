import { NodeId } from "../../graph_services/graph.types";
import { db } from "../index";

export async function delete_edge(node_id: NodeId): Promise<void> {
    await db
        .deleteFrom('nodes')
        .where('id', '=', node_id)
        .executeTakeFirstOrThrow();
}
