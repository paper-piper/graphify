import { NodeId } from "../../graph/types";
import { db } from "../buildDb";

export async function delete_node(nodeId: NodeId): Promise<void> {
    await db
        .deleteFrom('nodes')
        .where('id', '=', nodeId)
        .executeTakeFirstOrThrow();
}
