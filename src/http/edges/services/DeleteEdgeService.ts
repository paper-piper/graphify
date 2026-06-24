import { NodeTitle } from '../../../types';
import { delete_edge } from '../../../db/services/edges/deleteEdge';
import { titleToId } from '../../../db/services/resolvers/titleToId';

export async function DeleteEdgeService(source_node_title: NodeTitle, target_node_title: NodeTitle): Promise<boolean | null> {
    const [source_node_id, target_node_id] = await titleToId(source_node_title, target_node_title);
    if (source_node_id === null || target_node_id === null) return null;
    return delete_edge(source_node_id, target_node_id);
}
