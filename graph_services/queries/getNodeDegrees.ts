import { AdjacencyList, NodeId } from "../graph.types";

export function getNodeDegrees(adj: AdjacencyList, node: NodeId): Set<NodeId>{
    const degrees: Set<NodeId> = adj.get(node)!;
    return degrees
}