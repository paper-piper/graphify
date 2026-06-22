import { getAllPaths } from '../../../graph/algorithms/getAllPaths';
import { AdjacencyList, NodeTitle, NodeId } from '../../../graph/types';
import { buildAdjacencyList } from '../../../db/services/utils/buildAdjacencyList';
import { resolveToId } from '../../../db/services/utils/resolveToId';
import { resolveToTitle } from '../../../db/services/utils/resolveToTitle';

export async function GetAllPathsService(
    source_node_title: NodeTitle, 
    target_node_title:NodeTitle
): Promise<NodeTitle[][]> {
    const adj: AdjacencyList = await buildAdjacencyList();
    const [source_node_id, target_node_id]: NodeId[] = await resolveToId(source_node_title, target_node_title)
    const id_paths = getAllPaths(adj, source_node_id, target_node_id);
    const title_paths: NodeTitle[][] = [];
    for (const id_path of id_paths){
        const title_path: NodeTitle[] = await resolveToTitle(...id_path);
        title_paths.push(title_path);
    }

    return title_paths
}