import { AdjacencyList, NodeId } from "../graphTypes";

export function getNodeDegrees(adj: AdjacencyList, node: NodeId): Set<NodeId>{
    if (adj.has(node))
        return adj.get(node)!;

    throw new Error("Node not found");
}