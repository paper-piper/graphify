import { AdjacencyList, NodeId } from "../types";

export function getDegrees(adj: AdjacencyList, node: NodeId): Set<NodeId>{
    return adj.get(node)!;
}