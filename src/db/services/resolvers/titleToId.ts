import { NodeId, NodeTitle } from "../../../types";
import { db } from "../../buildDb";

export async function titleToId(...titles: NodeTitle[]): Promise<(NodeId | null)[]>{
    const nodes = await db
        .selectFrom('nodes')
        .select(['nodes.id', 'nodes.title'])
        .where('nodes.title', 'in', titles)
        .execute();

    const title_to_id = new Map(nodes.map(n => [n.title, n.id]));
    const sorted_id_list: (NodeId | null)[] = titles.map(title => title_to_id.get(title) ?? null);
    return sorted_id_list;
}