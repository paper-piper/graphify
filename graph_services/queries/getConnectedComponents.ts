import { AdjacencyList, NodeId } from "../graph.types";
import { buildAdjacencyList } from "../buildAdjacencyList";

export function getConnectedComponents(adj: AdjacencyList): Set<NodeId>[] {
    const components: Set<NodeId>[] = [];

    for (const [node, _] of adj) {

        const already_present = components.some(set => set.has(node))
        if (!already_present){
            const neighberhood = getNeighberhood(adj, node)
            components.push(neighberhood)
        }
    };

    return components;
}

function getNeighberhood(
  adj: AdjacencyList,
  node: NodeId,
  visited: Set<NodeId> = new Set()
): Set<NodeId> {    
    if (visited.has(node)){
        return visited
    }

    visited.add(node)

    adj.get(node)!.forEach(neighber => {
        getNeighberhood(adj, neighber, visited)
    });

    return visited;
}

buildAdjacencyList().then(adj => {
  console.log(getConnectedComponents(adj));
});
