import { sql } from "kysely";
import { db } from "@/db/buildDb";
import { NodeId, NodeTitle } from "@/shared/types";

export const NodeRepository = {
    async create(): Promise<NodeId> {
        const result = await db
            .insertInto('nodes')
            .expression(sql`DEFAULT VALUES`)
            .returning(['id'])
            .executeTakeFirstOrThrow();
        return result.id;
    },

    async delete(node_id: NodeId): Promise<void> {
        await db
            .deleteFrom('nodes')
            .where('id', '=', node_id)
            .executeTakeFirst();
    },

    async TitleToId(...titles: NodeTitle[]): Promise<(NodeId | null)[]> {
        const nodes = await db
            .selectFrom('nodes')
            .select(['nodes.id', 'nodes.title'])
            .where('nodes.title', 'in', titles)
            .execute();

        const title_to_id = new Map(nodes.map(n => [n.title, n.id]));
        return titles.map(title => title_to_id.get(title) ?? null);
    },

    async IdToTitle(...ids: NodeId[]): Promise<NodeTitle[]> {
        const nodes = await db
            .selectFrom('nodes')
            .select(['nodes.title', 'nodes.id'])
            .where('nodes.id', 'in', ids)
            .execute();

        const id_to_title = new Map(nodes.map(n => [n.id, n.title]));
        return ids.map(id => id_to_title.get(id)!);
    },
};
