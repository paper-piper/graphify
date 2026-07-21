import { sql } from "kysely";
import { db } from "@/db/buildDb";
import { NodeId } from "@/shared/types";

export const EdgeRepository = {
    async create(source_node_id: NodeId, target_node_id: NodeId): Promise<boolean> {
        const result = await db
            .insertInto('edges')
            .values({ source_node: source_node_id, target_node: target_node_id })
            .onConflict(oc => oc.doNothing())
            .executeTakeFirst();
        return result.numInsertedOrUpdatedRows === 1n;
    },

    async delete(source_node_id: NodeId, target_node_id: NodeId): Promise<boolean> {
        const result = await sql<{ delete_edge: boolean }>`SELECT delete_edge(${source_node_id}::uuid, ${target_node_id}::uuid)`.execute(db);
        return result.rows[0].delete_edge;
    },
};
