import { Generated } from 'kysely'

//TODO kysely codegen

export interface NodesTable {
  id: Generated<string>  
  title: Generated<number>
}

export interface EdgesTable {
  source_node: string
  target_node: string
}

export interface Database {
  nodes: NodesTable
  edges: EdgesTable
}

