import { AdjacencyList, NodeId } from "../types";

export function getDegrees(adj: AdjacencyList, node: NodeId): Set<NodeId>{
    
    if (adj.has(node))
        return adj.get(node)!;

    throw new Error("Node not found");
}