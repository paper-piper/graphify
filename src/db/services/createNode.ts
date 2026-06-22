import { NodeTitle } from "../../graph/types";
import { db } from "../buildDb";

export async function create_node(): Promise<NodeTitle> {
    const results = await db
        .insertInto('nodes')
        .returning(['id', 'title'])
        .executeTakeFirstOrThrow();
    
    const node_title = results.title
    return node_title;
}
