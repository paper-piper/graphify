import { AdjacencyList } from "./graph.types";
import { get_nodes_and_edges } from "../db/methods/get_nodes_and_edges";

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