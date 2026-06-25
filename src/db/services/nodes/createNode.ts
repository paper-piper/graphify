import { sql } from "kysely";
import { NodeId } from "../../../types";
import { db } from "../../buildDb";

export async function createNode(): Promise<NodeId> {
    const node_results = await db
        .insertInto('nodes')
        .expression(sql`DEFAULT VALUES`)
        .returning(['id'])
        .executeTakeFirstOrThrow();

    return node_results.id;
}
