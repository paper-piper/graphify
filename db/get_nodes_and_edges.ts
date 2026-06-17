import { Edge, Node } from "../services/graph/graph.types";
import { db } from "./index";

export async function get_nodes_and_edges(): Promise<[Node[], Edge[]]> {
    const nodes = await db.selectFrom('nodes').selectAll().execute() as Node[];
    const edges = await db.selectFrom('edges').selectAll().execute() as Edge[];

    return [nodes, edges];
}
