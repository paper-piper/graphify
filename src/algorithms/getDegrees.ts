import { AdjacencyList, NodeId } from "@/shared/types";

export function getDegrees(adj: AdjacencyList, node: NodeId): Set<NodeId>{
    return adj.get(node)!;
}