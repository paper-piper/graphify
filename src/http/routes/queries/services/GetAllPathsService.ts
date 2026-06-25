import { getAllPaths } from '../../../../graph/algorithms/getAllPaths';
import { AdjacencyList } from '../../../../graph/types';
import { NodeTitle, NodeId } from '../../../../types';
import { buildAdjacencyList } from '../../../../db/services/queries/buildAdjacencyList';
import { titleToId } from '../../../../db/services/resolvers/titleToId';
import { idToTitle } from '../../../../db/services/resolvers/idToTitle';
import { QUERY_STATUS, QueryStatus } from '../status/statuses';

export async function GetAllPathsService(
    source_node_title: NodeTitle,
    target_node_title: NodeTitle
): Promise<[NodeTitle[][], QueryStatus]> {
    const adj: AdjacencyList = await buildAdjacencyList();
    const [source_node_id, target_node_id] = await titleToId(source_node_title, target_node_title);
    if (source_node_id === null || target_node_id === null) {
        return [[], QUERY_STATUS.NODE_NOT_FOUND];
    }

    const id_paths = getAllPaths(adj, source_node_id, target_node_id);
    const title_paths: NodeTitle[][] = [];
    for (const id_path of id_paths){
        const title_path: NodeTitle[] = await idToTitle(...id_path);
        title_paths.push(title_path);
    }
    return [title_paths, QUERY_STATUS.OK];
}
