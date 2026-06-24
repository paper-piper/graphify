import { NodeId } from "../../../graph/types";
import { db } from "../../buildDb";

export async function create_edge(sourceNodeId: NodeId, targetNodeId: NodeId): Promise<void> {
    await db
        .insertInto('edges')
        .values({ source_node: sourceNodeId, target_node: targetNodeId })
        .executeTakeFirstOrThrow();
}
