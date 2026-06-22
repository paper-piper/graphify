import { AdjacencyList, NodeId } from "../types";

export function getConnectedComponents(adj: AdjacencyList): NodeId[][] {
    const components: NodeId[][] = [];

    for (const [node, _] of adj) {

        const already_present = components.some(arr => arr.includes(node))
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
  visited: NodeId[] = []
): NodeId[] {
    if (visited.includes(node)){
        return visited
    }

    visited.push(node)

    adj.get(node)!.forEach(neighbor => {
        getNeighborhood(adj, neighbor, visited)
    });

    return visited;
}
