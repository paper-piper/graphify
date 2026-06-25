import { NodeTitle } from '../../../types';
import { delete_edge } from '../../../db/services/edges/deleteEdge';
import { titleToId } from '../../../db/services/resolvers/titleToId';
import { EDGE_STATUS, DeleteEdgeStatus } from '../edgeStatus';

export async function DeleteEdgeService(source_node_title: NodeTitle, target_node_title: NodeTitle): Promise<DeleteEdgeStatus> {
    const [source_node_id, target_node_id] = await titleToId(source_node_title, target_node_title);
    if (source_node_id === null || target_node_id === null)
         return EDGE_STATUS.NODE_NOT_FOUND;

    const found = await delete_edge(source_node_id, target_node_id);
    if (found)
        return EDGE_STATUS.DELETED
    else
        return EDGE_STATUS.NODE_NOT_FOUND
}
