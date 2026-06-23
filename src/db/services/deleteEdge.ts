import { NodeId } from "../../graph/types";
import { db } from "../buildDb";
import { sql } from "kysely";

export async function delete_edge(sourceNodeId: NodeId, targetNodeId: NodeId): Promise<boolean> {
    const result = await sql<{ delete_edge: boolean }>`SELECT delete_edge(${sourceNodeId}::uuid, ${targetNodeId}::uuid)`.execute(db);
    return result.rows[0].delete_edge;
}
