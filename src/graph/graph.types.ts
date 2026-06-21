export type NodeId = string;
export type NodeValue = string;

// a special data type great at querie. contains pairs of node and his
export type AdjacencyList = Map<NodeId, Set<NodeId>>;

export interface Node {
  id: NodeId;
  value: NodeValue;
}

export interface Edge {
  source_node: NodeId;
  target_node: NodeId;
}
