// A node identifier. Swap to `string` here if you use UUIDs.
export type NodeId = string;
export type NodeValue = string;
// The "special map": adjacency list of a directed graph.
// key = node id, value = list of node ids it points to (its out-neighbors).
export type AdjacencyList = Map<NodeId, Set<NodeId>>;

export interface Node {
  id: NodeId;
  value: NodeValue;
}

export interface Edge {
  source_node: NodeId;
  target_node: NodeId;
}
