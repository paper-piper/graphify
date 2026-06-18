# Graph Report - .  (2026-06-18)

## Corpus Check
- Corpus is ~1,357 words - fits in a single context window. You may not need a graph.

## Summary
- 82 nodes · 122 edges · 18 communities (12 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_DB Layer & NodeEdge Types|DB Layer & Node/Edge Types]]
- [[_COMMUNITY_Graph Traversal & Types|Graph Traversal & Types]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Connected Components|Connected Components]]
- [[_COMMUNITY_Database Schema|Database Schema]]
- [[_COMMUNITY_SQL Runner Script|SQL Runner Script]]
- [[_COMMUNITY_Node Path Queries|Node Path Queries]]
- [[_COMMUNITY_App Config|App Config]]
- [[_COMMUNITY_Edge Routes|Edge Routes]]
- [[_COMMUNITY_Graph Routes|Graph Routes]]
- [[_COMMUNITY_Node Routes|Node Routes]]

## God Nodes (most connected - your core abstractions)
1. `NodeId` - 10 edges
2. `AdjacencyList` - 9 edges
3. `db` - 6 edges
4. `compilerOptions` - 6 edges
5. `buildAdjacencyList()` - 5 edges
6. `Node` - 4 edges
7. `Edge` - 4 edges
8. `scripts` - 3 edges
9. `get_nodes_and_edges()` - 3 edges
10. `NodeValue` - 3 edges

## Surprising Connections (you probably didn't know these)
- `buildAdjacencyList()` --calls--> `get_nodes_and_edges()`  [EXTRACTED]
  src/graph_services/buildAdjacencyList.ts → src/db/methods/get_nodes_and_edges.ts

## Import Cycles
- None detected.

## Communities (18 total, 6 thin omitted)

### Community 0 - "Package Dependencies"
Cohesion: 0.12
Nodes (15): dependencies, express, kysely, pg, devDependencies, ts-node, @types/express, @types/pg (+7 more)

### Community 1 - "DB Layer & Node/Edge Types"
Cohesion: 0.27
Nodes (3): db, NodeId, NodeValue

### Community 2 - "Graph Traversal & Types"
Cohesion: 0.32
Nodes (6): buildAdjacencyList(), Edge, Node, get_nodes_and_edges(), hasCycle(), isCircleNeighberhood()

### Community 3 - "TypeScript Config"
Cohesion: 0.28
Nodes (8): compilerOptions, esModuleInterop, module, moduleResolution, strict, target, ts-node, compilerOptions

### Community 4 - "Connected Components"
Cohesion: 0.53
Nodes (3): AdjacencyList, getConnectedComponents(), getNeighberhood()

### Community 5 - "Database Schema"
Cohesion: 0.50
Nodes (3): Database, EdgesTable, NodesTable

## Knowledge Gaps
- **23 isolated node(s):** `config`, `name`, `version`, `test`, `test:watch` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `NodeId` connect `DB Layer & Node/Edge Types` to `Graph Traversal & Types`, `Connected Components`, `Node Path Queries`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `AdjacencyList` connect `Connected Components` to `DB Layer & Node/Edge Types`, `Graph Traversal & Types`, `Node Path Queries`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `config`, `name`, `version` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._