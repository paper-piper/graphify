import { NodeId } from "../../../types";
import { db } from "../../buildDb";

export async function delete_node(node_id: NodeId): Promise<void> {
    await db
        .deleteFrom('nodes')
        .where('id', '=', node_id)
        .executeTakeFirstOrThrow();
}
