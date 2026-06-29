import { NodeId } from "../../../types";
import { db } from "../../buildDb";

export async function createEdge(source_node_id: NodeId, target_node_id: NodeId): Promise<boolean> {
    const result = await db
        .insertInto('edges')
        .values({ source_node: source_node_id, target_node: target_node_id })
        .onConflict(oc => oc.doNothing())
        .executeTakeFirst();

    const success: boolean = (result.numInsertedOrUpdatedRows === 1n);
    return success;
}
