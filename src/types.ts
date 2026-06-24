export type NodeId = string;
export type NodeTitle = number;

export interface Node {
  id: NodeId;
  title: NodeTitle;
}

export interface Edge {
  source_node: NodeId;
  target_node: NodeId;
}
