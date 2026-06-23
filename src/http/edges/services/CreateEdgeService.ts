import { NodeTitle } from '../../../graph/types';
import { create_edge } from '../../../db/services/createEdge';
import { resolveToId } from '../../../db/services/utils/resolveToId';

export async function CreateEdgeService(sourceNodeTitle: NodeTitle, targetNodeTitle: NodeTitle): Promise<void> {
    const [sourceNodeId, targetNodeId] = await resolveToId(sourceNodeTitle, targetNodeTitle);
    await create_edge(sourceNodeId, targetNodeId);
}
