import { NodeId } from "../../../types";
import { db } from "../../buildDb";

export async function deleteNode(node_id: NodeId): Promise<void> {
    const result = await db
        .deleteFrom('nodes')
        .where('id', '=', node_id)
        .executeTakeFirst();
}
