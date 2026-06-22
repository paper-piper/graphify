import { NodeTitle, NodeId } from "../../graph/graphTypes";
import { resolveToId } from "./helpers/resolveToId";
import { db } from "../buildDb";

export async function create_edge(sourceNodeTitle: NodeTitle, targetNodeTitle: NodeTitle): Promise<void> {
    const [sourceNodeId, targetNodeId]: NodeId[] = await resolveToId(sourceNodeTitle, targetNodeTitle)
    await db
        .insertInto('edges')
        .values({ source_node: sourceNodeId, target_node: targetNodeId})
        .executeTakeFirstOrThrow();
}
