import { sql } from "kysely";
import { NodeId } from "../../graph/types";
import { db } from "../buildDb";

export async function create_node(): Promise<NodeId> {
    const results = await db
        .insertInto('nodes')
        .expression(sql`DEFAULT VALUES`)
        .returning(['id'])
        .executeTakeFirstOrThrow();

    return results.id;
}
