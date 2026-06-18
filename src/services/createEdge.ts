import { NodeId } from "../graph/graph.types";
import { db } from "../db/buildDb";

export async function create_edge(source_node: NodeId, target_node: NodeId): Promise<void> {
    await db
        .insertInto('edges')
        .values({ source_node: source_node, target_node: target_node})
        .executeTakeFirstOrThrow();
}
