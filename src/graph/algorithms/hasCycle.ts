import { AdjacencyList, NodeId } from "../graphTypes";

export function hasCycle(adj: AdjacencyList): boolean {
    const visited = new Set<NodeId>();
    for (const [node, _] of adj) {

        const already_visited = visited.has(node);
        if (!already_visited){
            const [node_neighbors, circle_neighborhood] = isCircleNeighborhood(adj, node);
            node_neighbors.forEach(neighbor => visited.add(neighbor));

            if (circle_neighborhood){
                return true;
            }
        }
    }

    return false;
}

function isCircleNeighborhood(
  adj: AdjacencyList,
  current_node: NodeId,
  visited: NodeId[] = [],
): [NodeId[], boolean] {

    if (visited.includes(current_node)){

        const double_node_circle: boolean = current_node === visited[visited.length -2]
        if (double_node_circle)
            return [visited, false];
        else
            return [visited, true]
    }

    visited.push(current_node);

    for (const neighbor of adj.get(current_node)!){
        const [, foundCycle] = isCircleNeighborhood(adj, neighbor, [...visited]);
        if (foundCycle){
            return [visited, true]
        }
    }

    return [visited, false];
}
