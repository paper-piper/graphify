import { Generated } from 'kysely'

export interface NodesTable {
  id: Generated<string>  
  value: string
}

export interface EdgesTable {
  source_node: string
  target_node: string
}

export interface Database {
  nodes: NodesTable
  edges: EdgesTable
}