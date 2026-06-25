import { NodeTitle } from '../../../types';
import { create_edge } from '../../../db/services/edges/createEdge';
import { titleToId } from '../../../db/services/resolvers/titleToId';
import { EDGE_STATUS, CreateEdgeStatus } from '../edgeStatus';

export async function CreateEdgeService(source_node_title: NodeTitle, target_node_title: NodeTitle): Promise<CreateEdgeStatus> {
    const [source_node_id, target_node_id] = await titleToId(source_node_title, target_node_title);
    if (source_node_id === null || target_node_id === null) 
        return EDGE_STATUS.NODE_NOT_FOUND;

    const success = await create_edge(source_node_id, target_node_id);
    if (success)
        return EDGE_STATUS.CREATED
    else
        return EDGE_STATUS.ALREADY_EXISTS
}
