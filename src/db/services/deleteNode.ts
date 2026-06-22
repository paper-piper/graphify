import { NodeId, NodeTitle } from "../../graph/types";
import { db } from "../buildDb";
import { resolveToId } from "./utils/resolveToId";

export async function delete_node(nodeTitle: NodeTitle): Promise<void> {
    const [nodeId] = await resolveToId(nodeTitle)
    await db
        .deleteFrom('nodes')
        .where('id', '=', nodeId)
        .executeTakeFirstOrThrow();
}
