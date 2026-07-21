export type NodeId = string;
export type NodeTitle = number;

export type Node = {
  id: NodeId;
  title: NodeTitle;
};

export type Edge = {
  source_node: NodeId;
  target_node: NodeId;
};

export type AdjacencyList = Map<NodeId, Set<NodeId>>;
