import { NodeId, NodeTitle } from "../../graph/graphTypes";
import { db } from "../buildDb";
import { resolveToId } from "./helpers/resolveToId";

export async function delete_edge(sourceNodeTitle: NodeTitle, targetNodeTitle: NodeTitle): Promise<void> {
    const [sourceNodeId, targetNodeId]: NodeId[] = await resolveToId(sourceNodeTitle, targetNodeTitle)
    await db
        .deleteFrom('edges')
        .where('source_node', '=', sourceNodeId)
        .where('target_node', '=', targetNodeId)
        .executeTakeFirstOrThrow();
}
