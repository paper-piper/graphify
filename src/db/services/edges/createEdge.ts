import { NodeId } from "../../../types";
import { db } from "../../buildDb";

export async function create_edge(source_node_id: NodeId, target_node_id: NodeId): Promise<void> {
    await db
        .insertInto('edges')
        .values({ source_node: source_node_id, target_node: target_node_id })
        .executeTakeFirstOrThrow();
}
