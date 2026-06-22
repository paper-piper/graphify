import { NodeId, NodeTitle } from "../../../graph/types";
import { db } from "../../buildDb";

export async function resolveToId(...titles: NodeTitle[]): Promise<NodeId[]>{
    const nodes = await db
        .selectFrom('nodes')
        .select(['nodes.id', 'nodes.title'])
        .where('nodes.title', 'in', titles)
        .execute();

    const map = new Map(nodes.map(n => [n.title, n.id]));
    return titles.map(title => {
        const id = map.get(title);
        if (id === undefined) throw new Error(`Node not found: ${title}`);
        return id;
    });
}