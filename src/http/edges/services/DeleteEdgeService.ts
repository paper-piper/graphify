import { NodeTitle } from '../../../graph/types';
import { delete_edge } from '../../../db/services/deleteEdge';
import { resolveToId } from '../../../db/services/utils/resolveToId';

export async function DeleteEdgeService(sourceNodeTitle: NodeTitle, targetNodeTitle: NodeTitle): Promise<boolean> {
    const [sourceNodeId, targetNodeId] = await resolveToId(sourceNodeTitle, targetNodeTitle);
    return delete_edge(sourceNodeId, targetNodeId);
}
