import { NodeId, NodeTitle } from "../../../types";
import { db } from "../../buildDb";

export async function titleToId(...titles: NodeTitle[]): Promise<NodeId[]>{
    const nodes = await db
        .selectFrom('nodes')
        .select(['nodes.id', 'nodes.title'])
        .where('nodes.title', 'in', titles)
        .execute();

    const title_to_id = new Map(nodes.map(n => [n.title, n.id]));
    const sorted_id_list: NodeId[] = titles.map(title => {
        const id = title_to_id.get(title);
        if (id === undefined) throw new Error(`Node not found: ${title}`);
        return id;
    });
    // TODO: show accurate errors
    return sorted_id_list
}