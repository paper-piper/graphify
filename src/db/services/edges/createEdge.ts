import { NodeId } from "../../../types";
import { db } from "../../buildDb";

export async function create_edge(source_node_id: NodeId, target_node_id: NodeId): Promise<boolean> {
    const result = await db
        .insertInto('edges')
        .values({ source_node: source_node_id, target_node: target_node_id })
        .executeTakeFirst();
    
    const found: boolean = (result.numInsertedOrUpdatedRows === 1n)
    return found
}
