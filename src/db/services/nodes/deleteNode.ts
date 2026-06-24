import { NodeId } from "../../../types";
import { db } from "../../buildDb";

export async function delete_node(node_id: NodeId): Promise<boolean> {
    const result = await db
        .deleteFrom('nodes')
        .where('id', '=', node_id)
        .executeTakeFirst();
    
    const found = (result.numDeletedRows === 1n)
    return found
}
