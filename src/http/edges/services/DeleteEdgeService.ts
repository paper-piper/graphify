import { NodeTitle } from '../../../graph/types';
import { delete_edge } from '../../../db/services/edges/deleteEdge';
import { titleToId } from '../../../db/services/resolvers/titleToId';

export async function DeleteEdgeService(sourceNodeTitle: NodeTitle, targetNodeTitle: NodeTitle): Promise<boolean> {
    const [sourceNodeId, targetNodeId] = await titleToId(sourceNodeTitle, targetNodeTitle);
    return delete_edge(sourceNodeId, targetNodeId);
}
