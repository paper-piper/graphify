import { AdjacencyList, NodeId } from "../graphTypes";

export function getConnectedComponents(adj: AdjacencyList): Set<NodeId>[] {
    const components: Set<NodeId>[] = [];

    for (const [node, _] of adj) {

        const already_present = components.some(set => set.has(node))
        if (!already_present){
            const neighborhood = getNeighborhood(adj, node)
            components.push(neighborhood)
        }
    };

    return components;
}

function getNeighborhood(
  adj: AdjacencyList,
  node: NodeId,
  visited: Set<NodeId> = new Set()
): Set<NodeId> {
    if (visited.has(node)){
        return visited
    }

    visited.add(node)

    adj.get(node)!.forEach(neighbor => {
        getNeighborhood(adj, neighbor, visited)
    });

    return visited;
}
