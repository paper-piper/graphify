import { AdjacencyList, Edge, Node, NodeId } from "../graph.types";
import { buildAdjacencyList } from "../buildAdjacencyList";

export function hasCycle(adj: AdjacencyList): boolean {
    const visited = new Set<NodeId>();
    for (const [node, _] of adj) {

        const already_visited = visited.has(node);
        if (!already_visited){
            const [node_neighbers, circle_neighberhood] = isCircleNeighberhood(adj, node);
            node_neighbers.forEach(neighber => visited.add(neighber));
               
            if (circle_neighberhood){
                return true;
            }
        }
    }

    return false;
}

function isCircleNeighberhood(
  adj: AdjacencyList,
  current_node: NodeId,
  visited: NodeId[] = [],
): [NodeId[], boolean] {  

    if (visited.includes(current_node)){

        const fake_circle: boolean = current_node !== visited[visited.length -2]
        return [visited, fake_circle];
    }

    visited.push(current_node);

    for (const neighber of adj.get(current_node)!){
        const [, foundCycle] = isCircleNeighberhood(adj, neighber, [...visited]);
        if (foundCycle){
            return [visited, true]
        }
    }

    return [visited, false];
}

buildAdjacencyList().then(adj => {
    console.log(hasCycle(adj));
});