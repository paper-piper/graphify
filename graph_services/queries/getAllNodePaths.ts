import { AdjacencyList, Edge, Node, NodeId } from "../graph.types";
import { buildAdjacencyList } from "../buildAdjacencyList";

export function getAllNodePaths(
    adj: AdjacencyList,
    current_node: NodeId, 
    target_node: NodeId,
    current_path: NodeId[] = [],
    valid_paths: NodeId[][] = []
): NodeId[][] {    

    // dead end
    if (current_path.includes(current_node)){
        return valid_paths
    }

    current_path.push(current_node)

    // found target
    if (current_node === target_node){
        valid_paths.push(current_path)
        return valid_paths
    }

    // else, continue exploring each neighber
    const node_neighbers = adj.get(current_node)!
    for (const next_node of adj.get(current_node)!){
        // create new path for each direction
        const new_path: NodeId[] = [...current_path]
        getAllNodePaths(adj, next_node, target_node, new_path, valid_paths)
    }

    return valid_paths;
}