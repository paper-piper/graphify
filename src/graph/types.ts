export type NodeId = string;
export type NodeTitle = number;

// a special data type great at querie. contains pairs of node and his
export type AdjacencyList = Map<NodeId, Set<NodeId>>;

export interface Node {
  id: NodeId;
  title: NodeTitle;
}

export interface Edge {
  source_node: NodeId;
  target_node: NodeId;
}
