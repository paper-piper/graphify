import { NodeId } from "../../../types";
import { db } from "../../buildDb";
import { sql } from "kysely";

export async function deleteEdge(source_node_id: NodeId, target_node_id: NodeId): Promise<boolean> {
    const result = await sql<{ delete_edge: boolean }>`SELECT delete_edge(${source_node_id}::uuid, ${target_node_id}::uuid)`.execute(db);
    const found_edge: boolean = result.rows[0].delete_edge;
    return found_edge;
}
