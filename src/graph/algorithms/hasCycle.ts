import { AdjacencyList, NodeId } from "../types";

export function hasCycle(adj: AdjacencyList): boolean {
    const visited = new Set<NodeId>();
    for (const [node, _] of adj) {

        const already_visited = visited.has(node);
        if (!already_visited){
            const [node_degrees, circle_component] = isCircleComponent(adj, node);
            node_degrees.forEach(component => visited.add(component));

            if (circle_component){
                return true;
            }
        }
    }

    return false;
}

function isCircleComponent(
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

    for (const degree of adj.get(current_node)!){
        const [, foundCycle] = isCircleComponent(adj, degree, [...visited]);
        if (foundCycle){
            return [visited, true]
        }
    }

    return [visited, false];
}
