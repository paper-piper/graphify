import { AdjacencyList } from "../../../graph/types";
import { Edge, Node } from "../../../types";
import { db } from "../../buildDb";

export async function buildAdjacencyList(): Promise<AdjacencyList>
{
  const adj: AdjacencyList = new Map();
  const [nodes, edges] = await get_nodes_and_edges();

  nodes.forEach(node => {
    adj.set(node.id, new Set());
  });
  edges.forEach(edge => {
    adj.get(edge.source_node)?.add(edge.target_node);
    adj.get(edge.target_node)?.add(edge.source_node);
  });

  return adj;
}

async function get_nodes_and_edges(): Promise<[Node[], Edge[]]> {
    const nodes = await db.selectFrom('nodes').selectAll().execute() as Node[];
    const edges = await db.selectFrom('edges').selectAll().execute() as Edge[];

    return [nodes, edges];
}